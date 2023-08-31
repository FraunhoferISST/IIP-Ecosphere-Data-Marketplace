const SimpleSchema = require("simpl-schema");
const { getCart } = require("../util/getCart");

const inputSchema = new SimpleSchema({
  cartId: String,
  shopId: String,
  paymentMethod: {
    type: Object,
    blackbox: true,
  },
});

module.exports = async (context, input) => {
  const cleanedInput = inputSchema.clean(input);
  inputSchema.validate(cleanedInput);

  const { paymentMethod, cartId, shopId } = cleanedInput;

  const cart = await getCart(context, { _id: cartId }, shopId);

  await context.validatePermissions("reaction:legacy:cart", "update", {
    shopId,
    owner: cart.accountId,
  });

  await context.collections.Cart.updateOne(
    {
      _id: cartId,
      shopId,
    },
    {
      $set: {
        paymentMethod,
      },
    }
  );
  return paymentMethod;
};
