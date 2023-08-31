module.exports = async (context, { referenceId, shopId }) => {
  const existingOrder = await context.collections.Orders.findOne({
    referenceId,
    shopId,
  });

  if (!context.account || existingOrder.accountId !== context.accountId) {
    throw Error("Access denied");
  }

  const updatedDoc = await context.collections.Orders.findOneAndUpdate(
    {
      referenceId,
      shopId,
    },
    {
      $set: {
        "payments.0.userMarkedAsPaid": true,
      },
    },
    {
      returnDocument: "after",
      returnOriginal: false,
      upsert: false,
    }
  );
  return updatedDoc.value;
};
