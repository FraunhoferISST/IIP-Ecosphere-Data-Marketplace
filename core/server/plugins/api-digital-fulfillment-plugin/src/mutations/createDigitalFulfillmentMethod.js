const SimpleSchema = require("simpl-schema");
const Random = require("@reactioncommerce/random");
const ReactionError = require("@reactioncommerce/reaction-error");
const methodSchema = require("../util/methodSchema");

const inputSchema = new SimpleSchema({
  method: methodSchema,
  shopId: String,
});

/**
 * @method createFlatRateFulfillmentMethodMutation
 * @summary Creates a flat rate fulfillment method
 * @param {Object} context - an object containing the per-request state
 * @param {Object} input - Input (see SimpleSchema)
 * @returns {Promise<Object>} An object with a `method` property containing the created method
 */
module.exports = async (context, input) => {
  const cleanedInput = inputSchema.clean(input); // add default values and such
  inputSchema.validate(cleanedInput);

  const { method: inputMethod, shopId } = cleanedInput;
  const { collections } = context;
  const { DigitalDistribution } = collections;
  const method = { ...inputMethod };

  await context.validatePermissions(
    "reaction:legacy:shippingMethods",
    "create",
    { shopId }
  );

  const shippingRecord = await DigitalDistribution.findOne({
    "provider.name": "digitalDistribution",
    shopId,
  });
  if (!shippingRecord) {
    await DigitalDistribution.insertOne({
      _id: Random.id(),
      name: "Default digital distribution",
      shopId,
      provider: {
        enabled: true,
        label: "Digital distribution",
        name: "digitalDistribution",
      },
    });
  }

  method._id = Random.id();

  // MongoDB schema still uses `enabled` rather than `isEnabled`
  method.enabled = method.isEnabled;
  delete method.isEnabled;

  const { matchedCount } = await DigitalDistribution.updateOne(
    {
      shopId,
      "provider.name": "digitalDistribution",
    },
    {
      $addToSet: {
        methods: method,
      },
    }
  );

  if (matchedCount === 0)
    throw new ReactionError(
      "server-error",
      "Unable to create fulfillment method"
    );

  return { method };
};
