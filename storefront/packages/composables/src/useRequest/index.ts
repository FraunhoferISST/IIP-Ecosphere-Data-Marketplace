import {computed, ComputedRef, Ref, ref} from "@nuxtjs/composition-api";
export interface UseRequest {
  loading: ComputedRef<boolean>;
  error: Ref<unknown>;
  execute: (...args: any[]) => Promise<unknown>
}

export const useRequest = (fn: (...args: any[]) => Promise<unknown>): UseRequest => {

  const loading = ref(false);
  const error = ref(null);

  const execute = (...args: any[]) => {
    loading.value = true;
    error.value = false;
    return fn(...args)
      .then(response => {
        // @ts-ignore
        if (response?.errors) {
          // @ts-ignore
          throw response.errors[0];
        }
        return response;
      })
      .catch(e => {
        error.value = e;
        throw error.value;
      })
      .finally(() => loading.value = false);
  };

  return {
    loading: computed(() => loading.value),
    error: error,
    execute,
  };
};
