const chalk = require('chalk');
const glob = require('glob');
const yeomanAssert = require('yeoman-assert');
const {getFilesArray} = require(`${process.cwd()}/generators/app/utils`);
const {getStylesFile, getJSFile, getHTMLFile, getConfig} = require('./utils');
const TEMPLATE = require('./template');

const defaultTest = (props) =>
  TEMPLATE(props, ({testSettings}) => {
    return {
      async afterFilesCreated() {
        const {templatesFilesPath} = props;
        const {staticUnexpectedFiles, staticExpectedFiles} = testSettings;
        const expectedFiles = [...(await getFilesArray(templatesFilesPath))].concat(staticExpectedFiles);

        yeomanAssert.file(expectedFiles);
        yeomanAssert.noFile(staticUnexpectedFiles);
      },
      afterSettingsSetup() {
        const {expectedFilesContent} = testSettings;
        const newCfg = getConfig();
        const stylesFile = getStylesFile(newCfg);

        if (expectedFilesContent.hasOwnProperty('styles')) {
          it(chalk.green('Added all necessary content to Styles:'), () => {
            expectedFilesContent.styles.map((content) => yeomanAssert.fileContent(stylesFile, content));
          });
        }
      },
      afterBuildProcess() {
        const newCfg = getConfig();
        const stylesFile = getStylesFile(newCfg);
        const jsFile = getJSFile(newCfg);
        const HTMLFiles = getHTMLFile(newCfg);
        const expectedCompilation = [stylesFile, jsFile];

        glob(HTMLFiles, {}, (err, files) => {
          expectedCompilation.push(...files);
          yeomanAssert.file(expectedCompilation);
        });
      },
    };
  });

module.exports = defaultTest;
