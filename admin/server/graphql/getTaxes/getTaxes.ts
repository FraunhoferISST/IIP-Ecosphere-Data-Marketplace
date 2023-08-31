import getTaxesQuery from "~/server/graphql/getTaxes/getTaxesQuery";
import type { TaxRate } from "~/types";

const prepareResponse = ({
  data: {
    taxRates: { nodes },
  },
}): TaxRate[] => nodes;

export const getTaxes = (event, body) => {
  return event.context.apiClient
    .query({
      query: getTaxesQuery,
      variables: {
        ...body,
        shopId: event.context.cookies.shopId,
      },
    })
    .then(async (response) => prepareResponse(response));
};
