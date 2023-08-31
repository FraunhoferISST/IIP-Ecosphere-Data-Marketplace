const { getInquiry } = require("../util/getInquiry");
const { getInquiryReply } = require("../util/getInquiryReply");

module.exports = async (
  context,
  { inquiryId, shopId, replyId, rejected, accepted }
) => {
  if (rejected && accepted) {
    throw Error("The reply can not be both rejected and accepted");
  }
  const inquiry = await getInquiry(context, { shopId, inquiryId });
  if (!context.account || inquiry.accountId !== context.accountId) {
    throw Error("Access denied");
  }
  const inquiryReply = await getInquiryReply(context, {
    shopId,
    inquiryId,
    replyId,
  });

  const updatedDoc = await context.collections.Inquiries.findOneAndUpdate(
    {
      _id: inquiryId,
      shopId,
      "replies._id": replyId,
    },
    {
      $set: {
        "replies.$": {
          ...inquiryReply,
          rejected,
          accepted,
        },
      },
    },
    {
      returnDocument: "after",
      returnOriginal: false,
      upsert: false,
    }
  );
  return updatedDoc.value;
};
