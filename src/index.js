import { makeExecutableSchema } from 'graphql-tools';
import mergeAll from 'lodash/fp/mergeAll';
import join from 'lodash/fp/join';
import map from 'lodash/fp/map';
import loader from './loader';
import readPkgUp from 'read-pkg-up';
import { printSchema } from 'graphql';

const rootTypeDefs = `
type Mutation {
  # @see: https://github.com/graphql/graphql-js/issues/937
  _: Boolean
}

type Query {
  version: String
}
`;

const rootResolvers = {
  Query: {
    version: () => {
      const { pkg: packageJSON } = readPkgUp.sync();
      return packageJSON.version;
    },
  },
};

export default function (rootPath) {
  // magic
  const { typeDefs, resolvers } = loader(rootPath);

  const mergedResolvers = mergeAll([rootResolvers, ...resolvers]);

  const temp = makeExecutableSchema({
    typeDefs: [rootTypeDefs, ...typeDefs], resolverValidationOptions: {
      requireResolversForResolveType: false,
    },
  });

  const mergedTypeDefs = printSchema(temp);

  return [makeExecutableSchema({
    typeDefs: mergedTypeDefs,
    resolvers: mergedResolvers,
  }), mergedTypeDefs, mergedResolvers];
}
