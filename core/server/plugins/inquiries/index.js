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
    label: "Inquiries",
    name: "inquiries",
    version: pkg.version,
    collections: {
      Inquiries: {
        name: "Inquiries",
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
