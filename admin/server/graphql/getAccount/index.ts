import query from "~/server/graphql/getAccount/query";
import type { Account } from "~/types";

const prepareResponse = ({ data: { account } }): Account => account;

export const getAccount = (event, { id }): Promise<Account> => {
  return event.context.apiClient
    .query({
      query,
      variables: { id },
    })
    .then((response) => {
      console.log(response.data.account);
      return prepareResponse(response);
    });
};
