import { computed, ref } from "vue";
import type { Ref, ComputedRef } from "vue";
import _ from "lodash";
import isEqual from "lodash.isequal";

const { cloneDeep, pick } = _;

export interface UseEditState<State = object | undefined> {
  state: ComputedRef<State>;
  hasChanges: ComputedRef<boolean>;
  patch: Ref<State>;
  // set state value
  setState: (value: State) => void;
  // sync state with patch
  sync: () => void;
  // reset patch to initial patch value
  reset: () => void;
  getDiff: () => Partial<State>;
}

export const useEditState = <State>(state: State): UseEditState<State> => {
  const _state = ref<State>(cloneDeep(state)) as Ref<State>;
  const _patch = ref<State>(cloneDeep(state)) as Ref<State>;
  const _patchBackup = ref<State>(cloneDeep(state)) as Ref<State>;

  const hasChanges = computed(() => getChangedProps().length > 0);

  const getChangedProps = (): string[] =>
    Object.entries(_state.value ?? {})
      .filter(([k, v]) => !isEqual(v, _patch.value[k]))
      .map(([k]) => k);
  const getDiff = (): Partial<State> =>
    pick<State>(_patch.value, getChangedProps());

  return {
    state: computed(() => _state.value),
    patch: _patch,
    hasChanges,
    setState: (value: State, syncWithPatch = true) => {
      _state.value = cloneDeep(value);
      if (syncWithPatch) {
        _patch.value = cloneDeep(value);
      }
    },
    sync: () => {
      _state.value = cloneDeep(_patch.value);
      _patchBackup.value = cloneDeep(_patch.value);
    },
    reset: () => {
      _patch.value = cloneDeep(_patchBackup.value);
    },
    getDiff,
  };
};
