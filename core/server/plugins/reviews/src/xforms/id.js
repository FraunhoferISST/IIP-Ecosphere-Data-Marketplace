const namespaces = {
  Review: "reaction/review",
  Shop: "reaction/shop",
  Account: "reaction/account",
  Product: "reaction/product",
};
let methods = {};

(async () => {
  const decodeOpaqueIdForNamespace = await import(
    "@reactioncommerce/api-utils/decodeOpaqueIdForNamespace.js"
  );
  const encodeOpaqueId = await import(
    "@reactioncommerce/api-utils/encodeOpaqueId.js"
  );
  methods = {
    encodeReviewOpaqueId: encodeOpaqueId.default(namespaces.Review),
    encodeShopOpaqueId: encodeOpaqueId.default(namespaces.Shop),
    encodeProductOpaqueId: encodeOpaqueId.default(namespaces.Product),
    encodeAccountOpaqueId: encodeOpaqueId.default(namespaces.Account),
    decodeAccountOpaqueId: decodeOpaqueIdForNamespace.default(
      namespaces.Account
    ),
    decodeShopOpaqueId: decodeOpaqueIdForNamespace.default(namespaces.Shop),
    decodeReviewOpaqueId: decodeOpaqueIdForNamespace.default(namespaces.Review),
    decodeProductOpaqueId: decodeOpaqueIdForNamespace.default(
      namespaces.Product
    ),
    getDecoder: (namespace) => decodeOpaqueIdForNamespace.default(namespace),
    getEncoder: (namespace) => encodeOpaqueId.default(namespace),
  };
})();
module.exports.getIdUtils = () => methods;
module.exports.namespaces = namespaces;
