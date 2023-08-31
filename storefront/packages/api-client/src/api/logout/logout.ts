import logoutMutation from "./logoutMutation";

export const logout = async (context: Record<any, any>): Promise<void> =>
  context.client.mutate({
    mutation: logoutMutation,
  })
    .then(() => {
      context.config.state.setUserToken(null);
      context.config.state.setUserRefreshToken(null);
      context.config.state.setUserId(null);
    });
