import updateProductVariantPricesMutation from "~/server/graphql/updateProductVariantPrices/updateProductVariantPricesMutation";

export const updateProductVariantPrices = (event, body) => {
  return event.context.apiClient
    .mutate({
      mutation: updateProductVariantPricesMutation,
      variables: body,
    })
    .then(
      ({
        data: {
          updateProductVariantPrices: { variant },
        },
      }) => variant
    );
};
