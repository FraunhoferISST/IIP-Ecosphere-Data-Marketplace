import { computed } from "vue";
import { UsePagination, SetInput } from "~/types";

export const usePagination = (pageSize = 15): UsePagination => {
  const _cursor = ref<string>("");
  const _count = ref(0);
  const _pages = ref(0);
  const _page = ref(1);
  const _pageSize = ref(pageSize);

  const set = ({ cursor, page, count, pages }: SetInput) => {
    _cursor.value = cursor ?? _cursor.value;
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
