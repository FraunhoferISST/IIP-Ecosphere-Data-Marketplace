import setCartAddressMutation from "./setCartAddressMutation";
import type { Cart } from "../../types";

const prepareResponse = ({ data: { setShippingAddressOnCart: { cart } }}): Cart => cart;

export const setCartAddress = async (context: Record<any, any>, params: Record<string, unknown>): Promise<Cart> =>
  context.client.mutate({
    mutation: setCartAddressMutation,
    variables: {
      ...params,
      cartId: context.config.state.getCartId(),
    },
  })
    .then(response => {
      return prepareResponse(response);
    });

