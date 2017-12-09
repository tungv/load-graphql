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

```js
// src/schema.js file
import loadGraphql from 'load-graphql';

// or
const loadGraphql = require('load-graphql').default;

const pathToGraphqlRootDir = path.join(__dirname, './graphql');

const executableSchema = loadGraphql(pathToGraphqlRootDir);

// excutableSchema will combine all typedefs in .graphql files and merge all resolvers in .resolver.js files (these pattern can be configurable)
```

## Configuration

`loadGraphql` function receives a second `options` parameter with the following
properties:

| properties key   | default value      | description                      |
| ---------------- | ------------------ | -------------------------------- |
| resolversPattern | `**/*.resolver.js` | glob for matching resolver files |
| typedefsPattern  | `**/*.graphql`     | glob for matching resolver files |

you can pass anything that `glob` package accepts for these options.
