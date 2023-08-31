import getUserQuery from "./getAccountQuery";
import type { Account } from "../../types";

const prepareResponse = ({ data: { viewer }}): Account => ({
  ...viewer,
  groups: viewer.groups.nodes.map((group) => group),
  addressBook: viewer.addressBook?.nodes?.map((group) => group) ?? [],
});

export const getAccount = async (context: Record<any, any>): Promise<Account> =>
  context.client.query({
    query: getUserQuery,
    variables: {},
  })
    .then(response => {
      if (!response?.data?.viewer) {
        context.config.state.setUserToken(null);
        context.config.state.setUserId(null);
        return null;
      }
      const user: Account = prepareResponse(response);
      context.config.state.setUserId(user._id);
      return user;
    });

