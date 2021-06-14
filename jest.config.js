module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  projects: ['<rootDir>'],
  testMatch: ['<rootDir>/src/**/*.test.ts'],
  moduleDirectories: ['node_modules', 'src'],
  moduleFileExtensions: ['js', 'ts'],
  collectCoverage: true,
  collectCoverageFrom: [
    "**/*.{js,ts}",
    "!**/*/index.ts",
    "!**/*/types.ts",
    "!**/*/pages.ts",
    "!**/*/logger.ts",
    "!**/*/browser.ts",
    "!**/*/constants.ts"
  ],
  coveragePathIgnorePatterns: [
    "<rootDir>/dist",
    "<rootDir>/coverage/",
    "<rootDir>/src/parsers/",
    "<rootDir>/node_modules/",
    "<rootDir>/jest.config.js",
  ]
};
