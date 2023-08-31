import type { PriceModel, Product, ProductVariant } from "~/types";
import { PriceModelType } from "~/types";
import { useRequest } from "~/composables/useRequest";
import { ComputedRef } from "vue";
import type { UseAsyncState } from "~/types/composables";

const defaultCompareAtPrice = {
  amount: null,
  displayAmount: null,
};

const defaultPriceModel: PriceModel = {
  type: PriceModelType.Once,
};

type UpdatePriceInput = {
  prices: { compareAtPrice?: number; price: number };
};

export interface UseProductVariantComposable {
  variant: ComputedRef<ProductVariant>;
  load: UseAsyncState<Product, void>;
  reload: UseAsyncState<Product, void>;
  create: UseAsyncState<object, Pick<ProductVariant, "_id">>;
  update: UseAsyncState<object, void>;
  updatePrices: UseAsyncState<UpdatePriceInput, void>;
}

export const useProductVariant = (
  id: string,
  productId?: string
): UseProductVariantComposable => {
  const { $api: api } = useNuxtApp();
  const variant = ref<ProductVariant | null>(null);

  const loadVariant = (product: Product) =>
    new Promise<void>((resolve): void => {
      const loadedVariant: ProductVariant = product.variants.find(
        ({ _id }) => _id === id
      );
      variant.value = {
        ...loadedVariant,
        pricing: {
          ...loadedVariant.pricing,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          compareAtPrice:
            loadedVariant.pricing?.compareAtPrice ?? defaultCompareAtPrice,
        },
        distributions: loadedVariant.distributions ?? [],
        priceModel: loadedVariant.priceModel ?? defaultPriceModel,
      };
      resolve();
    });

  const load = useRequest<Product, void>((product: Product) =>
    loadVariant(product)
  );

  const reload = useRequest<Product, void>((product: Product) =>
    loadVariant(product)
  );

  const create = useRequest<object, Partial<ProductVariant>>(
    (data: Partial<ProductVariant>) =>
      api.handle<Pick<ProductVariant, "_id">>("createProductVariant", {
        ...data,
        productId,
      })
  );
  const update = useRequest<object, void>((data: object) =>
    api.handle("updateProductVariant", {
      ...data,
      variantId: id,
    })
  );

  const updatePrices = useRequest<UpdatePriceInput, void>(
    (data: UpdatePriceInput) =>
      api.handle("updateProductVariantPrices", { variantId: id, ...data })
  );

  return {
    variant: computed(() => variant.value),
    load,
    reload,
    create,
    update,
    updatePrices,
  };
};
