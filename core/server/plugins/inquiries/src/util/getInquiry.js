module.exports.getInquiry = async (context, { shopId, inquiryId }) => {
  const {
    collections: { Inquiries },
  } = context;
  const inquiry = await Inquiries.findOne({ shopId, _id: inquiryId });
  if (!inquiry) {
    throw Error("Inquiry not found");
  }
  return inquiry;
};
