import loginMutation from "./loginMutation";
import type { User, LoginResult } from "../../types";

const prepareResponse = ({ data: { authenticate }}): User & LoginResult => ({
  ...authenticate,
  ...authenticate.user,
});

export const login = async (context: Record<any, any>, params: Record<any, any>): Promise<User & LoginResult> =>
  context.client.mutate({
    mutation: loginMutation,
    variables: {
      email: params.email,
      password: params.password,
    },
  })
    .then(response => {
      const user = prepareResponse(response);
      context.config.state.setUserToken(user.tokens.accessToken);
      context.config.state.setUserRefreshToken(user.tokens.refreshToken);
      context.config.state.setUserId(user.id);
      return user;
    });
