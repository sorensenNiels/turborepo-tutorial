module.exports = {
  ...require('config/eslint-base'),
  parserOptions: {
    root: true,
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.lint.json']
  }
};
