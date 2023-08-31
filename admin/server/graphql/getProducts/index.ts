import query from "~/server/graphql/getProducts/query";
import type { Product } from "~/types";

const prepareResponse = ({
  data: {
    products: { nodes, pageInfo, totalCount },
  },
}): { products: Product[]; pageInfo: object; totalCount: number } => ({
  products: nodes,
  pageInfo,
  totalCount,
});

export const getProducts = (event, body) =>
  event.context.apiClient
    .query({
      query: query,
      variables: {
        ...body,
        after: body.cursor ?? "",
        shopIds: [event.context.cookies.shopId],
      },
    })
    .then((response) => prepareResponse(response));
