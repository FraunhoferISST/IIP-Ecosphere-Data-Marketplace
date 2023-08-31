import {computed, ComputedRef, ref} from "@nuxtjs/composition-api";
import {Context, sharedRef, useVSFContext} from "@vue-storefront/core";
import {UseRequest, useRequest} from "../useRequest";
import {Distribution} from "@vue-storefront/iiepmarket-api";

interface UseOrderFulfillment {
  fulfillment: ComputedRef<Distribution[]>,
  load: UseRequest,
}

export const useOrderFulfillment = (orderReferenceId: string): UseOrderFulfillment => {
  const context: Context = useVSFContext();
  const fulfillment = sharedRef<Distribution[]>([], "useOrderFulfillment-fulfillment");

  const load = useRequest(() => context.$iiepmarket.api.getOrderFulfillment({ orderReferenceId })
    .then((response: Distribution[]) => fulfillment.value = response));

  return {
    fulfillment: computed(() => fulfillment.value),
    load,
  };
};
