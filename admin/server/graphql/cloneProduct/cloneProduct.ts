import cloneProductMutation from "~/server/graphql/cloneProduct/cloneProductMutation";

export const cloneProduct = (event, body): Promise<[{ _id: string }]> => {
  return event.context.apiClient
    .mutate({
      mutation: cloneProductMutation,
      variables: body,
    })
    .then(
      ({
        data: {
          cloneProducts: { products },
        },
      }) => products
    );
};
