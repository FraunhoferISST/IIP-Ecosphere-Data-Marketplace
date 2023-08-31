const { getIdUtils } = require("../../xforms/id");

const deleteDigitalFulfillmentMethodMutation = require("../../mutations/deleteDigitalFulfillmentMethod");

/**
 * @name Mutation/deleteFlatRateFulfillmentMethod
 * @method
 * @memberof Fulfillment/GraphQL
 * @summary resolver for the deleteFlatRateFulfillmentMethod GraphQL mutation
 * @param {Object} parentResult - unused
 * @param {Object} input - an object of all mutation arguments that were sent by the client
 * @param {String} input.methodId - The ID of the method you want to delete
 * @param {String} input.shopId - The shop to delete this flat rate fulfillment method for
 * @param {String} [input.clientMutationId] - An optional string identifying the mutation call
 * @param {Object} context - an object containing the per-request state
 * @returns {Promise<Object>} DeleteFlatRateFulfillmentMethodPayload
 */
module.exports = async (parentResult, { input }, context) => {
  const { methodId: opaqueMethodId, shopId: opaqueShopId } = input;

  const shopId = getIdUtils().decodeShopOpaqueId(opaqueShopId);
  const methodId = getIdUtils().decodeFulfillmentMethodOpaqueId(opaqueMethodId);

  const { method } = await deleteDigitalFulfillmentMethodMutation(context, {
    methodId,
    shopId,
  });

  return {
    method,
  };
};
