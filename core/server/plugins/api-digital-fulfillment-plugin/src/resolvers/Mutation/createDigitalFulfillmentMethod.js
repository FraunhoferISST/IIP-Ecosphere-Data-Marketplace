const { getIdUtils } = require("../../xforms/id");
const createDigitalFulfillmentMethodMutation = require("../../mutations/createDigitalFulfillmentMethod");

/**
 * @name Mutation/createDigitalFulfillmentMethod
 * @method
 * @memberof Fulfillment/GraphQL
 * @summary resolver for the createFlatRateFulfillmentMethod GraphQL mutation
 * @param {Object} parentResult - unused
 * @param {Object} input - an object of all mutation arguments that were sent by the client
 * @param {Object} input.method - The method object
 * @param {String} input.shopId - The shop to create this flat rate fulfillment method for
 * @param {String} [input.clientMutationId] - An optional string identifying the mutation call
 * @param {Object} context - an object containing the per-request state
 * @returns {Promise<Object>} CreateFlatRateFulfillmentMethodPayload
 */
module.exports = async (parentResult, { input }, context) => {
  const { clientMutationId = null, method, shopId: opaqueShopId } = input;

  const shopId = getIdUtils().decodeShopOpaqueId(opaqueShopId);

  const { method: insertedMethod } =
    await createDigitalFulfillmentMethodMutation(context, {
      method,
      shopId,
    });

  return {
    clientMutationId,
    method: insertedMethod,
  };
};
