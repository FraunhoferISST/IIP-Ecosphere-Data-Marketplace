import { UseRequest, useRequest } from "../useRequest";
import {computed, ComputedRef, ref} from "@nuxtjs/composition-api";
import type { Inquiry } from "@vue-storefront/iiepmarket-api";
import { Context, sharedRef, useVSFContext } from "@vue-storefront/core";
import {usePagination, UsePagination} from "../usePagination";
import {InquirySearchQuery} from "@vue-storefront/iiepmarket-api/lib/shared/types";

interface UseAccountInquiries extends Omit<UsePagination, "set"| "reset" | "cursor"> {
  inquiries: ComputedRef<Inquiry[]>;
  load: UseRequest;
  loadNextPage: UseRequest;
  create: UseRequest;
}

export const useAccountInquiries = (): UseAccountInquiries => {
  const context: Context = useVSFContext();
  const { page, pageSize, count, pages, cursor, set, reset } = usePagination(10 ** 3);

  const inquiries = sharedRef<Inquiry[]>([], "useInquiries-inquiries");
  const _query = ref<InquirySearchQuery>({});

  const load = useRequest((query: InquirySearchQuery = {}) =>
    context.$iiepmarket.api.getAccountInquiries({ ...query, pageSize: pageSize.value })
      .then((response) => {
        inquiries.value = response ?? [];
        _query.value = query;
        reset();
        // set({ cursor, count });
      })
  );

  const loadNextPage = useRequest(() =>
    context.$iiepmarket.api.getAccountInquiries({ ..._query.value, cursor: cursor.value, pageSize: pageSize.value })
      .then(({ items, cursor }) => {
        inquiries.value.push(...(items ?? []));
        set({ cursor, page: page.value + 1 });
      }));

  const create = useRequest((inquiry: Partial<Inquiry>) =>
    context.$iiepmarket.api.createInquiry(inquiry)
  );

  return {
    inquiries: computed(() => inquiries.value),
    load,
    loadNextPage,
    create,
    page,
    count,
    pageSize,
    pages,
  };
};
