module.exports = {
  env: {
    browser: true,
    node: true
  },

  plugins: ['import', '@typescript-eslint/eslint-plugin', 'promise'],

  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'next/core-web-vitals',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:promise/recommended',
    'plugin:prettier/recommended'
  ],

  settings: {
    next: {
      rootDir: ['apps/*/', 'packages/*/']
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx']
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: ['apps/*/tsconfig.json']
      }
    }
  },
  rules: {
    // next
    '@next/next/no-html-link-for-pages': 'off',

    'react/jsx-key': 'warn',

    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/lines-between-class-members': 'off',

    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],

    'import/prefer-default-export': 'off',
    'import/no-named-as-default': 'off',
    'import/no-unresolved': 'off',
    'import/namespace': 'off',
    'import/no-cycle': 'warn',

    'no-console': 'error',
    'no-return-await': 'error',
    'max-classes-per-file': 'off',
    'class-methods-use-this': 'off',
    'no-param-reassign': 'error'
  },
  ignorePatterns: [
    '**/*.js',
    '**/*.json',
    'node_modules',
    'public',
    'styles',
    '.next',
    'coverage',
    'dist',
    '.turbo'
  ]
};
