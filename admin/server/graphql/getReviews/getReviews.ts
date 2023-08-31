import getReviewsQuery from "~/server/graphql/getReviews/getReviewsQuery";
import { Review } from "~/types";

const prepareResponse = ({ data: { reviews } }): Review[] => reviews.reviews;

export const getReviews = (event, body): Promise<Review[]> => {
  return event.context.apiClient
    .query({
      query: getReviewsQuery,
      variables: {
        ...body,
        shopId: event.context.cookies.shopId,
      },
    })
    .then((response) => prepareResponse(response));
};
