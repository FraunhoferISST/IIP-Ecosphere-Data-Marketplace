import query from "./query";
import {H3Event} from "h3";
import {KnownNode, InquiriesSearchResult, InquirySearchQuery} from "~/types";
import {AxiosResponse} from "axios";

const prepareResponse = ({ data: { searchInquiries } }): InquiriesSearchResult =>
  searchInquiries;

export const searchInquiries = async (event: H3Event, { knownNodes, accountNodeEndpoint = "", searchQuery } : { knownNodes: KnownNode[], accountNodeEndpoint: string, searchQuery: object }) => {
    const searchResult: any[] = []
    const _knownNodes = knownNodes.filter(({ apiEndpoint }) => event.context.knownNodesConfig.map(({ apiEndpoint: endpoint }) => endpoint).includes(apiEndpoint));
    const promises: Promise<unknown>[] = _knownNodes.map(({ apiEndpoint, _id, storefront}: KnownNode) =>
        event.context.apiClient
            .query(apiEndpoint, {
                query,
                variables: {
                    shopIds: [_id],
                    searchQuery,
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
    await Promise.allSettled(promises.map(p => p.catch(e => {
        console.error(e)
        throw e
    })))
    return searchResult;
};
