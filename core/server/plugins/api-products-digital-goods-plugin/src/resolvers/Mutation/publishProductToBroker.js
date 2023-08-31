const axios = require("axios");
const { getIdUtils } = require("../../xforms/id");

module.exports = async (_, args, context) => {
  const { Catalog } = context.collections;
  const { shopId: opaqueShopId, productId: opaqueProductId } = args;

  const shopId = getIdUtils().decodeShopOpaqueId(opaqueShopId);
  const productId = getIdUtils().decodeProductOpaqueId(opaqueProductId);

  await context.validatePermissions(
    `reaction:legacy:products:${productId}`,
    "publish",
    { shopId }
  );

  const catalogRawItem = await Catalog.findOne({
    "product._id": productId,
    shopId,
  });
  if (!catalogRawItem) {
    throw new Error(
      "Couldn't find the product in catalog. Make sure it's published to the shop"
    );
  }
  const catalogShop = await context.queries.shopById(context, shopId);
  const brokerOffer = {
    shopUrl: "http://localhost/4000",
    shop: {
      name: catalogShop?.name,
      _id: catalogShop?._id,
      emails: catalogShop?.emails,
    },
    ...catalogRawItem,
  };

  return brokerOffer;
};
