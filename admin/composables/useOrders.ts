import { useRequest } from "~/composables/useRequest";
import { ComputedRef } from "vue";
import type { UseAsyncState } from "~/types/composables";
import { Order, SearchQuery } from "~/types";
import { usePagination, UsePagination } from "~/composables/usePagination";

export interface UseOrdersComposable
  extends Omit<UsePagination, "set" | "reset" | "cursor"> {
  orders: ComputedRef<unknown[]>;
  load: UseAsyncState<SearchQuery, void>;
  loadNextPage: UseAsyncState<void, void>;
}

export const useOrders = (): UseOrdersComposable => {
  const { cursor, page, pages, pageSize, set, count, reset } = usePagination();
  const { $api: api } = useNuxtApp();
  const orders = ref<Order[]>([]);
  const _query = ref<SearchQuery>({});

  const load = useRequest<SearchQuery, void>((query: SearchQuery = {}) =>
    api
      .handle("getOrders", { ...query, first: pageSize.value })
      .then(({ orders: o, pageInfo, totalCount }) => {
        orders.value = o;
        _query.value = query;
        reset();
        set({ cursor: pageInfo.endCursor, count: totalCount });
      })
  );

  const loadNextPage = useRequest<void, void>(() =>
    api
      .handle("getOrders", {
        ..._query,
        first: pageSize.value,
        cursor: cursor.value,
      })
      .then(({ products: p, pageInfo }) => {
        orders.value.push(...p);
        set({ cursor: pageInfo.endCursor, page: page.value + 1 });
      })
  );

  return {
    orders: computed(() => orders.value),
    pages,
    page,
    pageSize,
    count,
    load,
    loadNextPage,
  };
};
