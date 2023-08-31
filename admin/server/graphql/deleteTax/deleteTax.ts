import deleteTaxMutation from "~/server/graphql/deleteTax/deleteTaxMutation";

export const deleteTax = (event, { id }) => {
  return event.context.apiClient.mutate({
    mutation: deleteTaxMutation,
    variables: {
      taxRateId: id,
      shopId: event.context.cookies.shopId,
    },
  });
};
