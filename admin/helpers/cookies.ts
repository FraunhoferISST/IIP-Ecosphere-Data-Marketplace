import { CookiesGetter } from "~/types";

export const cookiesNames = {
  currencyCookieName: "admin-currency",
  localeCookieName: "admin-locale",
  userTokenCookieName: "admin-token",
  userRefreshTokenCookieName: "admin-refresh-token",
  userIdCookieName: "admin-id",
  shopCookieName: "admin-shop",
};

export const cookiesGetter = (cookies): CookiesGetter => {
  return {
    getUserToken: () => cookies[cookiesNames.userTokenCookieName],
    getUserRefreshToken: () => cookies[cookiesNames.userRefreshTokenCookieName],
    getUserId: () => cookies[cookiesNames.userIdCookieName],
    getShopId: () => cookies[cookiesNames.shopCookieName],
  };
};
