import placeOrderMutation from "./placeOrderMutation";
import type { Order } from "../../types";

const prepareResponse = ({ data: { placeOrder: { orders } }}): Order[] => orders;

export const placeOrder = async (context: Record<any, any>, params: Record<string, unknown>): Promise<Order[]> =>
  context.client.mutate({
    mutation: placeOrderMutation,
    variables: {
      ...params,
      cartId: context.config.state.getCartId(),
      shopId: context.config.state.getShopId(),
    },
  })
    .then(response => {
      return prepareResponse(response);
    });

