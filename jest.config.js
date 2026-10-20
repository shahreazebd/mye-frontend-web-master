// You can learn more about each option below in the Jest docs: https://jestjs.io/docs/configuration.

module.exports = {
  roots: ["<rootDir>"],
  testEnvironment: "jest-environment-jsdom",
  testRegex: "(/__tests__/.*|(\\.|/)(test))\\.[jt]sx?$",
  moduleFileExtensions: ["ts", "tsx", "js", "json", "jsx"],
  testPathIgnorePatterns: [
    "<rootDir>/.next/",
    "<rootDir>[/\\\\](node_modules|.next)[/\\\\]",
    "<rootDir>/.jest/test-utils.tsx",
    "<rootDir>/__mocks__/*",
  ],
  transformIgnorePatterns: ["/node_modules/", "^.+\\.module\\.(css|sass|scss)$"],

  transform: {
    // Use babel-jest to transpile tests with the next/babel preset
    // https://jestjs.io/docs/configuration#transform-objectstring-pathtotransformer--pathtotransformer-object
    "^.+\\.(js|jsx|ts|tsx)$": ["babel-jest", { presets: ["next/babel"] }],
  },
  watchPlugins: ["jest-watch-typeahead/filename"],
  collectCoverage: false,
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
  coverageReporters: ["json", "html"],
  collectCoverageFrom: ["<rootDir>/**/*.*", "!**/*.d.ts", "!**/node_modules/**"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleNameMapper: {
    // Handle CSS imports (with CSS modules)
    // https://jestjs.io/docs/webpack#mocking-css-modules
    "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy",

    // Handle module aliases
    "^@/components/(.*)$": "<rootDir>/components/$1",
    "^@/pages/(.*)$": "<rootDir>/app/$1",
    "^@/lib(.*)$": "<rootDir>/lib$1",
    "^@/hooks(.*)$": "<rootDir>/hooks$1",
    "^@/tests(.*)$": "<rootDir>/.jest$1",
  },
};
