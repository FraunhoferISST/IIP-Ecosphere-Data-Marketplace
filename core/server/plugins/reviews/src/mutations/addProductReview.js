const { createReview } = require("../util/createReview");
const { geAccountOrders } = require("../util/getAccountOrders");

const userAlreadyPurchasedProduct = (productId, orders) => {
  const purchasedItems = orders.map(({ shipping }) => shipping[0].items).flat();
  const purchasedItemsIds = purchasedItems.map(({ productId: pid }) => pid);
  return purchasedItemsIds.includes(productId);
};

module.exports = async (context, input) => {
  const review = createReview(input);

  const orders = await geAccountOrders(
    context,
    review.accountId,
    review.shopId
  );

  if (userAlreadyPurchasedProduct(review.attributedProductId, orders)) {
    await context.collections.Reviews.insertOne(review);
    return review;
  }
  throw Error("The account has no orders associated with this asset");
};
