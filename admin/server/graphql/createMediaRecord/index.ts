import mutation from "~/server/graphql/createMediaRecord/mutation";

export const createMediaRecord = (event, body) => {
  return event.context.apiClient
    .mutate({
      mutation,
      variables: {
        mediaRecord: body,
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
