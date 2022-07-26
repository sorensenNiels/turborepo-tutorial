module.exports = {
  ...require('@dk-nodesoft/shared-config/eslint-nest'),
  parserOptions: {
    root: true,
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.lint.json']
  }
};
