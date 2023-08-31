import updateShopSettingsMutation from "~/server/graphql/updateShopSettings/updateShopSettingsMutation";
import type { ShopSettings } from "~/types";

export const updateShopSettings = (event, body): Promise<ShopSettings> =>
  event.context.apiClient
    .mutate({
      mutation: updateShopSettingsMutation,
      variables: {
        input: {
          settingsUpdates: body,
          shopId: event.context.cookies.shopId,
        },
      },
    })
    .then(
      ({
        data: {
          updateShopSettings: { shopSettings },
        },
      }): ShopSettings => shopSettings
    );
