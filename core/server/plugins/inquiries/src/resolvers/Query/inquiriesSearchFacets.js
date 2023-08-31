const { getIdUtils } = require("../../xforms/id");

module.exports = async (_, args, context) => {
  const { shopIds: opaqueShopIds } = args;

  const shopIds =
    opaqueShopIds && opaqueShopIds.map(getIdUtils().decodeShopOpaqueId);

  return context.queries.inquiriesSearchFacets(context, {
    shopIds,
  });
};
