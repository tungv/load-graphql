# Automagically Load GraphQL typedefs and resolvers

## Installation

```sh
> npm i load-graphql

# or with yarn
> yarn add load-graphql
```

`load-graphql` has peerDependencies on `graphql` and `graphql-tools`, so you
need to install these 2 packages as well if you haven't

```sh
npm i graphql graphql-tools
```

## Usage

assuming you have your project structure as follow:

```
project/
└── src/
  ├── schema.js
  └── graphql/
      ├── common.graphql
      ├── some.resolver.js
      ├── nested
      │   ├── deeplyNested.graphql
      │   └── deeplyNested.resolver.js
      └── otherTypeOfFile.js
```

```graphql
# src/graphql/common.graphql
# because Query and Mutation typedef are predefined, you can immediately extend them in your graphql files
extend type Query {
  someQuery: String!
  someOtherQuery: Number!
}

extend type Mutation {
  createSomething(title: String!): Boolean
}

scalar JSON
```

```js
// src/graphql/some.resolver.js
export const Query {
  someQuery: () => 'test'
  
  // someOtherQuery can be omitted or implement in a different .resolver.js file
}

export const Mutation {
  createSomething(root, { title }) {
    // ... do something here
    return true
  }
}

export const JSON = require('graphql-json-type')
```

```js
// src/schema.js file
import loadGraphql from 'load-graphql';

// or
const loadGraphql = require('load-graphql').default;

const pathToGraphqlRootDir = path.join(__dirname, './graphql');

const executableSchema = loadGraphql(pathToGraphqlRootDir);

/* 
  excutableSchema will
  1. combine all typedefs in .graphql files, and
  2. merge all resolvers in .resolver.js files 
  
  these pattern can be configurable
  
*/
```

## Configuration

`loadGraphql` function receives a second `options` parameter with the following
properties:

| properties key   | default value      | description                      |
| ---------------- | ------------------ | -------------------------------- |
| resolversPattern | `**/*.resolver.js` | glob for matching resolver files |
| typedefsPattern  | `**/*.graphql`     | glob for matching resolver files |

you can pass anything that `glob` package accepts for these options.

## Error handling

`load-graphql` gracefully handles error thrown while trying to parse typedefs
file or `require`'ing resolver files. In case of error, it will ignore the
content of the flawed files and continue.
