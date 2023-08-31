import updateFulfillmentOptionsMutation from "~/server/graphql/updateFulfillmentOptions/updateFulfillmentOptionsMutation";

export const updateFulfillmentOptions = async (event, body): Promise<void> => {
  return event.context.apiClient.mutate({
    mutation: updateFulfillmentOptionsMutation,
    variables: {
      ...body,
    },
  });
};
