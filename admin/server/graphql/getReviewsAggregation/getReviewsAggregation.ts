import getReviewsAggregationQuery from "~/server/graphql/getReviewsAggregation/getReviewsAggregationQuery";

const prepareResponse = ({ data: { reviewsAggregation } }) =>
  reviewsAggregation;

export const getReviewsAggregation = (event, body) => {
  return event.context.apiClient
    .query({
      query: getReviewsAggregationQuery,
      variables: {
        ...body,
        shopId: event.context.cookies.shopId,
      },
    })
    .then((response) => prepareResponse(response));
};
