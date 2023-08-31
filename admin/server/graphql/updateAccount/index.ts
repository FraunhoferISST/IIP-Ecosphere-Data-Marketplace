import mutation from "~/server/graphql/updateAccount/mutation";
import type { Account } from "~/types";

const prepareResponse = ({
  data: {
    updateAccount: { account },
  },
}): Account => account;

export const updateAccount = (event, { id, ...body }): Promise<Account> => {
  return event.context.apiClient
    .mutate({
      mutation,
      variables: {
        input: {
          accountId: id,
          ...body,
        },
      },
    })
    .then((response) => {
      return prepareResponse(response);
    });
};
