# Snapshot report for `tests/index.spec.js`

The actual snapshot is saved in `index.spec.js.snap`.

Generated by [AVA](https://ava.li).

## resolver should be merged and returned

> test_root_1 resolvers should look like this

    {
      Query: {
        sum: Function sum {},
        version: Function version {},
      },
    }

## typeDefs should be merged and returned

> test_root_1 typeDefs should look like this

    `type Mutation {␊
      """@see: https://github.com/graphql/graphql-js/issues/937"""␊
      _: Boolean␊
    }␊
    ␊
    type Query {␊
      version: String␊
      sum(a: Float, b: Float): Float␊
    }␊
    `
