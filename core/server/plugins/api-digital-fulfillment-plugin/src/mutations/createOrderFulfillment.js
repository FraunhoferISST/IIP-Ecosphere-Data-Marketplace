const SimpleSchema = require("simpl-schema");
const { getOrder } = require("../util/getOrder");
const { encrypt } = require("../../../../utils/crypt");

const inputSchema = new SimpleSchema({
  orderId: String,
  shopId: String,
  fulfillment: {
    type: Array,
    minCount: 1,
  },
  "fulfillment.$": {
    type: Object,
  },
  "fulfillment.$.variantId": {
    type: String,
    min: 1,
  },
  "fulfillment.$.variantTitle": {
    type: String,
    optional: true,
  },
  "fulfillment.$.productId": {
    type: String,
    min: 1,
  },
  "fulfillment.$.quantity": {
    type: Number,
  },
  "fulfillment.$.distributionsGroups": {
    type: Array,
    minCount: 1,
  },
  "fulfillment.$.distributionsGroups.$": {
    type: Object,
    blackbox: true,
  },
});

module.exports = async (context, input) => {
  const cleanedInput = inputSchema.clean(input); // add default values and such
  inputSchema.validate(cleanedInput);

  const { fulfillment, orderId, shopId } = cleanedInput;

  const order = await getOrder(context, { _id: orderId }, shopId);

  await context.validatePermissions("reaction:legacy:orders", "update", {
    shopId,
    owner: order.accountId,
  });

  const encryptedFulfillment = fulfillment.map((f) => ({
    ...f,
    distributionsGroups: f.distributionsGroups.map((dg) => ({
      ...dg,
      distributions: dg.distributions.map((d) => ({
        ...d,
        accessUrl: d.accessUrl ? encrypt(d.accessUrl) : "",
        user: d.user ? encrypt(d.user) : "",
        password: d.password ? encrypt(d.password) : "",
      })),
    })),
  }));

  await context.collections.Orders.findOneAndUpdate(
    {
      _id: orderId,
      shopId,
    },
    {
      $set: {
        fulfillment: encryptedFulfillment,
      },
    }
  );
  return { fulfillment };
};
