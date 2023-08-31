import createOrderFulfillmentMutation from "~/server/graphql/createOrderFulfillment/createOrderFulfillmentMutation";
import { OrderFulfilment } from "~/types";

export const createOrderFulfillment = async (
  event,
  body
): Promise<OrderFulfilment> => {
  return event.context.apiClient
    .mutate({
      mutation: createOrderFulfillmentMutation,
      variables: {
        ...body,
        shopId: event.context.cookies.shopId,
      },
    })
    .then(({ data: { createOrderFulfillment } }) => createOrderFulfillment);
};
