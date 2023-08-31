import {computed, ComputedRef, ref} from "@nuxtjs/composition-api";

export type SetInput = {
  cursor?: string;
  page?: number;
  count?: number;
  pages?: number;
};

export interface UsePagination {
  cursor: ComputedRef<string>;
  page: ComputedRef<number>;
  pages: ComputedRef<number>;
  pageSize: ComputedRef<number>;
  count: ComputedRef<number>;
  set: (input: SetInput) => void;
  reset: () => void;
}

export const usePagination = (pageSize = 15): UsePagination => {
  const _cursor = ref<string>("");
  const _count = ref(0);
  const _pages = ref(0);
  const _page = ref(1);
  const _pageSize = ref(pageSize);

  const set = ({ cursor, page, count, pages }: SetInput) => {
    _cursor.value = cursor;
    _count.value = count ?? _count.value;
    _pages.value = pages ?? Math.ceil(_count.value / _pageSize.value);
    _page.value = page ?? _page.value;
  };

  const reset = () => {
    _cursor.value = "";
    _count.value = 0;
    _pages.value = 0;
    _page.value = 1;
  };

  return {
    cursor: computed(() => _cursor.value),
    page: computed(() => _page.value),
    pages: computed(() => _pages.value),
    pageSize: computed(() => _pageSize.value),
    count: computed(() => _count.value),
    set,
    reset,
  };
};
