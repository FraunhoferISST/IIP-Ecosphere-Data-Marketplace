const { getIdUtils } = require("../../xforms/id");

const tryConvertId = (attributedId, convertMethod) => {
  try {
    return convertMethod(attributedId ?? "");
  } catch {
    return "";
  }
};

module.exports = async (_, args, context) => {
  const shopId = getIdUtils().decodeShopOpaqueId(args.shopId);
  const accountId = getIdUtils().decodeAccountOpaqueId(args.accountId);

  const attributedShopId = tryConvertId(
    args.attributedId,
    getIdUtils().decodeShopOpaqueId
  );
  const attributedAccountId = tryConvertId(
    args.attributedId,
    getIdUtils().decodeAccountOpaqueId
  );
  const attributedProductId = tryConvertId(
    args.attributedId,
    getIdUtils().decodeProductOpaqueId
  );

  return context.queries.canAddReview(context, {
    shopId,
    accountId,
    attributedShopId,
    attributedProductId,
    attributedAccountId,
  });
};
