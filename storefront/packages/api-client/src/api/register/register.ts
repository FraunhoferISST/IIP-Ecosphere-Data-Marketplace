import registerMutation from "./registerMutation";
import type {User, LoginResult} from "../../types";

const prepareResponse = ({data: {createUser: {loginResult}}}): User & LoginResult => ({
  ...loginResult,
  ...loginResult.user,
});

export const register = async (context: Record<any, any>, params: Record<any, any>): Promise<User & LoginResult> =>
  context.client.mutate({
    mutation: registerMutation,
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
