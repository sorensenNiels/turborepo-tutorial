module.exports = {
  ...require('./jest-common'),

  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.ts$': 'ts-jest',
    '^.+\\.js$': 'ts-jest'
    // '^.+\\.(t|j)s$': 'ts-jest'
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',

  testEnvironment: 'node',
  setupFilesAfterEnv: ['@testing-library/jest-dom'],

  coveragePathIgnorePatterns: [],
  coverageThreshold: null
}
