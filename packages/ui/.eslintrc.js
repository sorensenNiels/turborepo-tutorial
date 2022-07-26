module.exports = {
  ...require('@dk-nodesoft/shared-config/eslint-next.js'),
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: './tsconfig.json'
  },
  rules: {
    'import/prefer-default-export': 'off',
    'react/function-component-definition': 'off'
  }
};
