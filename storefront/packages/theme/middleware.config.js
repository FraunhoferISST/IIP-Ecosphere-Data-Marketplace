const { createApiClient } = require("@vue-storefront/iiepmarket-api/server")

module.exports = {
  integrations: {
    iiepmarket: {
      location: '@vue-storefront/iiepmarket-api/server',
      configuration: {
        api: {
          createApiClient,
          url: process.env.NUXT_API_BASE_URL || "http://localhost:3000/graphql",
        },
      },
    }
  }
};
