import getFulfillmentsQuery from "~/server/graphql/getFulfillments/getFulfillmentsQuery";
import type { FulfillmentMethod } from "~/types";

const prepareResponse = ({
  data: {
    digitalFulfillmentMethods: { methods },
  },
}): { methods: FulfillmentMethod[] } => methods;

export const getFulfillments = (event) =>
  event.context.apiClient
    .query({
      query: getFulfillmentsQuery,
      variables: {
        shopId: event.context.cookies.shopId,
      },
    })
    .then((response) => {
      return prepareResponse(response);
    });
