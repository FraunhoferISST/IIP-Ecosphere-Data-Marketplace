import query from "~/server/graphql/getOrders/query";

const prepareResponse = ({
  data: {
    orders: { nodes, pageInfo, totalCount },
  },
}): { orders: unknown[]; pageInfo: object; totalCount: number } => ({
  orders: nodes,
  pageInfo,
  totalCount,
});

export const getOrders = (event, body) => {
  return event.context.apiClient
    .query({
      query: query,
      variables: {
        ...body,
        filters: {
          ...body.orderFilters,
          searchField: body.query,
        },
        shopIds: [event.context.cookies.shopId],
      },
    })
    .then((response) => prepareResponse(response));
};
