const SimpleSchema = require("simpl-schema");
const Random = require("@reactioncommerce/random");

const inputSchema = new SimpleSchema({
  accountId: String,
  attributedShopId: {
    type: String,
    optional: true,
  },
  attributedProductId: {
    type: String,
    optional: true,
  },
  attributedAccountId: {
    type: String,
    optional: true,
  },
  shopId: String,
  reviewBody: {
    type: String,
    minCount: 1,
    optional: true,
  },
  namespace: {
    type: String,
    minCount: 1,
  },
  reviewRating: {
    type: Number,
    min: 1,
    max: 5,
  },
});

const hasOnlyOneAttributedTo = (input) =>
  ["attributedShopId", "attributedProductId", "attributedAccountId"]
    .map((prop) => prop in input)
    .filter((isIn) => isIn).length === 1;

module.exports.createReview = (input) => {
  const cleanedInput = inputSchema.clean(input);
  inputSchema.validate(cleanedInput);
  if (!hasOnlyOneAttributedTo(input)) {
    throw Error("Review must be attributed to (only) one entity!");
  }
  return {
    _Id: Random.id(),
    ...cleanedInput,
    createdAt: new Date().toISOString(),
    published: true,
  };
};
