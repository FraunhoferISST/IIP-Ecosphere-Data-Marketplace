import loginMutation from "~/server/graphql/login/loginMutation";
import type { User } from "~/types";

const prepareResponse = ({ data: { authenticate } }): User => ({
  ...authenticate.tokens,
  ...authenticate.user,
});

export const login = (event, body) => {
  return event.context.apiClient
    .mutate({
      mutation: loginMutation,
      variables: body,
    })
    .then((response) => {
      return prepareResponse(response);
    });
};
