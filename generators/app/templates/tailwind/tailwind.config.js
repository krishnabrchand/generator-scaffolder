const config = require('./config.json');

const REM_BASE = 10;
const round = (num) =>
  num
    .toFixed(7)
    .replace(/(\.[0-9]+?)0+$/, '$1')
    .replace(/\.0$/, '');
const rem = (px, base = REM_BASE) => `${round(px / base)}rem`;
const stripUnit = (value) => parseInt(value, 10);
const media = (resolution, mobileFirst = true) => {
  if (mobileFirst) {
    return `@media (min-width: ${stripUnit(resolution)}px)`;
  }

  return `@media (max-width: ${stripUnit(resolution) - 1}px)`;
};

module.exports = {
  purge: {
    content: [`${config.src}/${config.templates.src}/**/*`, `${config.src}/${config.scripts.src}/**/*`],
    options: {
      whitelist: ['[class^="icon-"]', '[class*="icon-"]', '::selection', '::-moz-selection', '[class^="aspect-ratio-"]'],
    },
  },
  theme: {},
  variants: {
    appearance: [],
  },
  plugins: [],
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
};
