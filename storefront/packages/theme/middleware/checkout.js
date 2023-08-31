import { Logger } from "@vue-storefront/core";

export default (data) => {
  Logger.warn("Please implement vendor-specific checkout.js middleware in the 'middleware' directory to block access to checkout steps when customer did not yet complete previous steps");
  if (!data.app.$cookies.get("vsf-cart")) {
    return data.redirect("/");
  }
};
