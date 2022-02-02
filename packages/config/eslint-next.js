module.exports = {
  env: {
    browser: true,
    node: true
  },

  plugins: ['import', '@typescript-eslint/eslint-plugin'],

  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'next/core-web-vitals',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'prettier'
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

    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],

    'no-console': 'error'
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
