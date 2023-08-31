const { getIdUtils } = require("../../xforms/id");

module.exports = async (_, args, context) => {
  const shopId = getIdUtils().decodeShopOpaqueId(args.shopId);
  const inquiryId = getIdUtils().decodeInquiryOpaqueId(args.id);

  return context.queries.inquiry(context, {
    shopId,
    inquiryId,
  });
};
