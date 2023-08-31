const { omitBy, isEmpty } = require("lodash");

const checkOrderPermissions = async (context, shopId, order) => {
  // you must either have `reaction:legacy:orders/read` permissions,
  // or this must be your own order
  await context.validatePermissions("reaction:legacy:orders", "read", {
    shopId,
    owner: order.accountId,
  });
};

module.exports.getReviews = async (
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
  return Reviews.find(
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
  )
    .sort({ _id: -1 })
    .toArray();
};
