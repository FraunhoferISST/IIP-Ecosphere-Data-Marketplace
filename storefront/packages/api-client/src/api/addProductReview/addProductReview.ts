import addProductReviewsMutation from "./addProductReviewsMutation";
import type {Context, Review} from "../../types";

const prepareResponse = ({ data }): Review => data;

export const addProductReview = (context: Context, params: Record<any, any>): Promise<Review> => {
  return context.client
    .mutate({
      mutation: addProductReviewsMutation,
      variables: {
        input: {
          ...params,
          attributedProductId: params.attributedProductId,
          shopId: context.config.state.getShopId(),
          accountId: context.config.state.getUserId()},
      },
    })
    .then((response) => prepareResponse(response));
};
