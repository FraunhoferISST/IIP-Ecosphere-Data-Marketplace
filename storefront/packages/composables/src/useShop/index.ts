import {computed, ComputedRef, isRef} from "@nuxtjs/composition-api";
import {Context, useVSFContext, sharedRef } from "@vue-storefront/core";
// import {PaymentMethod} from "@vue-storefront/iiepmarket-api/src";
import {UseRequest, useRequest} from "../useRequest";
import {Shop} from "@vue-storefront/iiepmarket-api";

type PaymentMethod = {
  name: string
}

interface UseShop {
  shop: ComputedRef<Shop>,
  paymentMethods: ComputedRef<PaymentMethod>,
  shopId: ComputedRef<string>,
  load: UseRequest,
  loadPaymentMethods: UseRequest,
}

let shop = null;
let shopId = "";

export const useShop = (): UseShop => {

  const context: Context = useVSFContext();
  shopId = context.$cookies.get("vsf-shop");
  if (!isRef(shop)) {
    shop = sharedRef<Shop>(null, "useShop-shop");
  }
  const paymentMethods = sharedRef<PaymentMethod[]>([], "useShop-paymentMethods");

  const load = useRequest(() => context.$iiepmarket.api.getPrimaryShop()
    .then(primaryShop => {
      if (!isRef(shop)) {
        shop = sharedRef<Shop>(primaryShop, "useShop-shop");
      }
      shop.value = primaryShop;
      shopId = primaryShop._id;
      context.$cookies.set("vsf-shop", shopId);
    }));

  const loadPaymentMethods = useRequest(() => context.$iiepmarket.api.getPaymentMethods()
    .then(methods => paymentMethods.value = methods));

  return {
    shopId: computed(() => shopId),
    shop: computed(() => shop.value),
    paymentMethods: computed(() => paymentMethods.value),
    load,
    loadPaymentMethods,
  };
};
