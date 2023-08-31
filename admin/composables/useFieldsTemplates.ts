import { useRequest } from "~/composables/useRequest";
import type { UseAsyncState } from "~/types/composables";
import type { ComputedRef } from "@vue/runtime-core";
import { FieldsTemplate } from "../../shared/types";

export interface UseFieldsTemplates {
  templates: ComputedRef<FieldsTemplate[]>;
  load: UseAsyncState;
}

export const useFieldsTemplates = (): UseFieldsTemplates => {
  const { $api: api } = useNuxtApp();

  const templates = ref<FieldsTemplate[]>([]);

  const load = useRequest(() =>
    api.handle("getFieldsTemplates").then((response: FieldsTemplate[]) => {
      templates.value = response;
    })
  );

  return {
    templates: computed(() => templates.value),
    load,
  };
};
