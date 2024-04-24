const { defineConfig } = require("cypress");

module.exports = defineConfig({
  baseUrl: "http://localhost:3000", // Set the baseUrl to your local development server
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
