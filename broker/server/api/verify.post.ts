import {KnownNodeConfig} from "~/types";
import query from "~/server/graphql/getAccount/query";
import {AxiosResponse} from "axios";
import jwt_decode from "jwt-decode";
import {readBody} from "h3";

export default defineEventHandler(async (event): Promise<unknown> => {
  const { accountShopEndpoint } = await readBody(event);
  const isNodeKnown = event.context.knownNodesConfig.map(({ apiEndpoint }: KnownNodeConfig) => apiEndpoint).includes(accountShopEndpoint)
  const token = getRequestHeader(event, "Authorization") ?? ""

  if (!token || !accountShopEndpoint || !isNodeKnown) {
    return ""
  }

  const decodedToken = jwt_decode(token.replace("Bearer", ""))
  return await event.context.apiClient
      .query(accountShopEndpoint, {
          query,
          variables: {
              id: decodedToken?.data?.userId,
          },
      })
      .then((response: AxiosResponse) => {
          return response.data.account.primaryEmailAddress
      })
});
