import approvePaymentsMutation from "~/server/graphql/approvePayments/approvePaymentsMutation";
import { Order } from "~/types";

export const approvePayments = (event, body): Promise<Order> => {
  return event.context.apiClient
    .mutate({
      mutation: approvePaymentsMutation,
      variables: {
        ...body,
        shopId: event.context.cookies.shopId,
      },
    })
    .then(
      ({
        data: {
          approveOrderPayments: { order },
        },
      }) => order
    );
};
