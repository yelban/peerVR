module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    'eslint:recommended',
    'plugin:eslint-plugin/recommended',
    'plugin:import/recommended',
    // 'recommended' is the combination of these two rule sets:
    // "plugin:import/errors"
    // "plugin:import/warnings"
    // 'plugin:prettier/recommended',
    'prettier', // eslint-config-prettier, Turns off all rules that are unnecessary or might conflict with Prettier.
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    'import/no-unresolved': ['error', { commonjs: true, amd: true }],
    'import/named': 'error',
    'import/namespace': 'error',
    'import/default': 'error',
    'import/export': 'error',
    'no-unused-vars': 'warn', // default in airbnb is error
    // indent: ['error', 4],
    'max-len': [
      'error',
      {
        code: 120,
      },
    ],
    // 'lines-around-comment': [
    //   'error',
    //   {
    //     beforeBlockComment: true,
    //     beforeLineComment: true,
    //   },
    // ],
    'eslint-plugin/require-meta-docs-description': 'error',
    // 'no-tabs': ['error', { allowIndentationTabs: true }],
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        semi: true,
      },
    ],
  },
  plugins: [
    'eslint-plugin',
    'simple-import-sort',
    'import',
    'prettier', // eslint-plugin-prettier, // require by "source.fixAll.eslint": true
  ],
};
