const { createReview } = require("../util/createReview");
const { geAccountOrders } = require("../util/getAccountOrders");

module.exports = async (context, input) => {
  const review = createReview(input);

  // if there are orders, account can review a shop
  await geAccountOrders(context, review.accountId, review.attributedShopId);

  await context.collections.Reviews.insertOne(review);
  return review;
};
