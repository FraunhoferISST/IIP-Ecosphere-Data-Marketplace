import getCatalogItemsQuery from "./getCatalogItemsQuery";
import type { Product } from "../../types";

const prepareResponse = ({ data: { catalogItems: { nodes, pageInfo, totalCount } }}): { items: Product[], pageInfo: object, totalCount: number} => ({
  items: nodes.map(({ product }) => product),
  pageInfo,
  totalCount,
});

export const getCatalogItems = async (context: Record<any, any>, params: Record<any, any>): Promise<object> =>
  context.client.query({
    query: getCatalogItemsQuery,
    variables: {
      ...params,
      after: params.cursor ?? "",
      shopIds: [context.config.state.getShopId()],
    },
  })
    .then(response => prepareResponse(response));

