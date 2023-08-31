import query from "~/server/graphql/getViewer/query";
import type { Account } from "~/types";

const prepareResponse = ({ data: { viewer } }): Account => viewer;

export const getViewer = (event, body): Promise<Account> => {
  const { node } = body;
  return event.context.apiClient
    .query(node.apiEndpoint, {
      query,
      variables: {},
    })
    .then((response) => {
      if (!response?.data?.viewer) {
        return null;
      }
      const viewer: Account = prepareResponse(response)
      return {
          firstName: viewer.firstName,
          lastName: viewer.lastName,
          name: viewer.name,
          _id: viewer._id,
          primaryEmailAddress: viewer.primaryEmailAddress,
          node: node
      };
    });
};
