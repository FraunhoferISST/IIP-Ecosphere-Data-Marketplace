import { useRequest } from "~/composables/useRequest";
import type { TaxRate } from "../../shared/types";
import type { UseAsyncState } from "~/types/composables";
import type { ComputedRef } from "@vue/runtime-core";

export const useTax = (
  id: string
): {
  tax: ComputedRef<TaxRate>;
  remove: UseAsyncState<void, void>;
  update: UseAsyncState<TaxRate, void>;
} => {
  const { $api: api } = useNuxtApp();
  const tax = ref<TaxRate>();

  const update = useRequest<TaxRate, void>((tax: TaxRate) =>
    api.handle("updateTax", { ...tax, _id: undefined, id })
  );

  const remove = useRequest<void, void>(() => api.handle("deleteTax", { id }));

  return {
    tax: computed(() => tax.value),
    remove,
    update,
  };
};
