const capturePayment = require("./src/util/capturePayment");
const createAuthorizedPayment = require("./src/util/createAuthorizedPayment");
const mutations = require("./src/mutations");
const resolvers = require("./src/resolvers");

const pkg = require("./package.json");

module.exports = async (app) => {
  const { default: importAsString } = await import(
    "@reactioncommerce/api-utils/importAsString.js"
  );
  const schema = importAsString("./src/schemas/schema.graphql");
  return app.registerPlugin({
    label: "Bank Transfer payment",
    name: "bank-transfer",
    version: pkg.version,
    graphQL: {
      resolvers,
      schemas: [schema],
    },
    mutations,
    paymentMethods: [
      {
        name: "bank_transfer",
        canRefund: false,
        displayName: "Bank transfer",
        functions: {
          capturePayment,
          createAuthorizedPayment,
          createRefund: () => {},
          listRefunds: () =>
            new Promise((resolve) => {
              resolve([]);
            }),
        },
      },
    ],
  });
};
