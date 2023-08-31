import {computed, ComputedRef} from "@nuxtjs/composition-api";
import {Context, sharedRef, useVSFContext} from "@vue-storefront/core";
import {UseRequest, useRequest} from "../useRequest";
import {Distribution} from "@vue-storefront/iiepmarket-api";

interface UseOrderInvoice {
  invoice: ComputedRef<Distribution[]>,
  load: UseRequest,
}

export const useOrderInvoice = (id: string): UseOrderInvoice => {
  const context: Context = useVSFContext();
  const invoice = sharedRef<string>("", "useOrderInvoice-invoice");

  const load = useRequest(() => context.$iiepmarket.api.getOrderInvoice({ orderId: id })
    .then((generatedInvoice: string) => invoice.value = generatedInvoice));

  return {
    invoice: computed(() => invoice.value),
    load,
  };
};
