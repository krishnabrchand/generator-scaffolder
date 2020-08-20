const chalk = require('chalk');
const bootstrapTest = require('./tests/bootstrap');
const defaultTest = require('./tests/default');
const zurbTest = require('./tests/zurb');
const materializeTest = require('./tests/materialize');
const tailwindTest = require('./tests/tailwind');
const {TESTS_SETTINGS} = require(`${process.cwd()}/generators/app/globals`);
const {mergeDeep} = require(`${process.cwd()}/generators/app/utils`);

const title = (text) => {
  return chalk.bgCyan(
    chalk.bold.black(`
    ****************************
    ${text}
    ****************************`)
  );
};

const getProjectSettings = (target, source) => {
  const settings = mergeDeep(Object.assign({}, target), source);

  return settings;
};

for (const key in TESTS_SETTINGS.templating) {
  if (TESTS_SETTINGS.templating.hasOwnProperty(key)) {
    const templatesFiles = TESTS_SETTINGS.templating[key];

    describe(title(`Markup + ${key}`), () => {
      return new Promise(async (resolve, reject) => {
        try {
          await Promise.all([
            defaultTest(getProjectSettings(TESTS_SETTINGS.markup.default, templatesFiles)),
            bootstrapTest(getProjectSettings(TESTS_SETTINGS.markup.bootstrap, templatesFiles)),
            materializeTest(getProjectSettings(TESTS_SETTINGS.markup.materialize, templatesFiles)),
            tailwindTest(getProjectSettings(TESTS_SETTINGS.markup.tailwind, templatesFiles)),
            zurbTest(getProjectSettings(TESTS_SETTINGS.markup.zurb, templatesFiles)),
          ]);
          resolve();
        } catch (error) {
          reject(error);
        }
      });
    });

    describe(title(`Markup + Wordpress + ${key}`), () => {
      return new Promise(async (resolve, reject) => {
        try {
          await Promise.all([
            defaultTest(getProjectSettings(TESTS_SETTINGS.wp.default, templatesFiles)),
            bootstrapTest(getProjectSettings(TESTS_SETTINGS.wp.bootstrap, templatesFiles)),
            materializeTest(getProjectSettings(TESTS_SETTINGS.wp.materialize, templatesFiles)),
            tailwindTest(getProjectSettings(TESTS_SETTINGS.wp.tailwind, templatesFiles)),
            zurbTest(getProjectSettings(TESTS_SETTINGS.wp.zurb, templatesFiles)),
          ]);
          resolve();
        } catch (error) {
          reject(error);
        }
      });
    });
  }
}
