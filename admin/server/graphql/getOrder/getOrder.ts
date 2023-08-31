import getOrderQuery from "~/server/graphql/getOrder/getOrderQuery";
import { Order } from "~/types";

export const getOrder = async (event, body): Promise<Order> => {
  return event.context.apiClient
    .query({
      query: getOrderQuery,
      variables: {
        ...body,
        shopId: event.context.cookies.shopId,
      },
    })
    .then(({ data: { orderById } }) => orderById);
};
