import mutation from "~/server/graphql/updateProduct/mutation";
import type { Product } from "~/types";

export const updateProduct = (event, { productId, ...rest }): Product =>
  event.context.apiClient
    .mutate({
      mutation: mutation,
      variables: {
        input: {
          product: rest,
          productId,
          shopId: event.context.cookies.shopId,
        },
      },
    })
    .then(
      ({
        data: {
          updateProduct: { product },
        },
      }) => product
    );
