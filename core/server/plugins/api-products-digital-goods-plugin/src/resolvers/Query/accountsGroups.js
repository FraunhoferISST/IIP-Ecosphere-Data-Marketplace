const { getIdUtils } = require("../../xforms/id");

module.exports = async (_, args, context) => {
  const shopId = getIdUtils().decodeShopOpaqueId(args.shopId);

  return context.queries.accountsGroups(context, {
    ...args,
    shopId,
  });
};
