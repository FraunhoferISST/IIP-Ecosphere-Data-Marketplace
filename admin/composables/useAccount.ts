import { ComputedRef } from "@vue/runtime-core";
import { Account, UpdateAccountInput } from "@/types";
import { UseAsyncState } from "~/types/composables";
import { useRequest } from "~/composables/useRequest";

interface UseAccount {
  account: ComputedRef<Account>;
  load: UseAsyncState;
  update: UseAsyncState<UpdateAccountInput>;
  updateGroups: UseAsyncState<{ groupIds: string[] }>;
}

export const useAccount = (id = ""): UseAccount => {
  const { $api: api } = useNuxtApp();
  const account = ref<Account | null>(null);

  const load = useRequest(() =>
    api.handle<Account>("getAccount", { id }).then((response) => {
      account.value = response;
    })
  );

  const update = useRequest<UpdateAccountInput>((data) =>
    api.handle<Account>("updateAccount", { id, ...data }).then((response) => {
      account.value = response;
    })
  );

  const updateGroups = useRequest<{ groupIds: string[] }>((data) =>
    api.handle("updateAccountGroups", { id, ...data })
  );

  return {
    account: computed(() => account.value),
    load,
    update,
    updateGroups,
  };
};
