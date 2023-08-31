import mutation from "~/server/graphql/refreshToken/mutation";
import type { LoginResult } from "~/types";

const prepareResponse = ({ data: { refreshTokens } }): LoginResult =>
  refreshTokens;

export const refreshToken = (event) => {
  return event.context.apiClient
    .mutate({
      mutation: mutation,
      variables: {
        accessToken: event.context.cookies.token,
        refreshToken: event.context.cookies.refreshToken,
      },
    })
    .then((response) => {
      return prepareResponse(response);
    });
};
