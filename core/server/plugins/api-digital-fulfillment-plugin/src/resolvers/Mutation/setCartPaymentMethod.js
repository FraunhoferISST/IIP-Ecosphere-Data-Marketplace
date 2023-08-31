const { getIdUtils } = require("../../xforms/id");

module.exports = async (parentResult, { input }, context) => {
  const { shopId: opaqueShopId, cartId: opaqueCartId } = input;

  const shopId = getIdUtils().decodeShopOpaqueId(opaqueShopId);
  const cartId = getIdUtils().decodeCartOpaqueId(opaqueCartId);

  return context.mutations.setCartPaymentMethod(context, {
    ...input,
    shopId,
    cartId,
  });
};
