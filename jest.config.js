module.exports = {
  bail: true,
  coverageProvider: "v8",

  testMatch: ["**/*.test.js"],
  testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/.next/", "<rootDir>/.husky/"],
};
