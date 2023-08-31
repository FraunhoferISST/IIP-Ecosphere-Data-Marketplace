const { getIdUtils, namespaces } = require("../../xforms/id");

module.exports = {
  _id: (node) => getIdUtils().encodeReviewOpaqueId(node._id),
  attributedProductId: (node) =>
    getIdUtils().getEncoder(namespaces.Product)(node.attributedProductId),
  attributedShopId: (node) =>
    getIdUtils().getEncoder(namespaces.Shop)(node.attributedShopId),
  attributedAccountId: (node) =>
    getIdUtils().getEncoder(namespaces.Account)(node.attributedAccountId),
  attributedProduct: async (node, _, context) => {
    if (node.attributedProductId) {
      const { title } = await context.collections.Products.findOne({
        _id: node.attributedProductId,
      });
      return {
        _id: getIdUtils().getEncoder(namespaces.Product)(
          node.attributedProductId
        ),
        title,
      };
    }
    return null;
  },
  attributedShop: async (node, _, context) => {
    if (node.attributedShopId) {
      const { name } = await context.collections.Shops.findOne({
        _id: node.attributedShopId,
      });
      return {
        _id: getIdUtils().getEncoder(namespaces.Shop)(node.attributedShopId),
        name,
      };
    }
    return null;
  },
  attributedAccount: async (node, _, context) => {
    if (node.attributedAccountId) {
      const {
        profile: { firstName, lastName, picture },
        ...rest
      } = await context.collections.Accounts.findOne(
        { _id: node.accountId },
        { name: 1, profile: 1, _id: 1 }
      );
      return {
        firstName,
        lastName,
        picture,
        ...rest,
      };
    }
    return null;
  },
  account: async (node, _, context) => {
    const {
      profile: { firstName, lastName, picture },
      ...rest
    } = await context.collections.Accounts.findOne(
      { _id: node.accountId },
      { name: 1, profile: 1, _id: 1 }
    );
    return {
      firstName,
      lastName,
      picture,
      ...rest,
    };
  },
};
