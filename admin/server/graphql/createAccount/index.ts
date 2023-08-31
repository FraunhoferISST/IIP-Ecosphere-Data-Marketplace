import createUserMutation from "~/server/graphql/createAccount/createUserMutation";
import type { BasicAccount } from "~/types";

const extractUser = ({
  data: {
    createUser: {
      loginResult: {
        tokens: { accessToken },
        user: { id },
      },
    },
  },
}) => ({
  accessToken,
  id,
});

export const createAccount = async (
  event,
  { firstName, lastName, email, password }
): Promise<BasicAccount> => {
  const createdUser = extractUser(
    await event.context.apiClient.mutate({
      mutation: createUserMutation,
      variables: { email, password },
    })
  );
  // mimic the account owner by creating new api client with the new users token
  event.context.apiClient = event.context.createClient(createdUser.accessToken);
  //This is a hack. Calling getViewer creates a proper account. createAccount creates an invalid account with "profile: null" and brings inconsistency in the whole accounts api
  const viewer = await event.context.api.getViewer();
  await event.context.api.updateAccount({
    id: createdUser.id,
    firstName,
    lastName,
  });
  return viewer;
};
