const namespaces = {
  FulfillmentMethod: "reaction/fulfillmentMethod",
  Shop: "reaction/shop",
  Order: "reaction/order",
  Account: "reaction/account",
  Cart: "reaction/cart",
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
    encodeFulfillmentMethodOpaqueId: encodeOpaqueId.default(
      namespaces.FulfillmentMethod
    ),
    encodeShopOpaqueId: encodeOpaqueId.default(namespaces.Shop),
    encodeOrderOpaqueId: encodeOpaqueId.default(namespaces.order),
    encodeAccountOpaqueId: encodeOpaqueId.default(namespaces.Account),
    decodeAccountOpaqueId: decodeOpaqueIdForNamespace.default(
      namespaces.Account
    ),
    decodeFulfillmentMethodOpaqueId: decodeOpaqueIdForNamespace.default(
      namespaces.FulfillmentMethod
    ),
    decodeShopOpaqueId: decodeOpaqueIdForNamespace.default(namespaces.Shop),
    decodeOrderOpaqueId: decodeOpaqueIdForNamespace.default(namespaces.Order),
    decodeCartOpaqueId: decodeOpaqueIdForNamespace.default(namespaces.Cart),
  };
})();
module.exports.getIdUtils = () => methods;
