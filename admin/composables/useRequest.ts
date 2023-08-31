import { computed, ref } from "vue";
import type { UseAsyncState } from "@/types/composables";

export const useRequest = <Arg = void, Response = void>(
  fn: (arg: Arg) => Promise<Response>
): UseAsyncState<Arg, Response> => {
  const loading = ref(false);
  const error = ref(null);

  function execute(arg: Arg): Promise<Response> {
    loading.value = true;
    error.value = null;
    return fn(arg)
      .catch((e) => {
        error.value = e;
        throw error.value;
      })
      .finally(() => (loading.value = false));
  }

  return {
    loading: computed(() => loading.value),
    error: computed(() => error.value),
    execute,
  };
};
