const chalk = require('chalk');
const chai = require('chai');
const helpers = require('yeoman-test');
const {chaiExecAsync} = require('chai-exec');
const {cleanUpFolder} = require('./utils');
const {PATHS, SCRIPTS, GENERAL_TEST_SETTINGS} = require(`${process.cwd()}/generators/app/globals`);
const {setProcessToDestination, projectTypeMessage} = require(`${process.cwd()}/generators/app/utils`);

const ONLY_FILES_TEST = process.env.FILES_ONLY;
const assert = chai.assert;

chai.use(chaiExecAsync);

function template({staticExpectedFiles = [], expectedFilesContent = {}, generalSettings = {}}, callback) {
  return Promise.all([
    GENERAL_TEST_SETTINGS.forEach((prompts) => {
      const testSettings = {...prompts, ...generalSettings, expectedFilesContent, staticExpectedFiles};
      const {afterFilesCreated, afterSettingsSetup, afterBuildProcess, afterModulesInstallation, afterBuildRun} = callback({testSettings});

      describe(projectTypeMessage(testSettings), () => {
        before(async () => {
          await cleanUpFolder();
          await helpers.run(PATHS.appFolder).cd(PATHS.tempFolder).withPrompts(testSettings);
        });

        describe('Generating files:', () => {
          it(chalk.green('Create expected files'), async () => {
            await setProcessToDestination();

            afterFilesCreated && (await afterFilesCreated());
          });
        });

        describe('Checking dependencies:', () => {
          it(chalk.green('Setup settings'), async () => {
            await setProcessToDestination();

            afterSettingsSetup && (await afterSettingsSetup());
          });
        });

        if (!ONLY_FILES_TEST) {
          describe('Installing dependencies:', () => {
            it(chalk.green('Install all dependencies'), async () => {
              const cli = await chaiExecAsync(SCRIPTS.install);
              afterModulesInstallation && (await afterModulesInstallation());
              assert.exitCode(cli, 0);
            });
          });

          describe('Running build process:', () => {
            it(chalk.green('Build process is correct:'), async () => {
              const cli = await chaiExecAsync(SCRIPTS.build);
              afterBuildRun && (await afterBuildRun());
              assert.exitCode(cli, 0);
            });
          });

          describe('Building correct files:', () => {
            it(chalk.green('Generate all files based on project config'), async () => {
              await setProcessToDestination();
              afterBuildProcess && (await afterBuildProcess());
            });
          });
        }
      });
    }),
  ]);
}

module.exports = template;
