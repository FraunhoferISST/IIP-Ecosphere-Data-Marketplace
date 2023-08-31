const { getIdUtils } = require("../../xforms/id");

module.exports = async (_, args, context) => {
  const { orderId: opaqueOrderId, shopId: opaqueShopId } = args;

  const orderId = getIdUtils().decodeOrderOpaqueId(opaqueOrderId);
  const shopId = getIdUtils().decodeShopOpaqueId(opaqueShopId);

  return context.queries.orderFulfillment(context, {
    orderId,
    shopId,
  });
};
