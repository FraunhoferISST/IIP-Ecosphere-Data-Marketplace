import { ApiClientExtension } from "@vue-storefront/core";

export const cookies = {
  currencyCookieName: "vsf-currency",
  countryCookieName: "vsf-country",
  localeCookieName: "vsf-locale",
  cartCookieName: "vsf-cart",
  userTokenCookieName: "vsf-token",
  userRefreshTokenCookieName: "vsf-refresh-token",
  userIdCookieName: "vsf-id",
  shopCookieName: "vsf-shop",
};

export const stateExtension: ApiClientExtension = {
  name: "tokenExtension",
  hooks: (req, res) => ({
    beforeCreate: ({ configuration }) => {
      const cookieOptions = {
        // expire after 3 days
        maxAge: 3 * 24 * 60 * 60 * 1000,
        sameSite: true,
      };
      return {
        ...configuration,
        state: {
          getUserToken: () => req.cookies[cookies.userTokenCookieName],
          setUserToken: (token) => {
            if (!token) {
              res.clearCookie(cookies.userTokenCookieName);
              return delete req.cookies[cookies.userTokenCookieName];
            }
            res.cookie(cookies.userTokenCookieName, token, cookieOptions);
          },
          getUserRefreshToken: () => req.cookies[cookies.userRefreshTokenCookieName],
          setUserRefreshToken: (token) => {
            if (!token) {
              res.clearCookie(cookies.userRefreshTokenCookieName);
              return delete req.cookies[cookies.userRefreshTokenCookieName];
            }
            res.cookie(cookies.userRefreshTokenCookieName, token, cookieOptions);
          },
          getUserId: () => req.cookies[cookies.userIdCookieName],
          setUserId: (id) => {
            if (!id) {
              res.clearCookie(cookies.userIdCookieName);
              return delete req.cookies[cookies.userIdCookieName];
            }
            res.cookie(cookies.userIdCookieName, id, cookieOptions);
          },
          getShopId: () => req.cookies[cookies.shopCookieName],
          setShopId: (id) => {
            if (!id) {
              res.clearCookie(cookies.shopCookieName);
              return delete req.cookies[cookies.shopCookieName];
            }
            res.cookie(cookies.shopCookieName, id, cookieOptions);
          },
          getCartId: () => req.cookies[cookies.cartCookieName],
          setCartId: (id) => {
            if (!id) {
              res.clearCookie(cookies.cartCookieName);
              return delete req.cookies[cookies.cartCookieName];
            }
            res.cookie(cookies.cartCookieName, id, cookieOptions);
          },
        },
      };
    },
  }),
};
