import { useRequest } from "~/composables/useRequest";
import type { TaxRate } from "../../shared/types";
import type { UseAsyncState } from "~/types/composables";
import type { ComputedRef } from "@vue/runtime-core";

export const useTaxes = (): {
  taxes: ComputedRef<TaxRate[]>;
  load: UseAsyncState;
  create: UseAsyncState<TaxRate, void>;
} => {
  const { $api: api } = useNuxtApp();
  const taxes = ref<TaxRate[]>([]);

  const load = useRequest(() =>
    api.handle("getTaxes").then((response: TaxRate[]) => {
      taxes.value = response;
    })
  );

  const create = useRequest<TaxRate, void>((tax: TaxRate) =>
    api.handle("createTax", tax)
  );

  return {
    taxes: computed(() => taxes.value),
    load,
    create,
  };
};
