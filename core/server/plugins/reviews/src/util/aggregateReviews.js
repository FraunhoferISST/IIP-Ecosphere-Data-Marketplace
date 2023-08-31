const { omitBy, isEmpty } = require("lodash");

const hasOnlyOneAttributedTo = (input) =>
  ["attributedShopId", "attributedProductId", "attributedAccountId"]
    .map((prop) => prop in input)
    .filter((isIn) => isIn).length === 1;

const getGroupProperty = (query) => {
  const groupProp = [
    "attributedShopId",
    "attributedProductId",
    "attributedAccountId",
  ].filter((prop) => prop in query)[0];
  if (!groupProp) {
    throw Error("One of the 'attributed' arguments has to be provided");
  }
  return groupProp;
};

module.exports.aggregateReviews = async (
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
  const query = omitBy(
    {
      accountId,
      shopId,
      attributedAccountId,
      attributedProductId,
      attributedShopId,
    },
    isEmpty
  );
  const aggregation = await Reviews.aggregate([
    { $match: query },
    {
      $facet: {
        numbers: [
          {
            $group: {
              _id: {
                review: `$${getGroupProperty(query)}`,
                rating: "$reviewRating",
              },
              count: {
                $sum: 1.0,
              },
            },
          },
          {
            $group: {
              _id: "$_id.review",
              counts: {
                $push: {
                  rating: "$_id.rating",
                  count: "$count",
                },
              },
              totalReviewsCount: {
                $sum: "$count",
              },
              totalRating: {
                $sum: { $multiply: ["$_id.rating", "$count"] },
              },
            },
          },
        ],
      },
    },
    {
      $unwind: "$numbers",
    },
    {
      $project: {
        totalCount: "$numbers.totalReviewsCount",
        averageRating: {
          $divide: ["$numbers.totalRating", "$numbers.totalReviewsCount"],
        },
        _id: "$numbers._id",
        counts: "$numbers.counts",
      },
    },
  ]).toArray();
  return (
    aggregation[0] ?? {
      totalCount: 0,
      averageRating: 0,
      counts: [],
    }
  );
};
