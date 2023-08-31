import enablePaymentMethodMutation from "~/server/graphql/enablePaymentMethod/enablePaymentMethodMutation";

export const enablePaymentMethod = async (event, body): Promise<void> => {
  return event.context.apiClient.mutate({
    mutation: enablePaymentMethodMutation,
    variables: {
      ...body,
      shopId: event.context.cookies.shopId,
    },
  });
};
