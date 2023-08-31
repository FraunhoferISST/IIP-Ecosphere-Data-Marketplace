import loginMutation from "~/server/graphql/login/mutation";
import type { User } from "~/types";

const prepareResponse = ({ data: { authenticate } }): User => ({
  ...authenticate.tokens,
  ...authenticate.user,
});

export const login = (event, body = {}) => {
  const { node } = body;
  return event.context.apiClient
    .mutate(node.apiEndpoint, {
      mutation: loginMutation,
      variables: body,
    })
    .then((response) => {
      return {
          ...prepareResponse(response),
          node: {
              _id: node._id,
              apiEndpoint: node.apiEndpoint,
          }
      };
    });
};
