import { useRequest } from "~/composables/useRequest";
import type { Inquiry } from "../../shared/types";
import type { UseAsyncState } from "~/types/composables";
import type { ComputedRef } from "@vue/runtime-core";

export const useInquiry = (
  id: string
): {
  inquiry: ComputedRef<Inquiry>;
  load: UseAsyncState<void, void>;
  update: UseAsyncState<object, void>;
} => {
  const { $api: api } = useNuxtApp();
  const inquiry = ref<Inquiry>(null);

  const load = useRequest<void, void>(() =>
    api.handle("getInquiry", { id }).then((response: Inquiry) => {
      inquiry.value = response;
    })
  );

  const update = useRequest<object, void>((patch) =>
    api.handle("updateInquiry", { ...patch, id }).then((response: Inquiry) => {
      inquiry.value = response;
    })
  );

  return {
    inquiry: computed(() => inquiry.value),
    load,
    update,
  };
};
