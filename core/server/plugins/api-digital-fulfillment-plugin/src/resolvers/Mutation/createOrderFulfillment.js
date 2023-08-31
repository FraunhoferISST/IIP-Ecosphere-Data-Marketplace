const { getIdUtils } = require("../../xforms/id");

module.exports = async (parentResult, { input }, context) => {
  const { shopId: opaqueShopId, orderId: opaqueOrderId } = input;

  const shopId = getIdUtils().decodeShopOpaqueId(opaqueShopId);
  const orderId = getIdUtils().decodeOrderOpaqueId(opaqueOrderId);

  return context.mutations.createOrderFulfillment(context, {
    ...input,
    shopId,
    orderId,
  });
};
