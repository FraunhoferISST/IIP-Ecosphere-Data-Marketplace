import produce from "immer";
import { shallowRef } from "vue";

export function useImmer(baseState) {
  const state = shallowRef(produce(baseState, (draft) => draft));
  const update = (updater) => {
    state.value = produce(state.value, updater);
  };

  return [state, update];
}
