import getShopSettingsQuery from "~/server/graphql/getShopSettings/getShopSettingsQuery";
import type { ShopSettings } from "~/types";

export const getShopSettings = (event): Promise<ShopSettings> =>
  event.context.apiClient
    .query({
      query: getShopSettingsQuery,
      variables: {
        shopId: event.context.cookies.shopId,
      },
    })
    .then(({ data: { shopSettings } }): ShopSettings => shopSettings);
