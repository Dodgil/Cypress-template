const { defineConfig } = require("cypress");

module.exports = defineConfig({
  videoUploadOnPasses: false,
  videoCompression: 15,
  retries: 1,
  viewportHeight: 1200,
  viewportWidth: 1600,

  env: {
    W_URL: "http://localhost:",
  },

  numTestsKeptInMemory: 1,

  // e2e: {
  //   setupNodeEvents(on, config) {
  //     return require('./cypress/plugins/index.js')(on, config)
  //   },
  //   specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
  // },
  projectId: "ynoqzw",

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
