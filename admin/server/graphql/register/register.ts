import registerMutation from "~/server/graphql/register/registerMutation";
import type { LoginResult } from "~/types";

const prepareResponse = ({
  data: {
    createUser: { loginResult },
  },
}): LoginResult => ({
  ...loginResult.tokens,
  ...loginResult.user,
});

export const register = (event, body): Promise<LoginResult> => {
  if (event.context.runtimeConfig?.public?.disableRegistration) {
    throw new Error("Registration is disabled!");
  }
  return event.context.apiClient
    .mutate({
      mutation: registerMutation,
      variables: body,
    })
    .then(async (response) => {
      return prepareResponse(response);
    });
};
