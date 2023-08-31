import { useRequest } from "~/composables/useRequest";
import type { Product, SearchQuery, UsePagination } from "~/types";
import type { UseAsyncState } from "~/types/composables";
import { ComputedRef } from "@vue/runtime-core";
import { usePagination } from "~/composables/usePagination";

export interface UseProducts
  extends Omit<UsePagination, "set" | "reset" | "cursor"> {
  products: ComputedRef<Product[]>;
  load: UseAsyncState<SearchQuery>;
  loadNextPage: UseAsyncState;
  create: UseAsyncState<object, Pick<Product, "_id">>;
}

export const useProducts = (): UseProducts => {
  const { cursor, page, pages, pageSize, set, count, reset } =
    usePagination(10);
  const { $api: api } = useNuxtApp();

  const products = ref<Product[]>([]);
  const _query = ref<SearchQuery>({});

  const load = useRequest<SearchQuery, void>((query: SearchQuery = {}) =>
    api
      .handle("getProducts", { ...query, first: pageSize.value })
      .then(({ products: p, pageInfo, totalCount }) => {
        products.value = p;
        _query.value = query;
        reset();
        set({ cursor: pageInfo.endCursor, count: totalCount });
      })
  );

  const loadNextPage = useRequest<void, void>(() =>
    api
      .handle("getProducts", {
        ..._query,
        first: pageSize.value,
        cursor: cursor.value,
      })
      .then(({ products: p, pageInfo }) => {
        products.value.push(...p);
        set({ cursor: pageInfo.endCursor, page: page.value + 1 });
      })
  );

  const create = useRequest<object, Pick<Product, "_id">>((data: object) =>
    api.handle<Pick<Product, "_id">>("createProduct", data)
  );

  return {
    products: computed(() => products.value),
    count,
    page,
    pages,
    pageSize,
    load,
    loadNextPage,
    create,
  };
};
