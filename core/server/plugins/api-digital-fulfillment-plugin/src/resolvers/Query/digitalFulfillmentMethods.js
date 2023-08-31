const { getIdUtils } = require("../../xforms/id");

/**
 * @name Query/digitalFulfillmentMethods
 * @method
 * @memberof Fulfillment/Query
 * @summary Query for a list of fulfillment methods
 * @param {Object} _ - unused
 * @param {Object} args - an object of all arguments that were sent by the client
 * @param {String} args.shopId - Shop ID to get records for
 * @param {Object} context - an object containing the per-request state
 * @returns {Promise<Object>} Fulfillment methods
 */
module.exports = async (_, args, context) => {
  const { shopId: opaqueShopId } = args;

  const shopId = getIdUtils().decodeShopOpaqueId(opaqueShopId);

  const methods = await context.queries.digitalFulfillmentMethods(context, {
    shopId,
  });

  return { methods };
};
