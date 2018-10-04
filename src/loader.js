import boxen from 'boxen';
import compact from 'lodash/fp/compact';
import glob from 'glob';
import map from 'lodash/fp/map';

import fs from 'fs';
import path from 'path';

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
        return String(fs.readFileSync(path.join(rootPath, file)));
      } catch (ex) {
        /* istanbul ignore next */
        return null;
      }
    }, typeDefsFiles)
  );

  const resolvers = compact(
    map(file => {
      const absPath = path.join(rootPath, file);
      try {
        return require(absPath);
      } catch (ex) {
        console.log(
          '\n' +
            boxen(`Error while loading "${absPath}"\n\n${ex.message}`, {
              padding: 1,
            })
        );
        return null;
      }
    }, resolversFiles)
  );

  return {
    typeDefs,
    resolvers,
  };
};
