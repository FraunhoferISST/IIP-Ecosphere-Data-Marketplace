/**
 * @name digitalFulfillmentMethods
 * @method
 * @memberof Fulfillment/Queries
 * @summary Query the Shipping collection for a list of fulfillment methods
 * @param {Object} context - an object containing the per-request state
 * @param {Object} input - Request input
 * @param {String} input.shopId - The shop id of the fulfillment methods
 * @returns {Promise<Object>} Mongo cursor
 */
module.exports = async (context, input) => {
  const { collections } = context;
  const { DigitalDistribution } = collections;
  const { shopId } = input;

  const methods = [];

  await context.validatePermissions("reaction:legacy:shippingMethods", "read", {
    shopId,
  });

  const methodsContainer = await DigitalDistribution.find({
    shopId,
  }).toArray();

  methodsContainer.forEach((doc) => methods.push(...(doc.methods ?? [])));

  return methods.map((m) => ({ ...m, isEnabled: m.enabled }));
};
