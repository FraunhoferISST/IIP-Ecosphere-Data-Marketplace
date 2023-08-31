const { getAccountEmail } = require("../util/getAccountEmail");
const { getAccessQuery } = require("../util/getCatalogItemAccessQuery");

module.exports = async (
  context,
  { catalogIdOrProductSlug, shopId, brokerInfo = "" } = {}
) => {
  const { collections } = context;
  const { Catalog } = collections;

  const accountEmail = await getAccountEmail(context, brokerInfo);
  const accessQuery = getAccessQuery(context, [shopId], accountEmail);

  if (!catalogIdOrProductSlug) {
    throw new Error(
      "invalid-param",
      "You must provide a product slug or product id"
    );
  }

  const query = {
    ...accessQuery,
    "product.isDeleted": { $ne: true },
    "product.isVisible": true,
    $or: [
      {
        _id: catalogIdOrProductSlug,
      },
      {
        "product.slug": catalogIdOrProductSlug,
      },
    ],
  };

  if (shopId) {
    query.shopId = shopId;
  }

  const item = await Catalog.findOne(query);

  if (!item) {
    throw new Error("Catalog product not found or the access is not granted");
  }

  return item;
};
