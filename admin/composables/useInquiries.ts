import { useRequest } from "~/composables/useRequest";
import type { InquiriesSearchResult, Inquiry } from "../../shared/types";
import type { UseAsyncState } from "~/types/composables";
import type { ComputedRef } from "@vue/runtime-core";
import { UsePagination } from "~/types";
import { usePagination } from "~/composables/usePagination";
import { InquirySearchQuery, InquiryInput } from "../../shared/types";

export interface UseInquiries
  extends Omit<UsePagination, "set" | "reset" | "cursor"> {
  inquiries: ComputedRef<Inquiry[]>;
  load: UseAsyncState<InquirySearchQuery>;
  loadNextPage: UseAsyncState;
  create: UseAsyncState<InquiryInput>;
}

export const useInquiries = (): UseInquiries => {
  const { $api: api } = useNuxtApp();
  const { cursor, page, pages, pageSize, set, count, reset } =
    usePagination(10);

  const inquiries = ref<Inquiry[]>([]);
  const _query = ref<InquirySearchQuery>({});

  const load = useRequest<InquirySearchQuery>((query = {}) =>
    api
      .handle("getInquiries", query)
      .then((response: InquiriesSearchResult) => {
        _query.value = query;
        inquiries.value = response.items ?? [];
        reset();
        set({ cursor: response?.cursor, count: response?.count });
      })
  );

  const loadNextPage = useRequest(() =>
    api
      .handle("getInquiries", {
        ..._query,
        pageSize: pageSize.value,
        cursor: cursor.value,
      })
      .then(({ items, cursor }: InquiriesSearchResult) => {
        inquiries.value.push(...items);
        set({ cursor: cursor, page: page.value + 1 });
      })
  );

  const create = useRequest<InquiryInput>((inquiry) =>
    api.handle("createInquiry", inquiry)
  );

  return {
    inquiries: computed(() => inquiries.value),
    page,
    pageSize,
    count,
    pages,
    load,
    loadNextPage,
    create,
  };
};
