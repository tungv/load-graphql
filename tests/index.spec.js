import load from '../src/index';
import test from 'ava';
import path from 'path';
import { graphql } from 'graphql';

const logs = [];
let originalLog = console.log;

test.before(() => {
  console.log = (...args) => {
    logs.push(args);
    // uncomment this for debugging
    // return originalLog.apply(console, args);
  };
});

test.after(() => {
  console.log = originalLog;
});

test('should load', async t => {
  logs.length = 0;
  const schema = load(path.resolve(__dirname, '../fixtures/test_root_1'));
  const resp = await graphql(
    schema,
    `
      {
        sum(a: 1, b: 2)
      }
    `,
    {}
  );

  t.deepEqual(resp, { data: { sum: 3 } });
  t.true(logs.length === 0);
});

test('should log error if resolvers are failed to load', t => {
  logs.length = 0;
  const schema = load(
    path.resolve(__dirname, '../fixtures/test_error_resolver_root')
  );

  const absPathToErrorFile = path.resolve(
    __dirname,
    '../fixtures/test_error_resolver_root/error.resolver.js'
  );

  t.deepEqual(logs, [
    [
      `
┌─────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                                                                                                 │
│   Error while loading "${absPathToErrorFile}"   │
│                                                                                                                 │
│   Cannot find module 'something'                                                                                │
│                                                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘`,
    ],
  ]);
});
