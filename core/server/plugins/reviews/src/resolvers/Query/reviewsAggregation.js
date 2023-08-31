const { getIdUtils } = require("../../xforms/id");

module.exports = async (_, args, context) => {
  const shopId = getIdUtils().decodeShopOpaqueId(args.shopId);
  const accountId = getIdUtils().decodeAccountOpaqueId(args.accountId);
  const attributedShopId = getIdUtils().decodeShopOpaqueId(
    args.attributedShopId ?? ""
  );
  const attributedProductId = getIdUtils().decodeProductOpaqueId(
    args.attributedProductId ?? ""
  );
  const attributedAccountId = getIdUtils().decodeAccountOpaqueId(
    args.attributedAccountId ?? ""
  );

  return context.queries.reviewsAggregation(context, {
    shopId,
    accountId,
    attributedShopId,
    attributedProductId,
    attributedAccountId,
  });
};
