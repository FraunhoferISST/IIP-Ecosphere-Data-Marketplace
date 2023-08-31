const { createInquiryObject } = require("../util/createInquiryObject");

module.exports = async (context, input) => {
  const inquiry = createInquiryObject({
    ...input,
    accountId: context.accountId,
  });

  await context.collections.Inquiries.insertOne(inquiry);
  return inquiry;
};
