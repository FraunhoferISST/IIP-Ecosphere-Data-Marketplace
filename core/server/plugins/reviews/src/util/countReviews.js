const { omitBy, isEmpty } = require("lodash");

module.exports.countReviews = async (
  context,
  {
    attributedAccountId,
    attributedProductId,
    attributedShopId,
    accountId,
    shopId,
  }
) => {
  const {
    collections: { Reviews },
  } = context;
  return Reviews.count(
    omitBy(
      {
        accountId,
        shopId,
        attributedAccountId,
        attributedProductId,
        attributedShopId,
      },
      isEmpty
    )
  );
};
