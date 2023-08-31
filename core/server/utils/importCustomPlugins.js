const digitalProducts = require("../plugins/api-products-digital-goods-plugin/index");
const digitalFulfillment = require("../plugins/api-digital-fulfillment-plugin");
const reviews = require("../plugins/reviews");
const inquiries = require("../plugins/inquiries");
const bankTransfer = require("../plugins/bank-transfer");

module.exports = async (api) =>
  api.registerPlugins({
    digitalProducts,
    digitalFulfillment,
    reviews,
    inquiries,
    bankTransfer,
  });
