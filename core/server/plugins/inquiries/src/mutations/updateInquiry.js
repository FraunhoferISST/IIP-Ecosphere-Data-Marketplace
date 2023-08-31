const { createInquiryObject } = require("../util/createInquiryObject");
const { getInquiry } = require("../util/getInquiry");

module.exports = async (context, { inquiryId, shopId, accountId, inquiry }) => {
  const existingInquiry = await getInquiry(context, { shopId, inquiryId });
  const { _id, createdAt, ...inquiryRest } = createInquiryObject({
    ...inquiry,
    accountId: existingInquiry.accountId,
    shopId: existingInquiry.shopId,
  });

  const updatedDoc = await context.collections.Inquiries.findOneAndUpdate(
    {
      _id: inquiryId,
      shopId,
    },
    {
      $set: inquiryRest,
    },
    {
      returnDocument: "after",
      returnOriginal: false,
      upsert: false,
    }
  );
  return updatedDoc.value;
};
