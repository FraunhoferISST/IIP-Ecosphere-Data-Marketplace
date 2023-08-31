module.exports.getInquiryReply = async (
  context,
  { shopId, inquiryId, replyId }
) => {
  const {
    collections: { Inquiries },
  } = context;
  const inquiry = await Inquiries.findOne({ shopId, _id: inquiryId });
  if (!inquiry) {
    throw Error("Inquiry not found");
  }
  const inquiryReply = inquiry.replies.find(({ _id }) => _id === replyId);
  if (!inquiryReply) {
    throw Error("Inquiry reply not found");
  }
  return inquiryReply;
};
