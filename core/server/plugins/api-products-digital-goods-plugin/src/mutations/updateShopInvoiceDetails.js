module.exports = async (context, { shopId, ...rest }) => {
  const { collections } = context;
  const { Shops } = collections;

  await context.validatePermissions(
    `reaction:legacy:shops:${shopId}`,
    "update",
    { shopId }
  );

  const { value: updatedShop } = await Shops.findOneAndUpdate(
    { _id: shopId },
    {
      $set: {
        invoiceDetails: rest,
        updatedAt: new Date(),
      },
    },
    {
      returnOriginal: false,
    }
  );

  return updatedShop;
};
