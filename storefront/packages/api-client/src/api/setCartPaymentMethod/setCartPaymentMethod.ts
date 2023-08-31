import setCartPaymentMethodMutation from "./setCartPaymentMethodMutation";
import type { PaymentMethod } from "../../types";

type CartPaymentMethod = Pick<PaymentMethod, "name" | "displayName" | "pluginName">

const prepareResponse = ({ data: { setCartPaymentMethod }}): CartPaymentMethod => setCartPaymentMethod;

export const setCartPaymentMethod = async (context: Record<any, any>, params: Record<string, unknown>): Promise<CartPaymentMethod> =>
  context.client.mutate({
    mutation: setCartPaymentMethodMutation,
    variables: {
      ...params,
      cartId: context.config.state.getCartId(),
      shopId: context.config.state.getShopId(),
    },
  })
    .then(response => {
      return prepareResponse(response);
    });

