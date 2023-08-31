const checkOrderPermissions = async (context, shopId, order) => {
  // you must either have `reaction:legacy:orders/read` permissions,
  // or this must be your own order
  await context.validatePermissions("reaction:legacy:orders", "read", {
    shopId,
    owner: order.accountId,
  });
};

module.exports.geAccountOrders = async (context, accountId, shopId) => {
  const {
    collections: { Orders },
  } = context;
  const orders = await Orders.find({ accountId, shopId }).toArray();

  if (!orders) {
    throw new Error("Account has no orders");
  }

  return orders;
};
