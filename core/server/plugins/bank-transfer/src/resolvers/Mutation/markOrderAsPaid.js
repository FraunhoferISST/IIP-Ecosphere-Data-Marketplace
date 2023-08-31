const { getIdUtils } = require("../../xforms/id");

module.exports = async (_, { shopId, referenceId }, context) =>
  context.mutations.markOrderAsPaid(context, {
    shopId: getIdUtils().decodeShopOpaqueId(shopId),
    referenceId,
  });
