import { computed, ref } from "@nuxtjs/composition-api";
import { Context, useVSFContext } from "@vue-storefront/core";
import type { Variant, CatalogProduct } from "@vue-storefront/iiepmarket-api";
import {useRequest} from "../useRequest";
import {usePagination} from "../usePagination";

const prepareVariant = (variant, product: CatalogProduct): Variant => ({
  ...variant,
  productCatalogId: product._id,
  productDescription: product.description,
  productId: product.productId,
  slug: product.slug,
  fullTitle: `${product.title} - ${variant.title}`,
  productTitle: `${product.title}`,
  pricing: variant.pricing[0],
  avgRating: product.avgRating,
  reviewsTotalCount: product.reviewsTotalCount,
  images: [...(variant.images ?? []), ...(product.images ?? [])],
});

export const useCatalogItems = (): object => {

  const context: Context = useVSFContext();
  const { page, pageSize, count, pages, cursor, set, reset } = usePagination(20);

  const items = ref([]);
  const _query = ref({});

  const load = useRequest((searchQuery = {}) => {
    return context.$iiepmarket.api.searchCatalog({...searchQuery, pageSize: pageSize.value})
      .then(({ items: products, cursor, count }) => {
        items.value = [];
        for (const product of products) {
          items.value.push(...product.variants.map((v) => prepareVariant(v, product)));
        }
        _query.value = searchQuery;
        reset();
        set({ cursor, count });
      });
  });

  const loadNextPage = useRequest(() =>
    context.$iiepmarket.api.searchCatalog({ ..._query.value, cursor: cursor.value, pageSize: pageSize.value })
      .then(({ items: products, cursor }) => {
        for (const product of products) {
          items.value.push(...product.variants.map((v) => prepareVariant(v, product)));
        }
        set({ cursor, page: page.value + 1 });
      }));

  return {
    items: computed(() => items.value),
    count,
    pages,
    page,
    load,
    cursor,
    loadNextPage,
  };
};
