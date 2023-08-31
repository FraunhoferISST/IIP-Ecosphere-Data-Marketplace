const { getIdUtils } = require("../../xforms/id");

module.exports = async (_, { shopId, accountId, inquiry }, context) =>
  context.mutations.createInquiry(context, {
    ...inquiry,
    shopId: getIdUtils().decodeShopOpaqueId(shopId),
    accountId: getIdUtils().decodeAccountOpaqueId(accountId),
  });
