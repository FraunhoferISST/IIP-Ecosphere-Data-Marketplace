const { getIdUtils } = require("../../xforms/id");

module.exports = async (_, args, context) => {
  const {
    orderId: opaqueOrderId,
    shopId: opaqueShopId,
    languageCode = "EN",
  } = args;

  const orderId = getIdUtils().decodeOrderOpaqueId(opaqueOrderId);
  const shopId = getIdUtils().decodeShopOpaqueId(opaqueShopId);

  return context.queries.orderInvoice(context, {
    orderId,
    shopId,
    languageCode,
  });
};
