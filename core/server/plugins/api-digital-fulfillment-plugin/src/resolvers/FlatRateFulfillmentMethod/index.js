const { encodeFulfillmentMethodOpaqueId } = require("../../xforms/id");

module.exports = {
  _id: (node) => encodeFulfillmentMethodOpaqueId(node._id),
  isEnabled: (node) => !!node.enabled,
};
