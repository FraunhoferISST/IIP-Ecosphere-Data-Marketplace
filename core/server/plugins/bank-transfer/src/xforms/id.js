const namespaces = {
  Review: "reaction/review",
  Inquiry: "reaction/inquiry",
  InquiryReply: "reaction/inquiryReply",
  Shop: "reaction/shop",
  Account: "reaction/account",
  Product: "reaction/product",
  CatalogProduct: "reaction/catalogProduct",
  CatalogProductVariant: "reaction/catalogProductVariant",
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
    encodeInquiryOpaqueId: encodeOpaqueId.default(namespaces.Inquiry),
    encodeInquiryReplyOpaqueId: encodeOpaqueId.default(namespaces.InquiryReply),
    encodeShopOpaqueId: encodeOpaqueId.default(namespaces.Shop),
    encodeAccountOpaqueId: encodeOpaqueId.default(namespaces.Account),
    encodeCatalogProductOpaqueId: encodeOpaqueId.default(
      namespaces.CatalogProduct
    ),
    encodeCatalogProductVariantOpaqueId: encodeOpaqueId.default(
      namespaces.CatalogProductVariant
    ),

    decodeAccountOpaqueId: decodeOpaqueIdForNamespace.default(
      namespaces.Account
    ),
    decodeShopOpaqueId: decodeOpaqueIdForNamespace.default(namespaces.Shop),
    decodeCatalogProductOpaqueId: decodeOpaqueIdForNamespace.default(
      namespaces.CatalogProduct
    ),
    decodeCatalogProductVariantOpaqueId: decodeOpaqueIdForNamespace.default(
      namespaces.CatalogProductVariant
    ),
    decodeReviewOpaqueId: decodeOpaqueIdForNamespace.default(namespaces.Review),
    decodeInquiryOpaqueId: decodeOpaqueIdForNamespace.default(
      namespaces.Inquiry
    ),
    decodeInquiryReplyOpaqueId: decodeOpaqueIdForNamespace.default(
      namespaces.InquiryReply
    ),
    decodeProductOpaqueId: decodeOpaqueIdForNamespace.default(
      namespaces.Product
    ),
    getDecoder: (namespace) => decodeOpaqueIdForNamespace.default(namespace),
    getEncoder: (namespace) => encodeOpaqueId.default(namespace),
  };
})();
module.exports.getIdUtils = () => methods;
module.exports.namespaces = namespaces;
