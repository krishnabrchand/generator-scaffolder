const path = require('path');
const projectConfig = require('./templates/base/config.json');
const CONFIG = projectConfig;

const PATHS = {
  appFolder: path.resolve(process.cwd(), 'generators/app/'),
  templatesFolder: path.resolve(process.cwd(), 'generators/app/templates/'),
  baseFolder: path.resolve(process.cwd(), 'generators/app/templates/base/'),
  tetFolder: path.join(process.cwd(), 'test/'),
  tempFolder: path.join(process.cwd(), 'test/tmp/'),
  tempMarkupFolder: path.join(process.cwd(), 'test/tmp/markup/'),
  destination: 'markup',
};

const SCRIPTS = {
  install: 'yarn',
  dev: 'yarn dev',
  build: 'yarn build',
};

const PROMPTS_VALUES = {
  projectType: {
    markup: 'markup',
    markupCms: 'markupCms',
  },
  cms: {
    wp: 'wp',
    other: 'other',
  },
  framework: {
    none: false,
    bootstrap: 'bootstrap',
    zurb: 'zurb',
    materialize: 'materialize',
    tailwind: 'tailwind',
  },
  templating: {
    html: 'html',
    pug: 'pug',
    twig: 'twig',
  },
  linters: {
    add: true,
    remove: false,
    css: 'css',
    js: 'js',
  },
};

const OTHER_FILES = {
  linters: {
    general: ['.prettierignore', 'prettier.config.js'],
    css: ['.stylelintignore', 'stylelint.config.js'],
    js: ['eslintrc.js'],
  },
};

const GENERAL_TEST_SETTINGS = [
  {
    linters: false,
    staticUnexpectedFiles: [...OTHER_FILES.linters.css, ...OTHER_FILES.linters.js],
  },
  {
    linters: ['css'],
    staticUnexpectedFiles: [...OTHER_FILES.linters.js],
  },
  {
    linters: ['js'],
    staticUnexpectedFiles: [...OTHER_FILES.linters.css],
  },
  {
    linters: ['css', 'js'],
    staticUnexpectedFiles: [],
  },
];

const CONFIG_REWRITES = {
  wp: {
    styles: {
      bundle: 'style',
      dest: './',
    },
  },
  pug: {
    templates: {
      extension: 'pug',
    },
  },
  twig: {
    templates: {
      extension: 'html.twig',
    },
  },
};

const PACKAGES = {
  linters: {
    css: {
      scripts: {
        'lint:fix:css': 'stylelint --fix "src/**/*.{scss,sass}" --config stylelint.config.js',
      },
    },
    js: {
      scripts: {
        'lint:fix:js': 'eslint --fix "src/**/*.{js,jsx}" --config eslintrc.js --ignore-path .prettierignore',
      },
    },
  },
  frameworks: {
    bootstrap: {
      dependencies: {
        bootstrap: 'latest',
        'popper.js': 'latest',
      },
    },
    zurb: {
      dependencies: {
        'foundation-sites': 'latest',
        'what-input': 'latest',
      },
    },
    materialize: {
      dependencies: {
        'materialize-css': 'latest',
      },
    },
    tailwind: {
      dependencies: {
        tailwindcss: 'latest',
      },
    },
  },
  templating: {
    pug: {
      devDependencies: {
        'pug': '^2.0.4',
        'pug-html-loader': '^1.1.5',
      },
    },
    twig: {
      devDependencies: {
        'twig-html-loader': 'latest',
      },
    },
  },
};

const wpExpectedContent = {
  styles: ['Author:', 'Author URI:', 'Version:', 'Description:', 'License:', 'License URI:', 'Text Domain:', 'Tags:', 'Theme URI:'],
};

const TESTS_SETTINGS = {
  markup: {
    default: {
      generalSettings: {
        projectType: PROMPTS_VALUES.projectType.markup,
        framework: PROMPTS_VALUES.framework.none,
        cms: false,
      },
    },
    bootstrap: {
      expectedFilesContent: {
        js: [/import 'bootstrap'/],
        styles: [
          /@import 'vendors\/bootstrap'\;/,
          /@import 'vendors-extensions\/bootstrap'\;/,
          /@import 'vendors\/bootstrap-utilities'\;/,
          /@import 'abstracts\/rebuilded-mixins'\;/,
        ],
        json: [PACKAGES.frameworks.bootstrap],
      },
      generalSettings: {
        projectType: PROMPTS_VALUES.projectType.markup,
        framework: PROMPTS_VALUES.framework.bootstrap,
        cms: false,
      },
    },
    materialize: {
      expectedFilesContent: {
        js: [/import Materialize from 'materialize-css';/, 'Materialize.AutoInit();'],
        styles: [/@import 'vendors\/materialize';/],
        json: [PACKAGES.frameworks.materialize],
      },
      generalSettings: {
        projectType: PROMPTS_VALUES.projectType.markup,
        framework: PROMPTS_VALUES.framework.materialize,
        cms: false,
      },
    },
    tailwind: {
      expectedFilesContent: {
        js: [],
        styles: ['// stylelint-disable scss/at-rule-no-unknown', '@tailwind base;', '@tailwind components;', '@tailwind utilities;'],
        json: [PACKAGES.frameworks.tailwind],
        postcss: [/'tailwindcss': true/],
      },
      generalSettings: {
        projectType: PROMPTS_VALUES.projectType.markup,
        framework: PROMPTS_VALUES.framework.tailwind,
        cms: false,
      },
    },
    zurb: {
      expectedFilesContent: {
        js: [/import 'what-input';/, /import 'foundation-sites';/, 'jQuery(document).foundation();'],
        styles: [/@import 'vendors\/zurb';/, /@import 'vendors-extensions\/zurb';/, /@import 'vendors\/zurb-utilities';/],
        json: [PACKAGES.frameworks.zurb],
      },
      generalSettings: {
        projectType: PROMPTS_VALUES.projectType.markup,
        framework: PROMPTS_VALUES.framework.zurb,
        cms: false,
      },
    },
  },
  wp: {
    default: {
      expectedFilesContent: {
        styles: [...wpExpectedContent.styles],
      },
      generalSettings: {
        projectType: PROMPTS_VALUES.projectType.markupCms,
        framework: PROMPTS_VALUES.framework.none,
        cms: PROMPTS_VALUES.cms.wp,
      },
    },
    bootstrap: {
      expectedFilesContent: {
        js: [/import 'bootstrap'/],
        styles: [
          /@import 'vendors\/bootstrap'\;/,
          /@import 'vendors-extensions\/bootstrap'\;/,
          /@import 'vendors\/bootstrap-utilities'\;/,
          /@import 'abstracts\/rebuilded-mixins'\;/,
          ...wpExpectedContent.styles,
        ],
        json: [PACKAGES.frameworks.bootstrap],
      },
      generalSettings: {
        projectType: PROMPTS_VALUES.projectType.markupCms,
        framework: PROMPTS_VALUES.framework.bootstrap,
        cms: PROMPTS_VALUES.cms.wp,
      },
    },
    materialize: {
      expectedFilesContent: {
        js: [/import Materialize from 'materialize-css';/, 'Materialize.AutoInit();'],
        styles: [/@import 'vendors\/materialize';/, ...wpExpectedContent.styles],
        json: [PACKAGES.frameworks.materialize],
      },
      generalSettings: {
        projectType: PROMPTS_VALUES.projectType.markupCms,
        framework: PROMPTS_VALUES.framework.materialize,
        cms: PROMPTS_VALUES.cms.wp,
      },
    },
    tailwind: {
      expectedFilesContent: {
        js: [],
        styles: ['// stylelint-disable scss/at-rule-no-unknown', '@tailwind base;', '@tailwind components;', '@tailwind utilities;', ...wpExpectedContent.styles],
        json: [PACKAGES.frameworks.tailwind],
        postcss: [/'tailwindcss': true/],
      },
      generalSettings: {
        projectType: PROMPTS_VALUES.projectType.markupCms,
        framework: PROMPTS_VALUES.framework.tailwind,
        cms: PROMPTS_VALUES.cms.wp,
      },
    },
    zurb: {
      expectedFilesContent: {
        js: [/import 'what-input';/, /import 'foundation-sites';/, 'jQuery(document).foundation();'],
        styles: [/@import 'vendors\/zurb';/, /@import 'vendors-extensions\/zurb';/, /@import 'vendors\/zurb-utilities';/, ...wpExpectedContent.styles],
        json: [PACKAGES.frameworks.zurb],
      },
      generalSettings: {
        projectType: PROMPTS_VALUES.projectType.markupCms,
        framework: PROMPTS_VALUES.framework.zurb,
        cms: PROMPTS_VALUES.cms.wp,
      },
    },
  },
  templating: {
    html: {
      templatesFilesPath: path.join(PATHS.templatesFolder, 'html'),
      generalSettings: {
        templating: PROMPTS_VALUES.templating.html,
      },
    },
    pug: {
      templatesFilesPath: path.join(PATHS.templatesFolder, 'pug'),
      expectedFilesContent: {
        json: [PACKAGES.templating.pug],
      },
      generalSettings: {
        templating: PROMPTS_VALUES.templating.pug,
      },
    },
    twig: {
      templatesFilesPath: path.join(PATHS.templatesFolder, 'twig'),
      expectedFilesContent: {
        json: [PACKAGES.templating.twig],
      },
      generalSettings: {
        templating: PROMPTS_VALUES.templating.twig,
      },
    },
  },
};

module.exports = {
  CONFIG,
  PATHS,
  PROMPTS_VALUES,
  PACKAGES,
  OTHER_FILES,
  CONFIG_REWRITES,
  SCRIPTS,
  GENERAL_TEST_SETTINGS,
  TESTS_SETTINGS,
};
