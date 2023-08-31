import mutation from "~/server/graphql/updateAccountGroups/mutation";
import type { Account } from "~/types";

const prepareResponse = ({
  data: {
    updateGroupsForAccounts: { accounts },
  },
}): Account => accounts[0];

export const updateAccountGroups = (
  event,
  { id, groupIds }
): Promise<Account> => {
  return event.context.apiClient
    .mutate({
      mutation,
      variables: {
        input: {
          accountIds: [id],
          groupIds,
        },
      },
    })
    .then((response) => {
      return prepareResponse(response);
    });
};
