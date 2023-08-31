import { computed, ref } from "@nuxtjs/composition-api";
import { Context, useVSFContext } from "@vue-storefront/core";
import type {CatalogProduct, Variant} from "@vue-storefront/iiepmarket-api";
import {useRequest} from "../useRequest";

const prepareVariant = (variant, product: CatalogProduct): Variant => ({
  ...variant,
  productId: product.productId,
  description: product.description ?? "",
  productCatalogId: product._id,
  slug: product.slug,
  fullTitle: `${product.title} - ${variant.title}`,
  productTitle: `${product.title}`,
  pricing: variant.pricing[0],
  images: [...(variant.images ?? []), ...(product.images ?? [])],
});

export const useCatalogItem = (slug: string): object => {

  const context: Context = useVSFContext();
  const shopId = context.$cookies.get("vsf-shop");
  const item = ref<CatalogProduct>(null);

  const load = useRequest(() => context.$iiepmarket.api.getCatalogItem({ shopId, slugOrId: slug })
    .then((response) => {
      if (response?.errors) {
        load.error.value = response.errors[0];
      } else {
        item.value = {
          ...response,
          variants: response.variants.map(v => prepareVariant(v, response)),
        };
      }
    }));

  return {
    item: computed(() => item.value),
    load,
  };
};
