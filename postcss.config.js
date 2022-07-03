module.exports = {
  plugins: {
    'postcss-import': {},
    'postcss-flexbugs-fixes': {},
    tailwindcss: {},
    // autoprefixer: {},
    'postcss-preset-env': {
      autoprefixer: {
        flexbox: 'no-2009',
      },
      stage: 3,
      // browsers: [
      //   'extends browserslist-config-google',
      //   // 'last 2 versions',
      //   'ie > 10',
      // ],
      // stage: 0,
    },
    // "postcss-normalize": {},
    // 'cssnano': {},
  },
};
