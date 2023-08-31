import updateCartItemsQuantityMutation from "./updateCartItemsQuantityMutation";
import type { Cart } from "../../types";

const prepareResponse = ({ data: { updateCartItemsQuantity: { cart } }}): Cart => cart;

export const updateCartItemsQuantity = async (context: Record<any, any>, params: Record<string, unknown>): Promise<Cart> =>
  context.client.mutate({
    mutation: updateCartItemsQuantityMutation,
    variables: params,
  })
    .then(response => {
      return prepareResponse(response);
    });

