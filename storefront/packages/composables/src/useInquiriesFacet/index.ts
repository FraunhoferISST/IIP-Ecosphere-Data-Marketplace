import {
  Context,
  useVSFContext
} from "@vue-storefront/core";
import {UseRequest, useRequest} from "../useRequest";
import {computed, ComputedRef, ref} from "@nuxtjs/composition-api";

export const useInquiriesFacets = (): {
    result: ComputedRef<any[]>,
    search: UseRequest
} => {
  const context: Context = useVSFContext();
  const result = ref<any[]>([]);

  const search = useRequest(() =>
    context.$iiepmarket.api.inquiriesSearchFacets().then((response: any[]) => {
      result.value = response;
    }));

  return {
    result: computed(() => result.value),
    search,
  };
};
