import query from "~/server/graphql/getAccounts/query";

const prepareResponse = ({
  data: {
    accounts: { nodes, pageInfo, totalCount },
  },
}): object => ({
  items: nodes.map((node) => ({
    ...node,
    groups: node.groups.nodes,
  })),
  cursor: pageInfo?.hasNextPage && pageInfo?.endCursor,
  count: totalCount,
});

export const getAccounts = async (event, body) =>
  event.context.apiClient
    .query({
      query,
      variables: body,
    })
    .then((response) => prepareResponse(response));
