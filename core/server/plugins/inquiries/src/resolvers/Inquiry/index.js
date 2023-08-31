const { getIdUtils, namespaces } = require("../../xforms/id");

module.exports = {
  _id: (node) => getIdUtils().encodeInquiryOpaqueId(node._id),
  shop: async (node, _, context) => {
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
  account: async (node, _, context) =>
    context.collections.Accounts.findOne(
      { _id: node.accountId }
      /* { name: 1, profile: 1, _id: 1 } */
    ),
  repliesCount: (node) => node.replies?.length ?? 0,
  replies: async (node, _, context) => {
    if (node.accountId !== context.accountId) {
      // Only inquiry creator is authorized to see replies
      return [];
    }
    const { replies = [] } = node;
    const resolvedReplies = [];

    for (const reply of replies) {
      const offers = await Promise.all(
        (reply.offers ?? []).map(async ({ productId, variantId }) => {
          const { product = {} } = await context.collections.Catalog.findOne({
            "product._id": productId,
          });
          const variant =
            (product?.variants ?? []).find(({ _id }) => variantId === _id) ??
            {};
          return {
            product,
            variant,
          };
        })
      );
      resolvedReplies.push({
        ...reply,
        _id: getIdUtils().encodeInquiryReplyOpaqueId(reply._id),
        account: await context.collections.Accounts.findOne({
          _id: node.accountId,
        }),
        offers,
      });
    }

    return resolvedReplies;
  },
};
