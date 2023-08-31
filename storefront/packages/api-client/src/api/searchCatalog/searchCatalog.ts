import searchCatalogQuery from "./searchCatalogQuery";
import type { CatalogProduct } from "../../types";

const prepareResponse = ({ data: { searchCatalog: { items, cursor, count } }}): { items: CatalogProduct[], cursor: string, count: number} => ({
  items: items.map(({ product }) => product),
  count,
  cursor,
});

export const searchCatalog = async (context: Record<any, any>, searchQuery: Record<any, any>): Promise<object> =>
  context.client.query({
    query: searchCatalogQuery,
    variables: {
      searchQuery,
      shopIds: [context.config.state.getShopId()],
    },
  })
    .then(response => prepareResponse(response));

