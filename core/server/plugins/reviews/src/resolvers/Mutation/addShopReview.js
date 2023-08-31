const { getIdUtils, namespaces } = require("../../xforms/id");

module.exports = async (_, { input }, context) => {
  const shopId = getIdUtils().decodeShopOpaqueId(input.shopId);
  const accountId = getIdUtils().decodeAccountOpaqueId(input.accountId);
  const attributedShopId = getIdUtils().decodeShopOpaqueId(
    input.attributedShopId
  );

  return context.mutations.addShopReview(context, {
    ...input,
    namespace: namespaces.Product,
    shopId,
    accountId,
    attributedShopId,
  });
};
