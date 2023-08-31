import {apiClientFactory} from "@vue-storefront/core";
import type {Setttings, Endpoints} from "./types";
import {updateAccount} from "./api/updateAccount/updateAccount";
import {getAccount} from "./api/getAccount/getAccount";
import {getPrimaryShop} from "./api/getPrimaryShop/getPrimaryShop";
import {login} from "./api/login/login";
import {register} from "./api/register/register";
import {refreshToken} from "./api/refreshToken/refreshToken";
import {createAccount} from "./api/createAccount/createAccount";
import {getCatalogItems} from "./api/getCatalogItems/getCatalogItems";
import {getCatalogItem} from "./api/getCatalogItem/getCatalogItem";
import {getAccountCart} from "./api/getAccountCart/getAccountCart";
import {createAccountCart} from "./api/createAccountCart/createAccountCart";
import {addCartItems} from "./api/addCartItems/addCartItems";
import {removeCartItems} from "./api/removeCartItems/removeCartItems";
import {updateCartItemsQuantity} from "./api/updateCartItemsQuantity/updateCartItemsQuantity";
import {placeOrder} from "./api/placeOrder/placeOrder";
import {addAccountAddress} from "./api/addAccountAddress/addAccountAddress";
import {setCartAddress} from "./api/setCartAddress/setCartAddress";
import {updateFulfillmentOptions} from "./api/updateFulfillmentOptions/updateFulfillmentOptions";
import {getPaymentMethods} from "./api/getPaymentMethods/getPaymentMethods";
import {selectFulfillmentOption} from "./api/selectFulfillmentOption/selectFulfillmentOption";
import {getOrders} from "./api/getOrders/getOrders";
import {getOrderFulfillment} from "./api/getOrderFulfillment/getOrderFulfillment";
import {setCartPaymentMethod} from "./api/setCartPaymentMethod/setCartPaymentMethod";
import {getOrderInvoice} from "./api/getOrderInvoice/getOrderInvoice";
import {addProductReview} from "./api/addProductReview/addProductReview";
import {addShopReview} from "./api/addShopReview/addShopReview";
import {getReviews} from "./api/getReviews/getReviews";
import {canAddReview} from "./api/canAddReview/canAddReview";
import {getReviewsAggregation} from "./api/getReviewsAggregation/getReviewsAggregation";
import {clientFactory} from "./helpers/apiClient";
import {stateExtension} from "./helpers/stateExtension";
import {createInquiry} from "./api/createInquiry/createInquiry";
import {updateInquiry} from "./api/updateInquiry/updateInquiry";
import {replyToInquiry} from "./api/replyToInquiry/replyToInquiry";
import {getAccountInquiries} from "./api/getAccountInquiries/getAccountInquiries";
import {getInquiry} from "./api/getInquiry/getInquiry";
import {searchInquiries} from "./api/searchInquiries/searchInquiries";
import {acceptRejectInquiryReply} from "./api/acceptRejectInquiryReply/acceptRejectInquiryReply";
import {searchCatalog} from "./api/searchCatalog/searchCatalog";
import {catalogSearchFacets} from "./api/catalogSearchFacets/catalogSearchFacets";
import {inquiriesSearchFacets} from "./api/inquiriesSearchFacets/inquiriesSearchFacets";

function onCreate(settings: any) {
  return {
    config: settings,
    client: clientFactory(settings.api.url, settings.state.getUserToken()),
  };
}

const {createApiClient} = apiClientFactory<Setttings, Endpoints>({
  onCreate,
  api: {
    login,
    register,
    getAccount,
    getPrimaryShop,
    refreshToken,
    createAccount,
    getCatalogItems,
    getCatalogItem,
    updateAccount,
    getAccountCart,
    createAccountCart,
    addCartItems,
    removeCartItems,
    updateCartItemsQuantity,
    placeOrder,
    addAccountAddress,
    setCartAddress,
    updateFulfillmentOptions,
    getPaymentMethods,
    selectFulfillmentOption,
    getOrders,
    getOrderFulfillment,
    setCartPaymentMethod,
    getOrderInvoice,
    getReviews,
    getReviewsAggregation,
    addProductReview,
    addShopReview,
    canAddReview,
    createInquiry,
    updateInquiry,
    getInquiry,
    searchInquiries,
    replyToInquiry,
    acceptRejectInquiryReply,
    searchCatalog,
    catalogSearchFacets,
    inquiriesSearchFacets,
    getAccountInquiries,
  },
  extensions: [stateExtension],
});

export {
  createApiClient
};
