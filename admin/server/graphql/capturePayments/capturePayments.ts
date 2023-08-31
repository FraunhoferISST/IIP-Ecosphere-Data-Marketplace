import capturePaymetnsMutation from "~/server/graphql/capturePayments/capturePaymetnsMutation";
import { Order } from "~/types";

export const capturePayments = (event, body): Promise<Order> => {
  return event.context.apiClient
    .mutate({
      mutation: capturePaymetnsMutation,
      variables: {
        ...body,
        shopId: event.context.cookies.shopId,
      },
    })
    .then(
      ({
        data: {
          captureOrderPayments: { order },
        },
      }) => order
    );
};
