import load from '../src/index';
import test from 'ava';
import path from 'path';
import { graphql } from 'graphql';

test('should load', async t => {
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
});
