const { getIdUtils, namespaces } = require("../../xforms/id");

module.exports = async (_, { input }, context) => {
  const shopId = getIdUtils().decodeShopOpaqueId(input.shopId);
  const accountId = getIdUtils().decodeAccountOpaqueId(input.accountId);
  const attributedProductId = getIdUtils().decodeProductOpaqueId(
    input.attributedProductId
  );

  return context.mutations.addProductReview(context, {
    ...input,
    namespace: namespaces.Product,
    shopId,
    accountId,
    attributedProductId,
  });
};
