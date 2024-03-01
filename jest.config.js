const { join } = require('path');
const config = require('@folio/jest-config-stripes');

/** @type {import('ts-jest/dist/types').JestConfigWithTsJest} */
module.exports = {
  ...config,

  coverageProvider: 'v8',

  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json'],

  testMatch: ['**/src/**/?(*.)test.{js,jsx,ts,tsx}'],

  coverageReporters: ['lcov', 'text'],
  collectCoverageFrom: [
    '<rootDir>/index.ts',
    '<rootDir>/src/**/*.{ts,tsx}',
    '!<rootDir>/src/**/*.d.ts',
    '!<rootDir>/src/**/*.test.{ts,tsx}',
    '!<rootDir>/src/test/**',
    '!**/node_modules/**',
  ],

  setupFiles: [
    ...config.setupFiles,
    join(__dirname, './test/setupTests.ts')
  ],
  setupFilesAfterEnv: [join(__dirname, './test/jest.setup.ts')],

  preset: 'ts-jest',
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    ...config.transform
  },

  moduleNameMapper: {
    '^.+\\.(css|svg)$': 'identity-obj-proxy',

    // Force module uuid to resolve with the CJS entry point, because Jest does not support package.json.exports. See https://github.com/uuidjs/uuid/issues/451
    uuid: require.resolve('uuid'),
  },

  slowTestThreshold: 10,
  testTimeout: 20000,
};
