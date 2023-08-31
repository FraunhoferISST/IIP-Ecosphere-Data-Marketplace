import getOrderFulfillmentQuery from "~/server/graphql/getOrderFulfillment/getOrderFulfillmentQuery";
import type { OrderFulfilment } from "~/types";

const prepareResponse = ({ data: { orderFulfillment } }): OrderFulfilment =>
  orderFulfillment;

export const getOrderFulfillment = (event, body): Promise<OrderFulfilment> =>
  event.context.apiClient
    .query({
      query: getOrderFulfillmentQuery,
      variables: {
        ...body,
        shopId: event.context.cookies.shopId,
      },
    })
    .then((response) => {
      return prepareResponse(response);
    });
