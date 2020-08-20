const glob = require('glob');
const rimraf = require('rimraf');
const { PATHS } = require(`${process.cwd()}/generators/app/globals`);

const cleanUpFolder = async (pattern = `${PATHS.tempFolder}markup/!(node_modules|yarn.lock)`) => {
  await new Promise((resolve, reject) => {
    try {
      glob(pattern, async (err, matches) => {
        await Promise.all(
          matches.map((match, i) => {
            return new Promise((res) => {
              try {
                rimraf(match, () => res(match));
              } catch(err) {
                reject(err)
              }
            });
          })
        );
        resolve(matches);
      });
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = {cleanUpFolder};
