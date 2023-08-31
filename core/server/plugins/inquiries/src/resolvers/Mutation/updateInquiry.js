const { getIdUtils } = require("../../xforms/id");

module.exports = async (_, { shopId, accountId, id, inquiry }, context) =>
  context.mutations.updateInquiry(context, {
    inquiry,
    shopId: getIdUtils().decodeShopOpaqueId(shopId),
    accountId: getIdUtils().decodeAccountOpaqueId(accountId),
    inquiryId: getIdUtils().decodeInquiryOpaqueId(id),
  });
