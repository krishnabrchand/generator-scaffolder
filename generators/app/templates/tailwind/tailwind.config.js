module.exports = {
  purge: ['./src/views/**/*', './src/js/**/*'],
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
