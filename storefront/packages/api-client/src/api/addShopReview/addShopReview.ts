import addShopReviewMutation from "./addShopReviewMutation";
import type {Context, Review} from "../../types";

const prepareResponse = ({ data }): Review => data;

export const addShopReview = (context: Context, params: Record<any, any>): Promise<Review> => {
  return context.client
    .mutate({
      mutation: addShopReviewMutation,
      variables: {
        input: {
          ...params,
          attributedShopId: params.attributedShopId,
          shopId: context.config.state.getShopId(),
          accountId: context.config.state.getUserId()},
      },
    })
    .then((response) => prepareResponse(response));
};
