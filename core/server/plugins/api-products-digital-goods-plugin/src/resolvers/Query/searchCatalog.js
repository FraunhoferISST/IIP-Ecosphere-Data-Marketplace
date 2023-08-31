const { getIdUtils } = require("../../xforms/id");

module.exports = async (_, args, context) => {
  const { shopIds: opaqueShopIds, searchQuery, brokerInfo } = args;

  const shopIds =
    opaqueShopIds && opaqueShopIds.map(getIdUtils().decodeShopOpaqueId);

  return context.queries.searchCatalog(context, {
    searchQuery,
    shopIds,
    brokerInfo,
  });
};
