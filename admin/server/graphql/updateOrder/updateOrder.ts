import updateOrderMutation from "~/server/graphql/updateOrder/updateOrderMutation";
import { Order } from "~/types";

export const updateOrder = async (event, body): Promise<Order> => {
  return event.context.apiClient
    .mutate({
      mutation: updateOrderMutation,
      variables: {
        ...body,
        shopId: event.context.cookies.shopId,
      },
    })
    .then(
      ({
        data: {
          updateOrder: { order },
        },
      }) => order
    );
};
