module.exports = {
  ...require('config/eslint-next.js'),
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: './tsconfig.json'
  },
  rules: {
    'import/prefer-default-export': 'off',
    'eact/function-component-definition': 'off'
  }
};
