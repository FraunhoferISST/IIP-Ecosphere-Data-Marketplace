import refreshTokenMutation from "./refreshTokenMutation";
import {Context, Tokens} from "../../types";

const prepareResponse = ({data: {refreshTokens: { tokens }}}): Tokens => tokens;

export const refreshToken = async (context: Context): Promise<void> => context.client.mutate({
  mutation: refreshTokenMutation,
  variables: {
    accessToken: context.config.state.getUserToken(),
    refreshToken: context.config.state.getUserRefreshToken(),
  },
})
  .then(response => {
    const tokens = prepareResponse(response);
    context.config.state.setUserToken(tokens.accessToken);
    context.config.state.setUserRefreshToken(tokens.refreshToken);
  });
