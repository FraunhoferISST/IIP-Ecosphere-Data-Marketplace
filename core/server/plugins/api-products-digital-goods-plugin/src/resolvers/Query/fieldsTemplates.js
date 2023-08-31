const { getIdUtils } = require("../../xforms/id");

module.exports = async (_, args, context) => {
  const { shopIds: opaqueShopIds, searchQuery } = args;

  const shopIds =
    opaqueShopIds && opaqueShopIds.map(getIdUtils().decodeShopOpaqueId);

  return context.queries.fieldsTemplates(context, {
    searchQuery,
    shopIds,
  });
};
