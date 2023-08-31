const { getIdUtils } = require("../../xforms/id");
const updateDigitalFulfillmentMethodMutation = require("../../mutations/updateDigitalFulfillmentMethod");

/**
 * @name Mutation/updateFlatRateFulfillmentMethod
 * @method
 * @memberof Fulfillment/GraphQL
 * @summary resolver for the updateFlatRateFulfillmentMethod GraphQL mutation
 * @param {Object} parentResult - unused
 * @param {Object} input - an object of all mutation arguments that were sent by the client
 * @param {String} input.methodId - The ID of the method you want to update
 * @param {Object} input.method - The full updated method object, without ID
 * @param {String} input.shopId - The shop to update this flat rate fulfillment method for
 * @param {String} [input.clientMutationId] - An optional string identifying the mutation call
 * @param {Object} context - an object containing the per-request state
 * @returns {Promise<Object>} UpdateFlatRateFulfillmentMethodPayload
 */
module.exports = async (parentResult, { input }, context) => {
  const { method, methodId: opaqueMethodId, shopId: opaqueShopId } = input;

  const shopId = getIdUtils().decodeShopOpaqueId(opaqueShopId);
  const methodId = getIdUtils().decodeFulfillmentMethodOpaqueId(opaqueMethodId);

  const { method: updatedMethod } =
    await updateDigitalFulfillmentMethodMutation(context, {
      method,
      methodId,
      shopId,
    });

  return {
    method: updatedMethod,
  };
};
