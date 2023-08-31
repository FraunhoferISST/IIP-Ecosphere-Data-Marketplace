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
    label: "Reviews",
    name: "Reviews",
    version: pkg.version,
    collections: {
      Reviews: {
        name: "Reviews",
        indexes: [
          [{ accountId: 1, attributedShopId: 1 }, { name: "c2_accountId" }],
          [{ accountId: 1, attributedProductId: 1 }, { name: "c2_accountId" }],
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
  });
};
