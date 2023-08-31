import { ComputedRef } from "@vue/runtime-core";
import { UseAsyncState } from "~/types/composables";
import {
  Account,
  BasicAccount,
  PaginatedResponse,
  Product,
  SearchQuery,
  UsePagination,
} from "~/types";
import { useRequest } from "~/composables/useRequest";
import { usePagination } from "~/composables/usePagination";

interface UseAccounts extends Omit<UsePagination, "set" | "reset" | "cursor"> {
  accounts: ComputedRef<Account[]>;
  load: UseAsyncState<SearchQuery>;
  create: UseAsyncState<object, Pick<Account, "_id">>;
}

export const useAccounts = (): UseAccounts => {
  const { $api: api } = useNuxtApp();
  const { cursor, page, pages, pageSize, set, count, reset } =
    usePagination(10);

  const accounts = ref<Account[]>([]);
  const _query = ref<SearchQuery>({});

  const load = useRequest<SearchQuery>((query) =>
    api
      .handle<PaginatedResponse<Account>>("getAccounts", query)
      .then(({ items, cursor: c, count: co }) => {
        accounts.value = items;
        _query.value = query;
        reset();
        set({ cursor: c, count: co });
      })
  );

  const create = useRequest<object, BasicAccount>((data) =>
    api.handle<BasicAccount>("createAccount", data)
  );

  return {
    accounts: computed(() => accounts.value),
    pages,
    pageSize,
    page,
    count,
    load,
    create,
  };
};
