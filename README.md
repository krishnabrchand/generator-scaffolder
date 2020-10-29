# Projects scaffolding tool

**Project generator contains various types of projects base structure:**
* Markup only
* Markup + CMS (Wordpress or other)
* Markup + Frameworks (Bootstrap, Zurb Foudation, Materialize, Tailwind CSS)
* Markup + PUG (and/or frameworks, CMS)
* Markup + Twig (and/or frameworks, CMS)
... mix them up 👊

`CSS` preprocessor syntax is `SCSS`.

## Table of contents
- [Installation](#installation)
- [How to use](#how-to-use)
- [What's included](#whats-included)
- [FAQ](#faq)

## Installation

This generator is based on `Node JS` and `Yeoman` generator. For starters, you need to install them:

[Node JS](https://nodejs.org/) - install latest recommended version(**minimal version is 10**)
[Yeoman](https://yeoman.io/) - `npm install -g yo`

If you have Node JS installed already, please check version and make sure it is 10+:
 `node -v` - **If your version is earlier than 10 - upgrade your Node JS**

Once you have Node JS and Yeoman installed, you are ready to install the generator itself.

### Usage as NPM module from registry
Generator is an `npm` module, so you can easily install it using `npm` or `yarn`:
```
#Using npm
npm i -g generator-p2h

#Using yarn
yarn global add generator-p2h
```

The main cons of this method - is that you can grab only released version of module, but not one with minor fixes/upgrades. 
***If you want always to be up-to-date - check next method.***

### Local usage
There is an option to use generator as a local NPM module. The main benefit of this type of usage is that you don't have to wait until generator is published to npm (not every fix/update/feature is published as a new version to NPM), but you can just `git pull` the latest code - and you are up do date with the latest version of the generator.

To install, a few steps are required:
1. Clone [github](https://github.com/mrlss/generator-scaffolder) repository - you can put this folder in any place you want 
2. `cd` into this folder - `cd *YOUR_PATH*/generator-scaffolder` . Next step depends on which package manager you use, `NPM` or `Yarn`
3. `npm link` or `yarn link`
4. Now you module is available in global scope with same command `yo p2h`. You can use it from any place you need.

To upgrade to latest version:
1. `cd` into this folder - `cd *YOUR_PATH*/generator-scaffolder`
2. `git pull`
3. Done. Your generator is up to date with latest code.

## How to use

1.  Generate project: `yo p2h` and choose project settings you need (**_if you already have project installed, plaese skip this step_**).

2.  Install project dependencies: (**_if you already have modules installed, please skip this step_**)
```
#Using npm
npm i

#Using yarn
yarn
```
Make sure your location is root of `markup` folder

3.  To run development mode, run:
```
#Using npm
npm run dev

#Using yarn
yarn dev
```

4.  To compile all assests into production mode, run:
```
#Using npm
npm run build

#Using yarn
yarn build
```
Build assets intro `dist` folder

**Additional utility scripts:**

1. Run local webserver
```
#Using npm
npm run preview

#Using yarn
yarn preview
```
To preview builded assets, for example. Used module `serve` under the hood.

2. Prettify HTML after compilation
```
#Using npm
npm run pretify:html

#Using yarn
yarn pretify:html
```
Uses Prettier to pretify HTML files from `dist` folder. Can be used only after compilation process.

**_Don't use `npm` and `yarn` in the same project - this can lead to unexpected results_**

## What's included 

The main bundler for project is [Webpack](https://webpack.js.org/). All internal project logic is based on `Webpack` and `config.json` file.
*Depending on which options you choose while generating your projects, output features may vary:*

#### Webpack

###### Always enabled:
- `Babel` - is a JavaScript ES6+ syntax transpiler, that give us an advantage of moders JS syntax features that is understandable for all browsers (IE11+)

###### Can be configured:
- `Eslint` - JavaScript syntax linter (can be re-configured with any type of config if client requested in `eslintrc.js` file);
- `Stylelint` - SCSS syntax linter based on [SASS Guidelines](https://sass-guidelin.es/) (can be re-configured in `stylelint.config.js` file)

You can enable/disable those options when generate project or in already generated project in `config.json` file.

#### Config file ⚙️
Internal configuration for project folder structure and some major features can be controlled using `config.json`.
The main idea behind this file is to control webpack behavior without webpack configuration change.

You can see default structure of this file: **`enable/disable` means `true/false`**

```
{
  "src": "src",
  "dest": "dist",
  "debug": false,
  "cache_boost": false,
  "minimize": true,
  "linters": {
    "css": true,
    "js": true
  },
  "server": {
     "open": true
  },
  "styles": {
    "bundle": "style",
    "src": "styles",
    "dest": "css",
    "extension": "scss"
  },
  "scripts": {
    "bundle": "app",
    "src": "js",
    "dest": "js",
    "extension": "js"
  },
  "templates": {
    "src": "views",
    "dest": "./",
    "extension": "html"
  },
  "static": {
    "fonts": {
      "src": "fonts"
    },
    "images": {
      "src": "images"
    },
    "video": {
      "src": "video"
    },
    "ajax": {
      "src": "inc"
    }
  }
}
```

Lets take more precise look into each of the config sections:

#### Baseline
`"src": "src"` - source files folder name. If you need another folder - rename folder and change this name inside `config`.

`"dest": "dist"` - folder where all files will be compiled, same as with src - if you need to change this, rename folder and change `config`.

`"debug": false` - if `true`, enable [Webpack Bundle Analyzer](https://www.npmjs.com/package/webpack-bundle-analyzer) in production mode.

`"cache_boost": false` - if `true` - add extra hash for every bundle, e.g. `app.js?9fa40fa90e1c6031a8e7` - good for cache boost for static websites, and also split `app.js` file into separate files: your custom code, vendors code and `runtime.js` file - to make sure everything load as it should.

`"minimize": true` - if `false` - disable `CSS/JS` minification. Enabled by default

#### Linters
```
"linters": {
    "css": true,
    "js": true
},
```
Enabled by default, do disable - switch to `false`, e.g `"css": false` to disable `Stylelint`, or `"linters": false` - if you don't need them at all.

**IMPORTANT NOTE**:

If project was generated **with** `linters` option enabled - you can `enable/disable` them at any time.

If project was generated **without** `linters` option enabled - you can't `enable` them in future.

In this case - you can generate dummy project with those options enabled and grab `styleline.config.js, .stylelintignore, .prettierignore, prettier.config.js, eslintrc.js` files and put into root of your project folder.

#### Webpack dev server configuration
```
"server": {
    "open": true
},
```
`open`: if `true` - new page will open everytime you start build.  If you don't need this - switch to `false`

#### Styles bundle configuration
```
"styles": {
    "bundle": "style",
    "src": "styles",
    "dest": "css",
    "extension": "scss"
},
```
`bundle`: filename for you `SCSS` main file and generated CSS filename
`src`: folder where styles bundle is located
`dest`: folder where to put compiled CSS
`extension`: currently only SCSS

#### Scripts bundle configuration
```
"scripts": {
    "bundle": "app",
    "src": "js",
    "dest": "js",
    "extension": "js"
},
```
`bundle`: filename for you `JS` main file and generated JS filename
`src`: folder where JS bundle is located
`dest`: folder where to put compiled JS
`extension`: can be `js` or `ts` if you need `TypeScript` (with TypeScript some custom configuration is required)

*In case, when you need another folder structure, for example you have structure like this:*
```
assets
    scss
        my-style.scss
    scripts
        my-script.js
webpack.config.js
```

Your `config.json` should be re-configure to follow this structure:
```
"src": "assets",
"styles": {
    "bundle": "my-style",
    "src": "scss",
    ...
},
"scripts": {
    "bundle": "my-script",
    "src": "scripts",
    ...
},
```
**NOTE**: all paths (`src/dest`) are resolved to to your `src` and `dest` folders configured in **Baseline**, so you don't need to specify `src/` in each pathname.

#### Templates
```
"templates": {
    "src": "views",
    "dest": "./",
    "extension": "html"
},
```
`src`: folder where template files are placed
`dest`: folder where to put files. In this configuration - files are placed into root of `dest` folder configured in **Baseline**
`extension`: this can be defferent if you choose templating languages such as pug or twig.

#### Static files
```
"static": {
    "fonts": {
      "src": "fonts"
    },
    "images": {
      "src": "images"
    },
    "video": {
      "src": "video"
    },
    "ajax": {
      "src": "inc"
    }
}
```

This part of config is required for static files, which just coppied from `src` to `dest` based on settings provided.
Those options have ommited `dest` folder option by default, since for most of the cases - `src` and `dest` folder names are the same. Anyway, you can specify another `dest` folder name if you need this.
```
"static": {
    "fonts": {
      "src": "fonts",
      "dest": "assets/fonts"
    },
}
```
And compiled structure will be the following:
```
dist
    assets
        fonts
```

Another usecase for static option is favicon. You can create folder name `favicon` in source folder, then add it to config, and restart build. Then your folder will appear in compiled files, e.g.
```
"static": {
    "favicon": {
      "src": "favicon",
      "dest": "./"
    },
}
```

And result will be:
```
dist
    favicon.ico
```

#### Externals
There is a specific option available in config, called `externals`. This option is needed when you need to add external bundles outside of main bundles, or - you need to include bootstrap in separate file, for example, or - you need to create unique CSS/JS file for every page.
```
"externals": {
    "bootstrap": ["styles/bootstrap.scss", "js/bootstrap.js"],
    "test": "js/test.js"
}
```
Code above will generate new bundles:
```
dist
    styles
        bootstrap.css // external option
        style.css
    js
        bootstrap.js // external option
        test.js // external option
        app.js
```
By default, `externals` will unclude `BEFORE` your code (default flow for frameworks). IF you need to include your externals `AFTER` your main bundle, you can specify option `order` which receive `string` params: `beforeBundle, afterBundle` e.g:
```
"externals": {
    "order": 'afterBundle', // default to `beforeBundle`
    "test": ["styles/test.scss", "js/test.js"],
}
```
And order of bundles inclusion in HTML will be the following:
```
    ...
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/test.css">
    ...
    <script src="app.js">
    <script src="test.js">
    ...
```

If you have a requirement to create unique JS and CSS file for every page, e.g. `about.html, team.html` etc, you can do this like this:
* Disable CSS/JS file injection in `webpack.config.js` in function `generateHtmlPlugins` by setting option `inject: false`
    ```
    return new HTMLWebpackPlugin({
      ...
      inject: false,
      ...
    });
    ```
* Create `externals` configuration:
    ```
    "externals": {
        "about": ["styles/about.scss", "js/about.js"],
        "team": ["styles/team.scss", "js/team.js"],
    }
    ```
* Include those bundles into HTML files
    File **about.html**
    ```
        <head>
            <link rel="stylesheet" href="css/about.css">
        </head>
        <body>
            ...
            <script src="js/about.js" defer></script>
        </body>
    ```
    Same for **team.html**

## FAQ

* **Question**: I added/removed a page, but it does not appear in pages list and i get an error in console?
    **Answer**: Restart build. Webpack generate pages list on runtime and watch them. If page is deleted - webpack throw an error that it can't find this particular page, and if you add new page while webpack is running - you need to restart it once again so webpack add it to the context.
* **Question**: When i include jQuery plugin from builder, i get an error in console `PluginName is not defined`?
    **Answer**: You need to change contex from `this` to `window`, for example in `accordion plugin` 
    ```
    ;(function(root, factory) {
    	'use strict';
    	...
    }(this, function($)
    ```
    In example above, `this` in closure function in non-webpack context means `window`. in Webpack, `this` - is not a `window` object, and we need to define `window` to attach plugin to global context.
    Replace to
    ```
    ;(function(root, factory) {
        'use strict';
    	...
    }(window, function($)
    ```

* **Question**: I need to include specific bundle for each page by hands, how to remove automatic inclusion of app assets into HTML?
    **Answer**: Set `inject: false` for `HTMLWebpackPlugin` inside `webpack.config.js` in function `generateHtmlPlugins`:
    ```
        return new HTMLWebpackPlugin({
          title: basename(dirname(__dirname)),
          template,
          filename,
          excludeChunks: [routesPage],
          minify: false,
          inject: 'body', // change to false
          hash: isProduction ? config.cache_boost : false,
          scriptLoading: 'defer',
          meta: {
            viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
          },
          optimize: {
            prefetch: true,
          },
        });
    ```
    Changing this option to `false` will disable automatic inject of CSS/JS bundles into HTML, so you can specify in HTML which JS/CSS files should be included into your page by hands.
    

