const { getIdUtils } = require("../../xforms/id");

/**
 * @name Query/flatRateFulfillmentMethod
 * @method
 * @memberof Fulfillment/Query
 * @summary Query for a single fulfillment method
 * @param {Object} _ - unused
 * @param {Object} args - an object of all arguments that were sent by the client
 * @param {String} args.methodId - Fulfillment method ID to get the record of
 * @param {String} args.shopId - Shop ID to get record for
 * @param {Object} context - an object containing the per-request state
 * @returns {Promise<Object>} Fulfillment method
 */
module.exports = async (_, args, context) => {
  const { methodId: opaqueMethodId, shopId: opaqueShopId } = args;

  const methodId = getIdUtils().decodeFulfillmentMethodOpaqueId(opaqueMethodId);
  const shopId = getIdUtils().decodeShopOpaqueId(opaqueShopId);

  return context.queries.digitalFulfillmentMethod(context, {
    methodId,
    shopId,
  });
};
