import glob from 'glob';
import fs from 'fs';
import path from 'path';

import compact from 'lodash/fp/compact';
import map from 'lodash/fp/map';

export default (rootPath, options = {}) => {
  const {
    resolversPattern = '**/*.resolver.js',
    typedefsPattern = '**/*.graphql',
  } = options;
  const typeDefsFiles = glob.sync(typedefsPattern, { cwd: rootPath });
  const resolversFiles = glob.sync(resolversPattern, { cwd: rootPath });

  const typeDefs = compact(
    map(file => {
      try {
        return String(fs.readFileSync(path.resolve(rootPath, file)));
      } catch (ex) {
        return null;
      }
    }, typeDefsFiles)
  );

  const resolvers = compact(
    map(file => {
      try {
        return require(path.resolve(rootPath, file));
      } catch (ex) {
        return null;
      }
    }, resolversFiles)
  );

  return {
    typeDefs,
    resolvers,
  };
};
