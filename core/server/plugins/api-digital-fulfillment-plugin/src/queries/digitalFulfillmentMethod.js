/**
 * @name digitalFulfillmentMethod
 * @method
 * @memberof Fulfillment/Queries
 * @summary Query the Shipping collection for a single fulfillment method
 * @param {Object} context - an object containing the per-request state
 * @param {Object} input - Request input
 * @param {String} input.methodId - The fulfillment method id
 * @param {String} input.shopId - The shop id of the fulfillment method
 * @returns {Promise<Object>} Mongo cursor
 */
module.exports = async (context, input) => {
  const { collections } = context;
  const { DigitalDistribution } = collections;
  const { methodId, shopId } = input;

  await context.validatePermissions("reaction:legacy:shippingMethods", "read", {
    shopId,
  });

  const doc = await DigitalDistribution.findOne({
    "methods._id": methodId,
    shopId,
  });
  if (!doc) return null;

  const method = doc.methods.find((m) => m._id === methodId);
  return {
    ...method,
    isEnabled: method.enabled.shopId,
  };
};
