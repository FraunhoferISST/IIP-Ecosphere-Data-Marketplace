const Logger = require("@reactioncommerce/logger");

const packageName = "digital-fulfillment";

/**
 * @summary Returns a list of fulfillment method quotes based on the items in a fulfillment group.
 * @param {Object} context - Context
 * @param {Object} commonOrder - details about the purchase a user wants to make.
 * @param {Array} [previousQueryResults] - an array of shipping rates and
 * info about failed calls to the APIs of some shipping methods providers
 * e.g Shippo.
 * @returns {Array} - an array that contains two arrays: the first array will
 * be an updated list of shipping rates, and the second will contain info for
 * retrying this specific package if any errors occurred while retrieving the
 * shipping rates.
 * @private
 */
module.exports = async (context, commonOrder, previousQueryResults = []) => {
  const { collections } = context;
  const { DigitalDistribution } = collections;
  const [rates = [], retrialTargets = []] = previousQueryResults;
  const currentMethodInfo = { packageName };

  if (retrialTargets.length > 0) {
    const isNotAmongFailedRequests = retrialTargets.every(
      (target) => target.packageName !== packageName
    );
    if (isNotAmongFailedRequests) {
      return previousQueryResults;
    }
  }

  const shippingRateDocs = await DigitalDistribution.find({
    shopId: commonOrder.shopId,
    "provider.enabled": true,
  }).toArray();

  const initialNumOfRates = rates.length;

  const awaitedShippingRateDocs = shippingRateDocs.map(async (doc) => {
    const carrier = doc.provider.label;
    // Check for method specific shipping restrictions
    const availableShippingMethods = doc.methods;
    for (const method of availableShippingMethods) {
      if (!method.rate) {
        method.rate = 0;
      }
      if (!method.handling) {
        method.handling = 0;
      }
      // Store shipping provider here in order to have it available in shipmentMethod
      // for cart and order usage
      if (!method.carrier) {
        method.carrier = carrier;
      }

      rates.push({
        carrier,
        handlingPrice: method.handling,
        method,
        rate: method.rate,
        shippingPrice: method.rate + method.handling,
        shopId: doc.shopId,
      });
    }
  });
  await Promise.all(awaitedShippingRateDocs);

  if (rates.length === initialNumOfRates) {
    const errorDetails = {
      requestStatus: "error",
      shippingProvider: packageName,
      message: "Flat rate shipping did not return any shipping methods.",
    };
    rates.push(errorDetails);
    retrialTargets.push(currentMethodInfo);
    return [rates, retrialTargets];
  }

  Logger.debug("Flat rate getFulfillmentMethodsWithQuotes", rates);
  return [rates, retrialTargets];
};
