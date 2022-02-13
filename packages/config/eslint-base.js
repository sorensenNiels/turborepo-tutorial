module.exports = {
  ignorePatterns: [
    '.eslintrc*.js',
    'jest.config.js',
    'config',
    '**/*.js',
    'node_modules',
    '.turbo',
    'dist',
    'coverage'
  ],

  root: true,

  env: {
    node: true,
    jest: true
  },

  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.json'],
    sourceType: 'module',
    ecmaVersion: 2020
  },

  plugins: ['import', '@typescript-eslint/eslint-plugin', 'promise'],

  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:promise/recommended',
    'plugin:prettier/recommended'
  ],

  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 2,
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/lines-between-class-members': 'off',
    '@typescript-eslint/explicit-function-return-type': 'warn',
    '@typescript-eslint/no-useless-constructor': 'warn',

    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],

    'import/prefer-default-export': 'off',
    'import/no-named-as-default': 'off',
    'import/no-unresolved': 'off',
    'import/namespace': 'off',
    'import/no-cycle': 'warn',

    'no-console': 'warn',
    'no-return-await': 'error',
    'max-classes-per-file': 'off',
    'class-methods-use-this': 'off',
    'no-param-reassign': 'error'
  }
};
