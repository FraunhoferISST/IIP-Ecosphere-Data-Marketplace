const { getInquiry } = require("../util/getInquiry");
const {
  createInquiryReplyObject,
} = require("../util/createInquiryReplyObject");

module.exports = async (
  context,
  { inquiryId, shopId, accountId, inquiryReply }
) => {
  await getInquiry(context, { shopId, inquiryId });
  const inquiryReplyObject = createInquiryReplyObject({
    accountId,
    ...inquiryReply,
  });

  const updatedDoc = await context.collections.Inquiries.findOneAndUpdate(
    {
      _id: inquiryId,
      shopId,
    },
    {
      $push: { replies: inquiryReplyObject },
    },
    {
      returnDocument: "after",
      returnOriginal: false,
      upsert: false,
    }
  );
  return updatedDoc.value;
};
