import addAccountAddressMutation from "./addAccountAddressMutation";
import type { UserBillingAddress } from "../../types";

const prepareResponse = ({
  data: {
    addAccountAddressBookEntry: { address },
  },
}): UserBillingAddress => address;

export const addAccountAddress = (context: Record<any, any>, params: Record<string, any>): Promise<UserBillingAddress> => {
  return context.client
    .mutate({
      mutation: addAccountAddressMutation,
      variables: {
        accountId: context.config.state.getUserId(),
        ...params,
      },
    })
    .then((response) => {
      return prepareResponse(response);
    });
};
