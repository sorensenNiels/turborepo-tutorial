module.exports = {
  ...require('@nodesoft/shared-config/eslint-server'),
  parserOptions: {
    root: true,
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.lint.json']
  }
};
