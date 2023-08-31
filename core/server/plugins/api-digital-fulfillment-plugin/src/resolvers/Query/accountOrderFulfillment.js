const { getIdUtils } = require("../../xforms/id");

module.exports = async (_, args, context) => {
  const {
    accountId: opaqueAccountId,
    shopId: opaqueShopId,
    orderReferenceId,
  } = args;

  const accountId = getIdUtils().decodeAccountOpaqueId(opaqueAccountId);
  const shopId = getIdUtils().decodeShopOpaqueId(opaqueShopId);

  return context.queries.accountOrderFulfillment(context, {
    accountId,
    orderReferenceId,
    shopId,
  });
};
