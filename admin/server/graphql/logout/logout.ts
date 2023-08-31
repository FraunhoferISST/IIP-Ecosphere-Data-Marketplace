import logoutMutation from "~/server/graphql/logout/logoutMutation";

export const logout = (event) => {
  return event.context.apiClient.mutate({
    mutation: logoutMutation,
  });
};
