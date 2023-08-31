import updateFulfillmentOptionsMutation from "./updateFulfillmentOptionsMutation";
import type { Cart } from "../../types";

const prepareResponse = ({ data: { updateFulfillmentOptionsForGroup: { cart } }}): Cart => cart;

export const updateFulfillmentOptions = async (context: Record<any, any>, params: Record<string, unknown>): Promise<Cart> =>
  context.client.mutate({
    mutation: updateFulfillmentOptionsMutation,
    variables: {
      ...params,
      cartId: context.config.state.getCartId(),
    },
  })
    .then(response => {
      return prepareResponse(response);
    });

