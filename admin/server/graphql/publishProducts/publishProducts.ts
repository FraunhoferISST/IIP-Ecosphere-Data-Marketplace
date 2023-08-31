import publishProductsMutation from "~/server/graphql/publishProducts/publishProductsMutation";

export const publishProducts = (event, body) => {
  return event.context.apiClient.mutate({
    mutation: publishProductsMutation,
    variables: body,
  });
};
