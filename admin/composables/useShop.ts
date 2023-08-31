import { ComputedRef } from "@vue/runtime-core";
import { FulfillmentMethod, PaymentMethod, Shop, ShopSettings } from "~/types";
import { useRequest } from "~/composables/useRequest";
import type { UseAsyncState } from "~/types/composables";
import { cookiesNames } from "~/helpers/cookies";

type EnablePaymentMethodPayload = {
  paymentMethodName: string;
  isEnabled: boolean;
};

const shop = ref<Shop>(null);
const settings = ref<ShopSettings>(null);

export const useShop = (): {
  shopId: ComputedRef<string>;
  shop: ComputedRef<Shop>;
  settings: ComputedRef<ShopSettings>;
  paymentMethods: ComputedRef<PaymentMethod[]>;
  fulfillments: ComputedRef<FulfillmentMethod[]>;
  load: UseAsyncState<void, void>;
  create: UseAsyncState<object, void>;
  update: UseAsyncState<object, void>;
  loadSettings: UseAsyncState<void, void>;
  updateSettings: UseAsyncState<Partial<ShopSettings>, void>;
  updateInvoiceDetails: UseAsyncState<object, void>;
  loadPaymentMethods: UseAsyncState<void, PaymentMethod[]>;
  loadFulfillmetns: UseAsyncState<void, FulfillmentMethod[]>;
  getAvailablePaymentMethods: UseAsyncState<void, PaymentMethod[]>;
  enablePaymentMethod: UseAsyncState<EnablePaymentMethodPayload, void>;
} => {
  const { $api: api } = useNuxtApp();
  const shopId = useCookie(cookiesNames.shopCookieName);
  const paymentMethods = ref<PaymentMethod[]>([]);
  const fulfillments = ref<FulfillmentMethod[]>([]);

  const load = useRequest<void, Shop>(() =>
    api.handle<Shop>("getPrimaryShop").then((shopData: Shop) => {
      shop.value = shopData
        ? { ...shopData, addressBook: shopData?.addressBook ?? [] }
        : null;
      shopId.value = shopData?._id ?? null;
    })
  );

  const create = useRequest<object, Shop>(async (data: object) => {
    if (!shopId.value) {
      await api.handle<Shop>("createShop", data).then((createdShop) => {
        shop.value = {
          ...createdShop,
          addressBook: createdShop?.addressBook ?? [],
        };
        shopId.value = createdShop._id;
      });
    }
    return api.handle<void>("createFulfillment").then(() =>
      api.handle<void>("updateShopSettings", {
        primaryTaxServiceName: "custom-rates",
      })
    );
  });

  const update = useRequest<object, Shop>((data: object) =>
    api.handle<Shop>("updateShop", data).then(
      (updatedShop) =>
        (shop.value = {
          ...updatedShop,
          addressBook: updatedShop?.addressBook ?? [],
        })
    )
  );

  const loadSettings = useRequest<void, void>(() =>
    api
      .handle<ShopSettings>("getShopSettings")
      .then((shopSettings: ShopSettings) => (settings.value = shopSettings))
  );

  const updateSettings = useRequest<Partial<ShopSettings>, void>(
    (data: Partial<ShopSettings>) =>
      api
        .handle<ShopSettings>("updateShopSettings", data)
        .then((shopSettings: ShopSettings) => (settings.value = shopSettings))
  );

  const updateInvoiceDetails = useRequest<object, Shop>((data: object) =>
    api.handle<Shop>("updateShopInvoiceDetails", data).then(
      (updatedShop) =>
        (shop.value = {
          ...updatedShop,
          addressBook: updatedShop?.addressBook ?? [],
        })
    )
  );

  const loadPaymentMethods = useRequest<void, PaymentMethod[]>(() =>
    api
      .handle<PaymentMethod[]>("getPaymentMethods")
      .then((response) => (paymentMethods.value = response))
  );

  const loadFulfillmetns = useRequest<void, FulfillmentMethod[]>(() =>
    api
      .handle<FulfillmentMethod[]>("getFulfillments")
      .then((loadedFulfillments) => (fulfillments.value = loadedFulfillments))
  );

  const getAvailablePaymentMethods = useRequest<void, PaymentMethod[]>(() =>
    api.handle<PaymentMethod[]>("getAvailablePaymentMethods")
  );

  const enablePaymentMethod = useRequest<EnablePaymentMethodPayload, void>(
    (data: EnablePaymentMethodPayload) =>
      api.handle<void>("enablePaymentMethod", data)
  );

  return {
    shopId: computed<string>(() => shopId.value),
    shop: computed(() => shop.value),
    paymentMethods: computed(() => paymentMethods.value),
    fulfillments: computed(() => fulfillments.value),
    settings: computed(() => settings.value),
    load,
    create,
    update,
    updateInvoiceDetails,
    loadPaymentMethods,
    getAvailablePaymentMethods,
    enablePaymentMethod,
    loadFulfillmetns,
    loadSettings,
    updateSettings,
  };
};
