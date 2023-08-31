import addCartItemsMutation from "./addCartItemsMutation";
import type { Cart } from "../../types";

const prepareResponse = ({ data: { addCartItems: { cart } }}): Cart => cart;

export const addCartItems = async (context: Record<any, any>, params: Record<string, unknown>): Promise<Cart> =>
  context.client.mutate({
    mutation: addCartItemsMutation,
    variables: {
      ...params,
      cartId: context.config.state.getCartId(),
    },
  })
    .then(response => {
      return prepareResponse(response);
    });

