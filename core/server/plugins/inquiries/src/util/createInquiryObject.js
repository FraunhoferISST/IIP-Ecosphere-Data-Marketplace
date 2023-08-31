const SimpleSchema = require("simpl-schema");
const Random = require("@reactioncommerce/random");

const inputSchema = new SimpleSchema({
  accountId: String,
  title: {
    type: String,
    optional: false,
  },
  description: {
    type: String,
    optional: true,
  },
  license: {
    type: String,
    optional: true,
  },
  shopId: String,
  sourceTypes: {
    type: Array,
    optional: true,
  },
  "sourceTypes.$": {
    type: String,
  },
  useCase: {
    type: String,
    optional: true,
  },
  categories: {
    type: Array,
    optional: true,
  },
  "categories.$": {
    type: String,
  },
  expectedConsumptionVolume: {
    type: String,
    optional: true,
  },
  desiredPricing: {
    type: String,
    optional: true,
  },
  expirationDate: {
    type: String,
    optional: true,
  },
  published: {
    type: Boolean,
  },
});

module.exports.createInquiryObject = (input) => {
  const cleanedInput = inputSchema.clean(input);
  inputSchema.validate(cleanedInput);
  return {
    _id: Random.id(),
    ...cleanedInput,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
};
