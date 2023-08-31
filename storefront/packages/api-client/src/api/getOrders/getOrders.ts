import getOrdersQuery from "./getOrdersQuery";
import { Order } from "../../types";

const prepareResponse = (({ data: { ordersByAccountId: { nodes } }}): Order[] => nodes);

export const getOrders = async (context:Record<any, any>, params:Record<any, any>): Promise<Order[]> => {
  return context.client.query({
    query: getOrdersQuery,
    variables: {
      ...params,
      accountId: context.config.state.getUserId(),
      shopIds: [context.config.state.getShopId()],
    },
  })
    .then((response) => {
      return prepareResponse(response);
    });
};
