const checkOrderPermissions = async (context, shopId, cart) => {
  // you must either have `reaction:legacy:orders/read` permissions,
  // or this must be your own cart
  await context.validatePermissions("reaction:legacy:read", "update", {
    shopId,
    owner: cart.accountId,
  });
};

module.exports.getCart = async (context, selector, shopId) => {
  const { collections } = context;
  const cart = await collections.Cart.findOne(selector);

  if (!cart) {
    throw new Error("Cart not found");
  }

  await checkOrderPermissions(context, shopId, cart);

  return cart;
};
