module.exports = {
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
  transformIgnorePatterns: [
    "node_modules/(?!cheerio|enzyme|@wojtekmaj)/"
  ]
};