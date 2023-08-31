import getAccountCartQuery from "./getAccountCartQuery";
import type { Cart } from "../../types";

const prepareResponse = ({ data: { accountCartByAccountId }}): Cart => accountCartByAccountId;

export const getAccountCart = async (context: Record<any, any>, params: Record<any, any>): Promise<Cart> =>
  context.client.query({
    query: getAccountCartQuery,
    variables: params,
  })
    .then(response => {
      if (!response?.data?.accountCartByAccountId) {
        context.config.state.setCartId(null);
        return null;
      }
      const cart: Cart = prepareResponse(response);
      context.config.state.setCartId(cart._id);
      return cart;
    });

