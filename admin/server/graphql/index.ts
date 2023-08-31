import { createProduct } from "~/server/graphql/createProduct/createProduct";
import { cloneProduct } from "~/server/graphql/cloneProduct/cloneProduct";
import { getProduct } from "~/server/graphql/getProduct/getProduct";
import { getProducts } from "~/server/graphql/getProducts";
import { updateProduct } from "~/server/graphql/updateProduct";
import { createProductVariant } from "~/server/graphql/createProductVariant/createProductVariant";
import { updateProductVariant } from "~/server/graphql/updateProductVariant/updateProductVariant";
import { updateProductVariantPrices } from "~/server/graphql/updateProductVariantPrices/updateProductVariantPrices";
import { publishProducts } from "~/server/graphql/publishProducts/publishProducts";
import { login } from "~/server/graphql/login/login";
import { logout } from "~/server/graphql/logout/logout";
import { createAccount } from "~/server/graphql/createAccount/";
import { updateAccount } from "~/server/graphql/updateAccount";
import { getViewer } from "~/server/graphql/getViewer";
import { getAccounts } from "~/server/graphql/getAccounts";
import { getPrimaryShop } from "~/server/graphql/getPrimaryShop/getPrimaryShop";
import { createShop } from "~/server/graphql/createShop/createShop";
import { register } from "~/server/graphql/register/register";
import { getPaymentMethods } from "~/server/graphql/getPaymentMethods/getPaymentMethods";
import { getAvailablePaymentMethods } from "~/server/graphql/getAvailablePaymentMethods/getAvailablePaymentMethods";
import { enablePaymentMethod } from "~/server/graphql/enablePaymentMethod/enablePaymentMethod";
import { updateShop } from "~/server/graphql/updateShop/updateShop";
import { updateShopInvoiceDetails } from "~/server/graphql/updateShopInvoiceDetails/updateShopInvoiceDetails";
import { createFulfillment } from "~/server/graphql/createFulfillment/createFulfillment";
import { getFulfillments } from "~/server/graphql/getFulfillments/getFulfillments";
import { getOrders } from "~/server/graphql/getOrders";
import { getOrder } from "~/server/graphql/getOrder/getOrder";
import { updateOrder } from "~/server/graphql/updateOrder/updateOrder";
import { approvePayments } from "~/server/graphql/approvePayments/approvePayments";
import { capturePayments } from "~/server/graphql/capturePayments/capturePayments";
import { updateFulfillmentOptions } from "~/server/graphql/updateFulfillmentOptions/updateFulfillmentOptions";
import { createOrderFulfillment } from "~/server/graphql/createOrderFulfillment/createOrderFulfillment";
import { getOrderFulfillment } from "~/server/graphql/getOrderFulfillment/getOrderFulfillment";
import { getOrderInvoice } from "~/server/graphql/getOrderInvoice/getOrderInvoice";
import { getReviews } from "~/server/graphql/getReviews/getReviews";
import { getReviewsAggregation } from "~/server/graphql/getReviewsAggregation/getReviewsAggregation";
import { createInquiry } from "~/server/graphql/createInquiry";
import { getInquiries } from "~/server/graphql/getInquiries";
import { getInquiry } from "~/server/graphql/getInquiry/getInquiry";
import { updateInquiry } from "~/server/graphql/updateInquiry/updateInquiry";
import { getTaxes } from "~/server/graphql/getTaxes/getTaxes";
import { createTax } from "~/server/graphql/createTax/createTax";
import { updateTax } from "~/server/graphql/updateTax/updateTax";
import { deleteTax } from "~/server/graphql/deleteTax/deleteTax";
import { getShopSettings } from "~/server/graphql/getShopSettings/getShopSettings";
import { updateShopSettings } from "~/server/graphql/updateShopSettings/updateShopSettings";
import { archiveProduct } from "~/server/graphql/archiveProduct";
import { refreshToken } from "~/server/graphql/refreshToken";
import { getFieldsTemplates } from "~/server/graphql/getFieldsTemplates";
import { getAccount } from "~/server/graphql/getAccount";
import { updateAccountGroups } from "~/server/graphql/updateAccountGroups";
import { getGroups } from "~/server/graphql/getGroups";

export default {
  createProduct,
  cloneProduct,
  getProduct,
  getProducts,
  updateProduct,
  publishProducts,
  createProductVariant,
  updateProductVariant,
  updateProductVariantPrices,
  login,
  logout,
  createAccount,
  updateAccount,
  getViewer,
  getAccounts,
  getPrimaryShop,
  createShop,
  register,
  getPaymentMethods,
  getAvailablePaymentMethods,
  enablePaymentMethod,
  updateShop,
  createFulfillment,
  getFulfillments,
  getOrders,
  getOrder,
  updateOrder,
  approvePayments,
  capturePayments,
  updateFulfillmentOptions,
  createOrderFulfillment,
  getOrderFulfillment,
  getOrderInvoice,
  getReviews,
  getReviewsAggregation,
  createInquiry,
  getInquiries,
  getInquiry,
  updateInquiry,
  updateShopInvoiceDetails,
  getTaxes,
  createTax,
  updateTax,
  deleteTax,
  getShopSettings,
  updateShopSettings,
  archiveProduct,
  refreshToken,
  getFieldsTemplates,
  getAccount,
  updateAccountGroups,
  getGroups,
};
