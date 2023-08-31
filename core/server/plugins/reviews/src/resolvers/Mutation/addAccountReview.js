const { getIdUtils, namespaces } = require("../../xforms/id");

module.exports = async (_, { input }, context) => {
  const shopId = getIdUtils().decodeShopOpaqueId(input.shopId);
  const accountId = getIdUtils().decodeAccountOpaqueId(input.accountId);
  const attributedAccountId = getIdUtils().decodeAccountOpaqueId(
    input.attributedAccountId
  );

  return context.mutations.addAccountReview(context, {
    ...input,
    namespace: namespaces.Product,
    shopId,
    accountId,
    attributedAccountId,
  });
};
