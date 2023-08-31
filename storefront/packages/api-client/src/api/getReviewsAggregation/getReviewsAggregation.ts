import getReviewsAggregationQuery from "./getReviewsAggregationQuery";
import type {ReviewsAggregation} from "../../../../../../shared/types";

const prepareResponse = ({ data: { reviewsAggregation } }) =>
  reviewsAggregation;

export const getReviewsAggregation = (context:Record<any, any>, params:Record<any, any>): ReviewsAggregation => {
  return context.client
    .query({
      query: getReviewsAggregationQuery,
      variables: {
        ...params,
        shopId: context.config.state.getShopId(),
      },
    })
    .then((response) => prepareResponse(response));
};
