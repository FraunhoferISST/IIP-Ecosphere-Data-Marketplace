import query from "~/server/graphql/getViewer/query";
import type { Account } from "~/types";

const prepareResponse = ({ data: { viewer } }): Account => ({
  ...viewer,
  groups: viewer.groups.nodes.map((group) => group),
  addressBook: viewer.addressBook?.nodes?.map((group) => group) ?? [],
});

export const getViewer = (event): Promise<Account> => {
  return event.context.apiClient
    .query({
      query,
      variables: {},
    })
    .then((response) => {
      if (!response?.data?.viewer) {
        return null;
      }
      return prepareResponse(response);
    });
};
