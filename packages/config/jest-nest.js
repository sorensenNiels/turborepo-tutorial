const jestCommon = require('./jest-common');

module.exports = {
  ...jestCommon,

  resetMocks: false,

  testEnvironment: 'node',
  rootDir: 'src',

  moduleFileExtensions: ['js', 'json', 'ts'],

  testRegex: '.*\\.spec\\.ts$',

  transform: {
    // '.+\\.(t|j)s$': 'ts-jest'
    '.+\\.(t)s$': 'ts-jest'
  },

  // collectCoverageFrom: ['**/*.(t|j)s'],

  collectCoverageFrom: ['**/*.(t)s'],
  coverageDirectory: '../coverage'
};
