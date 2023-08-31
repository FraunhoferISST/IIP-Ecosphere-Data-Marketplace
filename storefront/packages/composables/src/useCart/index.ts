import {computed, ComputedRef} from "@nuxtjs/composition-api";
import { Context, sharedRef, useVSFContext } from "@vue-storefront/core";
import type {BillingAddress, Cart, Variant, PaymentMethod} from "@vue-storefront/iiepmarket-api";
import {UseRequest, useRequest} from "../useRequest";

const createPayload = (variant: Variant, quantity: number) => {
  return {
    items: [
      {
        quantity,
        productConfiguration:
            {
              productId: variant.productId,
              productVariantId: variant.variantId,
            },
        price: {
          amount: variant.pricing.price,
          currencyCode: variant.pricing.currency.code,
        },
      }
    ],
  };
};

const clearAddress = ({_id, ...rest}) => rest;

interface UseCart {
  cart: ComputedRef<Cart>,
  load: UseRequest,
  add: UseRequest,
  remove: UseRequest,
  setQuantity: UseRequest,
  setAddress: UseRequest,
  setPaymentMethod: UseRequest,
  setFulfillmentOption: UseRequest,
  isInCart (variant: Variant): boolean,
}

let cart = null;

export const useCart = (): UseCart => {

  const context: Context = useVSFContext();
  const shopId = context.$cookies.get("vsf-shop");
  let accountId = context.$cookies.get("vsf-id");
  const cartId = context.$cookies.get("vsf-cart");
  cart = sharedRef(null, "useCart-cart");

  const load = useRequest(() => {
    if (!accountId) {
      accountId = context.$cookies.get("vsf-id");
    }
    return context.$iiepmarket.api.getAccountCart({ shopId, accountId })
      .then((loadedCart: Cart) => {
        cart.value = loadedCart;
      });
  });

  const create = useRequest((variant: Variant, quantity: number) =>
    context.$iiepmarket.api.createAccountCart({ shopId, ...createPayload(variant, quantity) })
      .then((newCart: Cart) => {
        cart.value = newCart;
      }));

  const add = useRequest((variant: Variant, quantity: number) => {
    if (!cart.value) {
      return create.execute(variant, quantity);
    }
    return context.$iiepmarket.api.addCartItems({ ...createPayload(variant, quantity), cartId })
      .then((updatedCart: Cart) => {
        cart.value = updatedCart;
      });
  });

  const remove = useRequest((cartItemId: string) =>
    context.$iiepmarket.api.removeCartItems({ cartItemIds: [cartItemId], cartId })
      .then((updatedCart: Cart) => {
        cart.value = updatedCart;
      }));

  const setQuantity = useRequest((cartItemId: string, quantity: number) =>
    context.$iiepmarket.api.updateCartItemsQuantity({ items: [{ cartItemId: cartItemId, quantity }], cartId })
      .then((updatedCart: Cart) => {
        cart.value = updatedCart;
      }));

  const setAddress = useRequest((address: BillingAddress) =>
    context.$iiepmarket.api.setCartAddress({ address: clearAddress(address), addressId: address._id })
      .then((updatedCart: Cart) =>
        context.$iiepmarket.api.updateFulfillmentOptions({
          fulfillmentGroupId: updatedCart.checkout.fulfillmentGroups[0]._id,
        }))
      .then((updatedCart: Cart) => cart.value = updatedCart));

  const setPaymentMethod = useRequest((paymentMethod: Pick<PaymentMethod, "name" | "displayName" | "pluginName">) =>
    context.$iiepmarket.api.setCartPaymentMethod({ paymentMethod })
      .then(() => cart.value.paymentMethod = paymentMethod));

  const setFulfillmentOption = useRequest((fulfillmentGroupId: string, fulfillmentMethodId: string) => {
    return context.$iiepmarket.api.selectFulfillmentOption({ fulfillmentMethodId, fulfillmentGroupId })
      .then((updatedCart: Cart) => cart.value = updatedCart);
  });

  const isInCart = (variant: Variant): boolean => {
    return Boolean(cartId) && cart.value?.items?.nodes.some(({ variantId }) => variantId === variant.variantId);
  };
  return {
    cart: computed(() => cart.value),
    load,
    add,
    remove,
    setQuantity,
    setAddress,
    setFulfillmentOption,
    setPaymentMethod,
    isInCart,
  };
};
