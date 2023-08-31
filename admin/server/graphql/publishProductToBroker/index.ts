import mutation from "~/server/graphql/publishProductToBroker/mutation";

export const publishProducts = (event, body) => {
  return event.context.apiClient.mutate({
    mutation,
    variables: body,
  });
};
