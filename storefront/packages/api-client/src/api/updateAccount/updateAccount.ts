import updateAccountMutation from "./updateAccountMutation";
import type { Account } from "../../types";

const prepareResponse = ({
  data: {
    updateAccount: { account },
  },
}): Account => account;

export const updateAccount = (context: Record<any, any>, params: Record<string, any>): Promise<Account> => {
  return context.client
    .mutate({
      mutation: updateAccountMutation,
      variables: params,
    })
    .then((response) => {
      return prepareResponse(response);
    });
};
