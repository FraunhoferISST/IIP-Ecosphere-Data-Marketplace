import {KnownNodeConfig, Shop} from "~/types";
import query from "~/server/graphql/getPrimaryShop/query";
import {AxiosResponse} from "axios";

const prepareResponse = ({ data: { primaryShop } }): Shop => ({
  ...primaryShop,
  tags: primaryShop.tags.nodes.map(({ node: { tag } }) => tag),
});

export default defineEventHandler(async (event): Promise<unknown> => {

  const searchResult: any[] = []

  const promises = event.context.knownNodesConfig.map(({ apiEndpoint, storefront}: KnownNodeConfig) =>
      event.context.apiClient
          .query(apiEndpoint, {
            query,
            variables: { },
          })
          .then((response: AxiosResponse) => {
            searchResult.push({
              ...prepareResponse(response),
              apiEndpoint,
              storefront
            })
          })
  )
  await Promise.allSettled(promises.map(p => p.catch(e => {
    console.error(e)
  })))

  return searchResult;
});
