import query from "~/server/graphql/getGroups/query";
import { Group } from "../../../../shared/types";

const prepareResponse = ({ data: { accountsGroups } }): Group[] =>
  accountsGroups;

export const getGroups = async (event, body) =>
  event.context.apiClient
    .query({
      query,
      variables: {
        shopId: event.context.cookies.shopId,
      },
    })
    .then((response) => prepareResponse(response));
