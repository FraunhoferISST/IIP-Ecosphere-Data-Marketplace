import createAccountCartMutation from "./createAccountCartMutation";
import type { Cart } from "../../types";

const prepareResponse = ({ data: { createCart: { cart } }}): Cart => cart;

export const createAccountCart = async (context: Record<any, any>, params: Record<string, unknown>): Promise<Cart> =>
  context.client.mutate({
    mutation: createAccountCartMutation,
    variables: params,
  })
    .then(response => {
      const cart: Cart = prepareResponse(response);
      context.config.state.setCartId(cart._id);
      return cart;
    });

