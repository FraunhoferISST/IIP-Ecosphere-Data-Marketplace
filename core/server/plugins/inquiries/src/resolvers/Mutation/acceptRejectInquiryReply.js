const { getIdUtils } = require("../../xforms/id");

module.exports = async (_, { shopId, accountId, id, input }, context) =>
  context.mutations.acceptRejectInquiryReply(context, {
    ...input,
    shopId: getIdUtils().decodeShopOpaqueId(shopId),
    accountId: getIdUtils().decodeAccountOpaqueId(accountId),
    inquiryId: getIdUtils().decodeInquiryOpaqueId(id),
    replyId: getIdUtils().decodeInquiryReplyOpaqueId(input.replyId),
  });
