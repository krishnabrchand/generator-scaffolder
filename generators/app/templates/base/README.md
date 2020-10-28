# Webpack build for optimized load speed

#### Requirements

* [Node JS](https://nodejs.org/) - install latest recommended

If you already have Node JS, then check version:
* `node -v` - **should be 10+. If your version is earlier than 10 - upgrade your Node JS**

## How to use

1.  Install project dependencies: (**_if you already has modules installed, skip this step_**)
```
#Using npm
npm i

#Using yarn
yarn
```
Make sure your location is root of `markup` folder

2.  To run development mode, run:
```
#Using npm
npm run dev

#Using yarn
yarn dev
```

3.  To compile all assest into production mode, run:
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

2. Pretify HTML after compilation
```
#Using npm
npm run pretify:html

#Using yarn
yarn pretify:html
```
Uses Prettier to pretify HTML files from `dist` folder

**_Dont use `npm` and `yarn` in the same project - this can lead to unnexpected results_**
