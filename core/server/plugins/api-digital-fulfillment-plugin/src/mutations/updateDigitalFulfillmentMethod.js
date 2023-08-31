const SimpleSchema = require("simpl-schema");
const ReactionError = require("@reactioncommerce/reaction-error");
const methodSchema = require("../util/methodSchema");

const inputSchema = new SimpleSchema({
  method: methodSchema,
  methodId: String,
  shopId: String,
});

/**
 * @method updateFlatRateFulfillmentMethodMutation
 * @summary updates a flat rate fulfillment method
 * @param {Object} context - an object containing the per-request state
 * @param {Object} input - Input (see SimpleSchema)
 * @returns {Promise<Object>} An object with a `method` property containing the updated method
 */
module.exports = async (context, input) => {
  const cleanedInput = inputSchema.clean(input); // add default values and such
  inputSchema.validate(cleanedInput);

  const { method: inputMethod, methodId, shopId } = cleanedInput;
  const { collections } = context;
  const { Shipping } = collections;
  const method = { ...inputMethod };

  await context.validatePermissions(
    `reaction:legacy:shippingMethods:${methodId}`,
    "update",
    { shopId }
  );

  // MongoDB schema still uses `enabled` rather than `isEnabled`
  method.enabled = method.isEnabled;
  delete method.isEnabled;

  const { matchedCount } = await Shipping.updateOne(
    {
      "methods._id": methodId,
      shopId,
    },
    {
      $set: {
        "methods.$": {
          ...method,
          _id: methodId,
        },
      },
    }
  );
  if (matchedCount === 0) throw new ReactionError("not-found", "Not found");

  inputMethod._id = methodId;

  return { method: inputMethod };
};
