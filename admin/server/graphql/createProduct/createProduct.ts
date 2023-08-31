import createProductMutation from "~/server/graphql/createProduct/createProductMutation";

export const createProduct = (event, body) => {
  return event.context.apiClient
    .mutate({
      mutation: createProductMutation,
      variables: {
        product: body,
        shopId: event.context.cookies.shopId,
      },
    })
    .then(
      ({
        data: {
          createProduct: { product },
        },
      }) => product
    );
};
