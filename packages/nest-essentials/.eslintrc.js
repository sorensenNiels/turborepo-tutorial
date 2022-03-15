module.exports = {
  ...require('shared-config/eslint-nest'),
  parserOptions: {
    root: true,
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.lint.json']
  }
};
