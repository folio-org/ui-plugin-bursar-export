const { join } = require('path');

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  testEnvironment: 'jsdom',

  preset: 'ts-jest',
  transform: {
    '^.+\\.(t|j)sx?$': 'ts-jest',
  },
  transformIgnorePatterns: ['node_modules/(?!@folio|ky)'],
  coverageProvider: 'v8',

  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json'],

  testMatch: ['**/src/**/?(*.)test.{js,jsx,ts,tsx}'],
  testPathIgnorePatterns: ['/node_modules/', 'src/typings/'],

  reporters: ['default', 'jest-junit'],

  coverageReporters: ['lcov', 'text'],
  coverageDirectory: './artifacts/coverage-jest/',
  collectCoverageFrom: [
    '<rootDir>/index.ts',
    '<rootDir>/src/**/*.{ts,tsx}',
    '!<rootDir>/src/**/*.d.ts',
    '!<rootDir>/src/**/*.test.{ts,tsx}',
    '!<rootDir>/src/test/**',
    '!**/node_modules/**',
  ],

  setupFiles: [join(__dirname, './src/test/setupTests.ts')],
  setupFilesAfterEnv: [join(__dirname, './src/test/jest.setup.ts')],

  moduleNameMapper: {
    '^.+\\.(css|svg)$': 'identity-obj-proxy',

    // Force module uuid to resolve with the CJS entry point, because Jest does not support package.json.exports. See https://github.com/uuidjs/uuid/issues/451
    uuid: require.resolve('uuid'),
  },

  slowTestThreshold: 10,
  testTimeout: 20000,

  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
};
