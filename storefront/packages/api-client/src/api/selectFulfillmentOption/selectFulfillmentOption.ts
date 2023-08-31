import selectFulfillmentOptionMutation from "./selectFulfillmentOptionMutation";
import type { Cart } from "../../types";

const prepareResponse = ({ data: { selectFulfillmentOptionForGroup: { cart } }}): Cart => cart;

export const selectFulfillmentOption = async (context: Record<any, any>, params: Record<string, unknown>): Promise<Cart> =>
  context.client.mutate({
    mutation: selectFulfillmentOptionMutation,
    variables: {
      ...params,
      cartId: context.config.state.getCartId(),
    },
  })
    .then(response => {
      return prepareResponse(response);
    });

