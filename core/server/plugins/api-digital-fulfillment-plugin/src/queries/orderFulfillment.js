const { getOrder } = require("../util/getOrder");
const { decrypt } = require("../../../../utils/crypt");

const checkArgs = (args) => {
  for (const arg of ["orderId", "shopId"]) {
    if (!(arg in args) || !args[arg]) {
      throw new Error(`You must provide "${arg}" argument`);
    }
  }
};

module.exports = async (context, args) => {
  checkArgs(args);
  const { orderId, shopId } = args;
  const order = await getOrder(context, { _id: orderId, shopId }, shopId);
  return {
    fulfillment: order.fulfillment
      ? order.fulfillment.map((f) => ({
          ...f,
          distributionsGroups: f.distributionsGroups.map((dg) => ({
            ...dg,
            distributions: dg.distributions.map((d) => ({
              ...d,
              accessUrl: d.accessUrl ? decrypt(d.accessUrl) : "",
              user: d.user ? decrypt(d.user) : "",
              password: d.password ? decrypt(d.password) : "",
            })),
          })),
        }))
      : order.fulfillment,
  };
};
