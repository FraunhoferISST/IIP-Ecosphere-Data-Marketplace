const { getIdUtils } = require("../../xforms/id");

module.exports = async (_, { shopId, accountId, id, inquiryReply }, context) =>
  context.mutations.replyToInquiry(context, {
    inquiryReply,
    shopId: getIdUtils().decodeShopOpaqueId(shopId),
    accountId: getIdUtils().decodeAccountOpaqueId(accountId),
    inquiryId: getIdUtils().decodeInquiryOpaqueId(id),
  });
