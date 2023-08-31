import createFulfillmentMutation from "~/server/graphql/createFulfillment/createFulfillmentMutation";
import { FulfillmentMethod } from "~/types";

export const createFulfillment = (event): Promise<FulfillmentMethod> => {
  return event.context.apiClient
    .mutate({
      mutation: createFulfillmentMutation,
      variables: {
        shopId: event.context.cookies.shopId,
      },
    })
    .then(
      ({
        data: {
          createDigitalFulfillmentMethod: { method },
        },
      }) => method
    );
};
