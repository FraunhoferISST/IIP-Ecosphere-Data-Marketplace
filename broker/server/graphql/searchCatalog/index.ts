import query from "./query";
import type {CatalogProduct, KnownNode} from "../../../types";
import {AxiosResponse} from "axios";
import {H3Event} from "h3";
import { encode } from 'js-base64';

const prepareResponse = ({ data: { searchCatalog: { items, cursor, count } }}): { items: CatalogProduct[], cursor: string, count: number} => ({
    items:  items.map(({ product }) => product),
    cursor,
    count,
});

export const searchCatalog = async (event: H3Event, { knownNodes, accountNodeEndpoint = "", searchQuery }: { knownNodes: KnownNode[], accountNodeEndpoint: string, searchQuery: object }) => {
  const searchResult: any[] = []
  const _knownNodes = knownNodes.filter(({ apiEndpoint }) => event.context.knownNodesConfig.map(({ apiEndpoint: endpoint }) => endpoint).includes(apiEndpoint));
  const promises: Promise<unknown>[] = _knownNodes.map(({ apiEndpoint, _id, storefront}: KnownNode) =>
    event.context.apiClient
      .query(apiEndpoint, {
        query,
        variables: {
            shopIds: [_id],
            searchQuery,
            brokerInfo: accountNodeEndpoint ? encode(`${event.context.brokerVerificationEndpoint}::${accountNodeEndpoint}`) : ""
        },
      })
      .then((response: AxiosResponse) => {
          searchResult.push({
              ...prepareResponse(response),
              shopId: _id,
              apiEndpoint,
              storefront
          })
      })
  )
    const result = await Promise.allSettled(promises.map(p => p.catch(e => {
        console.error(e)
        throw e
    })))
    return searchResult;
}
