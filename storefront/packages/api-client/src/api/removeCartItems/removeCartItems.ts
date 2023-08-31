import removeCartItemsMutation from "./removeCartItemsMutation";
import type { Cart } from "../../types";

const prepareResponse = ({ data: { removeCartItems: { cart } }}): Cart => cart;

export const removeCartItems = async (context: Record<any, any>, params: Record<string, unknown>): Promise<Cart> =>
  context.client.mutate({
    mutation: removeCartItemsMutation,
    variables: params,
  })
    .then(response => {
      return prepareResponse(response);
    });

