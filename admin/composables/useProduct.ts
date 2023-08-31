import { useRequest } from "~/composables/useRequest";
import { Ref } from "vue";
import type { UseAsyncState } from "~/types/composables";
import type { Product, ProductVariant } from "~/types";

export const useProduct = (
  id
): {
  product: Ref<Product>;
  load: UseAsyncState;
  reload: UseAsyncState;
  update: UseAsyncState<object>;
  archive: UseAsyncState;
  remove: UseAsyncState;
  publish: UseAsyncState;
  clone: UseAsyncState<void, Pick<Product, "_id">>;
  createVariant: UseAsyncState<object, Pick<ProductVariant, "_id">>;
} => {
  const { $api: api } = useNuxtApp();
  const { shopId } = useShop();
  const product = ref<Product>(null);

  const loadProduct = (id: string) =>
    api.handle<Product>("getProduct", { productId: id });

  const load = useRequest(() =>
    loadProduct(id).then((loadedProduct: Product) => {
      product.value = loadedProduct;
    })
  );

  const reload = useRequest(() =>
    loadProduct(id).then((loadedProduct: Product) => {
      product.value = loadedProduct;
    })
  );

  const update = useRequest<object>((data: object) =>
    api.handle("updateProduct", {
      ...data,
      productId: id,
    })
  );

  const archive = useRequest(() =>
    api.handle<void>("archiveProduct", {
      productId: id,
    })
  );

  const publish = useRequest(() =>
    api.handle<void>("publishProducts", { productIds: [id] })
  );

  const publishToBroker = useRequest(() =>
    api.handle<void>("publishProducts", { productIds: [id] })
  );

  const clone = useRequest<void, Pick<Product, "_id">>(() =>
    api
      .handle<Pick<Product, "_id">[]>("cloneProduct", {
        productIds: [id],
        shopId: shopId.value,
      })
      .then(([clone]) => clone)
  );

  const remove = useRequest(() => api.handle<void>("deleteProduct", id));

  const createVariant = useRequest<object, Pick<ProductVariant, "_id">>(
    (data: object) =>
      api.handle<Pick<ProductVariant, "_id">>("createProductVariant", {
        ...data,
        productId: id,
        shopId: shopId.value,
      })
  );

  return {
    product: computed(() => product.value),
    load,
    reload,
    update,
    archive,
    remove,
    clone,
    publish,
    createVariant,
  };
};
