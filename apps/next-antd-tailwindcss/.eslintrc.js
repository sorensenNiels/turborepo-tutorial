module.exports = {
  ...require('@nodesoft/shared-config/eslint-next.js'),
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: './tsconfig.json'
  }
};
