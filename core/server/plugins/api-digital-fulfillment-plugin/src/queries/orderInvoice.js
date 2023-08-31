const { getOrder } = require("../util/getOrder");
const { createInvoice } = require("../util/generateInvoicePdf");

const checkArgs = (args) => {
  for (const arg of ["orderId", "shopId"]) {
    if (!(arg in args) || !args[arg]) {
      throw new Error(`You must provide "${arg}" argument`);
    }
  }
};

module.exports = async (context, args) => {
  checkArgs(args);
  const { orderId, shopId } = args;
  const order = await getOrder(context, { _id: orderId, shopId }, shopId);
  const shop = await context.queries.shopById(context, shopId);
  const { default: getOrderSummary } = await import(
    "@reactioncommerce/api-plugin-orders/src/resolvers/Order/orderSummary.js"
  );
  const { default: xformOrderItems } = await import(
    "@reactioncommerce/api-plugin-orders/src/xforms/xformOrderItems.js"
  );
  const { default: formatMoney } = await import(
    "@reactioncommerce/api-utils/formatMoney.js"
  );
  let orderSummary = await getOrderSummary(context, order);
  let orderItems = await xformOrderItems(context, order.shipping[0].items);

  orderItems = orderItems.map(({ price, subtotal, ...rest }) => ({
    ...rest,
    subtotal: {
      ...subtotal,
      displayAmount: formatMoney(subtotal.amount, subtotal.currencyCode),
    },
    price: {
      ...price,
      displayAmount: formatMoney(price.amount, price.currencyCode),
    },
  }));

  orderSummary = Object.fromEntries(
    Object.entries(orderSummary).map(([key, value]) => [
      key,
      {
        ...value,
        displayAmount: formatMoney(value.amount, value.currencyCode),
      },
    ])
  );

  orderSummary.paid = formatMoney(
    order.payments[0].amount,
    order.payments[0].currencyCode
  );

  const invoicePdfBase64 = createInvoice({
    ...order,
    items: orderItems,
    summary: orderSummary,
    shop,
  });

  return { invoice: invoicePdfBase64 };
};
