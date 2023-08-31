import createProductVariantMutation from "~/server/graphql/createProductVariant/createProductVariantMutation";

export const createProductVariant = (event, { productId, ...rest }) => {
  return event.context.apiClient
    .mutate({
      mutation: createProductVariantMutation,
      variables: {
        variant: rest,
        productId,
        shopId: event.context.cookies.shopId,
      },
    })
    .then(
      ({
        data: {
          createProductVariant: { variant },
        },
      }) => variant
    );
};
