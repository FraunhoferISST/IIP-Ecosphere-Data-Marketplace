const checkOrderPermissions = async (context, shopId, order) => {
  // you must either have `reaction:legacy:orders/read` permissions,
  // or this must be your own order
  await context.validatePermissions("reaction:legacy:orders", "read", {
    shopId,
    owner: order.accountId,
  });
};

module.exports.getOrder = async (context, selector, shopId) => {
  const { collections } = context;
  const order = await collections.Orders.findOne(selector);

  if (!order) {
    throw new Error("Order not found");
  }

  await checkOrderPermissions(context, shopId, order);

  return order;
};
