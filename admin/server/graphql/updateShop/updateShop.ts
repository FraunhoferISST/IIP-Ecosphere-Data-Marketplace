import updateShopMutation from "~/server/graphql/updateShop/updateShopMutation";
import type { Shop } from "~/types";

export const updateShop = (event, body): Promise<Shop> =>
  event.context.apiClient
    .mutate({
      mutation: updateShopMutation,
      variables: {
        input: {
          ...body,
          shopId: event.context.cookies.shopId,
        },
      },
    })
    .then(
      ({
        data: {
          updateShop: { shop },
        },
      }): Shop => shop
    );
