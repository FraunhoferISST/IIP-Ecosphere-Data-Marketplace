import getReviewsQuery from "./getReviewsQuery";
import type {Context, Review} from "../../types";

const prepareResponse = ({ data: { reviews } }): Review[] => reviews.reviews;

export const getReviews = (context: Context, params: Record<any, any>): Promise<Review[]> => {
  return context.client
    .query({
      query: getReviewsQuery,
      variables: {
        ...params,
        shopId: context.config.state.getShopId(),
      },
    })
    .then((response) => prepareResponse(response));
};
