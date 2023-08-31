import canAddReviewQuery from "./canAddReviewQuery";
import type {Context} from "../../types";

const prepareResponse = ({ data: { canAddReview: { canAddReview } } }): boolean => canAddReview;

export const canAddReview = (context: Context, params: Record<any, any>): Promise<boolean> => {
  return context.client
    .query({
      query: canAddReviewQuery,
      variables: {
        ...params,
        shopId: context.config.state.getShopId(),
        accountId: context.config.state.getUserId(),
      },
    })
    .then((response) => prepareResponse(response));
};
