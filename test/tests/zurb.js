const chalk = require('chalk');
const glob = require('glob');
const yeomanAssert = require('yeoman-assert');
const {join} = require('path');
const {getFilesArray} = require(`${process.cwd()}/generators/app/utils`);
const {PROMPTS_VALUES, PATHS} = require(`${process.cwd()}/generators/app/globals`);
const {getStylesFile, getJSFile, getHTMLFile, getConfig} = require('./utils');
const TEMPLATE = require('./template');

const zurbTest = (props) =>
  TEMPLATE(props, ({testSettings}) => {
    return {
      async afterFilesCreated() {
        const {staticUnexpectedFiles, staticExpectedFiles} = testSettings;
        const {templatesFilesPath} = props;
        const expectedFiles = [...(await getFilesArray(templatesFilesPath))]
          .concat([...(await getFilesArray(join(PATHS.templatesFolder, PROMPTS_VALUES.framework.zurb)))])
          .concat(staticExpectedFiles);

        yeomanAssert.file(expectedFiles);
        yeomanAssert.noFile(staticUnexpectedFiles);
      },
      afterSettingsSetup() {
        const {expectedFilesContent} = testSettings;
        const newCfg = getConfig();
        const stylesFile = getStylesFile(newCfg);
        const jsFile = getJSFile(newCfg);
        const newPkgfilePath = join(PATHS.tempMarkupFolder, 'package.json');

        it(chalk.green('Library imported into JS:'), () => {
          expectedFilesContent.js.map((content) => yeomanAssert.fileContent(jsFile, content));
        });

        it(chalk.green('Library imported into Styles:'), () => {
          expectedFilesContent.styles.map((content) => yeomanAssert.fileContent(stylesFile, content));
        });

        it(chalk.green('Modules added to package.json:'), () => {
          expectedFilesContent.json.map((content) => yeomanAssert.jsonFileContent(newPkgfilePath, content));
        });
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

module.exports = zurbTest;
