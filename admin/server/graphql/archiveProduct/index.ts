import mutation from "~/server/graphql/archiveProduct/mutation";

export const archiveProduct = (event, { productId }): void =>
  event.context.apiClient.mutate({
    mutation: mutation,
    variables: {
      productId,
      shopId: event.context.cookies.shopId,
    },
  });
