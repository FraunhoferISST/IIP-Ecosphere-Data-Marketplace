const { getIdUtils } = require("../../xforms/id");

module.exports = async (_, { shopId, input }, context) =>
  context.mutations.updateShopInvoiceDetails(context, {
    shopId: getIdUtils().decodeShopOpaqueId(shopId),
    ...input,
  });
