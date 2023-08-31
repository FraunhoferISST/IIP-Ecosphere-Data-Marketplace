import Cookies from "js-cookie";

export const cookies = {
  currencyCookieName: "vsf-currency",
  countryCookieName: "vsf-country",
  localeCookieName: "vsf-locale",
  cartCookieName: "vsf-cart",
  userTokenCookieName: "vsf-token",
  userRefreshTokenCookieName: "vsf-refresh-token",
  userIdCookieName: "vsf-id",
  shopCookieName: "vsf-store"
};

export const removeAccountCookies = () =>
  [cookies.userIdCookieName, cookies.userTokenCookieName, cookies.userRefreshTokenCookieName]
    .forEach(cookieName => Cookies.remove(cookieName));
