const fs = require('fs');
const glob = require('glob');
const path = require('path');
const rimraf = require('rimraf');
const {PATHS} = require(`${process.cwd()}/generators/app/globals`);

const cleanUpFolder = async (pattern = `${PATHS.tempFolder}markup/!(node_modules|yarn.lock)`) => {
  await new Promise((resolve, reject) => {
    try {
      glob(pattern, async (err, matches) => {
        await Promise.all(
          matches.map((match, i) => {
            return new Promise((res) => {
              try {
                rimraf(match, () => res(match));
              } catch (err) {
                reject(err);
              }
            });
          })
        );
        resolve(matches);
      });
    } catch (err) {
      reject(error);
    }
  });
};

const getStylesFile = (cfg) => {
  return path.join(cfg.dest, cfg.styles.dest, `${cfg.styles.bundle}.css`);
};

const getJSFile = (cfg) => {
  return path.join(cfg.dest, cfg.scripts.dest, `${cfg.scripts.bundle}.js`);
};

const getHTMLFile = (cfg) => {
  return path.join(cfg.dest, cfg.templates.dest, `*.html`);
};

const getConfig = (src = PATHS.tempMarkupFolder) => {
  return JSON.parse(fs.readFileSync(path.join(src, 'config.json')));
};

module.exports = {cleanUpFolder, getStylesFile, getJSFile, getHTMLFile, getConfig};
