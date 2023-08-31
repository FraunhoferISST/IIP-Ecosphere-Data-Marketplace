import {Context, useVSFContext} from "@vue-storefront/core";
import type {Cart, Order} from "@vue-storefront/iiepmarket-api";
import {UseRequest, useRequest} from "../useRequest";
import {useCart} from "../useCart";

const removeProps = (object: object, propNames: string[] = []) =>
  (Object.fromEntries(Object.entries(object).filter(([k]) => !propNames.includes(k))));

const prepareOrderFromCart = (cart: Cart, paymentMethodName: string, shopId: string) => {
  return {
    payments: [
      {
        amount: cart.checkout.summary.total.amount,
        billingAddress: removeProps(cart.checkout.fulfillmentGroups[0].shippingAddress, ["_id"]),
        data: {},
        method: paymentMethodName,
      }
    ],
    fulfillmentGroups: [
      {
        shopId,
        data: { shippingAddress: removeProps(cart.checkout.fulfillmentGroups[0].shippingAddress, ["_id"]) },
        type: "shipping",
        totalPrice: cart.checkout.summary.total.amount,
        selectedFulfillmentMethodId: cart.checkout.fulfillmentGroups[0].selectedFulfillmentOption.fulfillmentMethod._id,
        items: cart.items.nodes
          .map(({ price, productConfiguration, quantity }) =>
            ({ price: price.amount, productConfiguration, quantity})),
      }

    ],
  };
};

export const useMakeOrder = (): { make: UseRequest } => {
  const context: Context = useVSFContext();
  const shopId = context.$cookies.get("vsf-shop");
  const { load } = useCart();
  return {
    make: useRequest((cart: Cart, paymentMethodName: string, email: string) => {
      const order = {
        email,
        currencyCode: cart.checkout.summary.total.currency.code,
        ...prepareOrderFromCart(cart, paymentMethodName, shopId),
      };
      return context.$iiepmarket.api.placeOrder(order).then((placedOrder: Order[]) => {
        load.execute();
        return placedOrder[0];
      });
    }),
  };
};
