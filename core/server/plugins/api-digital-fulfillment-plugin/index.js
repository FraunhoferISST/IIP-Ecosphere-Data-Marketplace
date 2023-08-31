const i18n = require("./src/i18n");
const getFulfillmentMethodsWithQuotes = require("./src/getFulfillmentMethodsWithQuotes");
const resolvers = require("./src/resolvers");
const mutations = require("./src/mutations");
const policies = require("./src/policies.json");
const queries = require("./src/queries");

const pkg = require("./package.json");

module.exports = async (app) => {
  const { default: importAsString } = await import(
    "@reactioncommerce/api-utils/importAsString.js"
  );
  const schema = importAsString("./src/schemas/schema.graphql");
  return app.registerPlugin({
    label: "Digital distribution",
    name: "digital-distribution",
    version: pkg.version,
    i18n,
    collections: {
      DigitalDistribution: {
        name: "DigitalDistribution",
        indexes: [
          [{ name: 1 }, { name: "c2_name" }],
          [{ shopId: 1 }, { name: "c2_shopId" }],
        ],
      },
    },
    graphQL: {
      resolvers,
      schemas: [schema],
    },
    mutations,
    policies,
    queries,
    functionsByType: {
      getFulfillmentMethodsWithQuotes: [getFulfillmentMethodsWithQuotes],
    },
  });
};
