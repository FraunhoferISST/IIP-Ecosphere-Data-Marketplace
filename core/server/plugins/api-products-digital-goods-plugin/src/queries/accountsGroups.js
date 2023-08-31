module.exports = async (context, { shopId }) => {
  const { collections } = context;
  const { Groups } = collections;

  await context.validatePermissions("reaction:legacy:groups", "read", {
    shopId,
  });
  return Groups.find({}).toArray();
};
