const { aggregateReviews } = require("../../util/aggregateReviews");

module.exports = {
  avgRating: async (node, _, context) => {
    const reviewsAggregation = await aggregateReviews(context, {
      attributedProductId: node._id,
    });
    return reviewsAggregation.averageRating;
  },
  reviewsTotalCount: async (node, _, context) => {
    const reviewsAggregation = await aggregateReviews(context, {
      attributedProductId: node._id,
    });
    return reviewsAggregation.totalCount;
  },
};
