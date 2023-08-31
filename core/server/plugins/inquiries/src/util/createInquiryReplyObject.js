const SimpleSchema = require("simpl-schema");
const Random = require("@reactioncommerce/random");
const { getIdUtils } = require("../xforms/id");

const inputSchema = new SimpleSchema({
  accountId: String,
  message: {
    type: String,
    optional: false,
  },
  offers: {
    type: Array,
    optional: true,
  },
  "offers.$": {
    type: Object,
  },
  "offers.$.variantId": {
    type: String,
  },
  "offers.$.productId": {
    type: String,
  },
});

module.exports.createInquiryReplyObject = (input) => {
  const cleanedInput = inputSchema.clean(input);
  inputSchema.validate(cleanedInput);
  if (cleanedInput.offers) {
    cleanedInput.offers = cleanedInput.offers.map(
      ({ variantId, productId }) => ({
        variantId: getIdUtils().decodeCatalogProductVariantOpaqueId(variantId),
        productId: getIdUtils().decodeCatalogProductOpaqueId(productId),
      })
    );
  }
  return {
    _id: Random.id(),
    ...cleanedInput,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
};
