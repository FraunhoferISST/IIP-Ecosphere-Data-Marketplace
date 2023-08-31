const { getOrder } = require("../util/getOrder");
const { decrypt } = require("../../../../utils/crypt");

const checkArgs = (args) => {
  for (const arg of ["shopId", "orderReferenceId"]) {
    if (!(arg in args) || !args[arg]) {
      throw new Error(`You must provide "${arg}" argument`);
    }
  }
};

const orderIsPaid = (order) => order.payments && order.payments[0]?.amount;
// order.payments[0]?.amount === order.shipping[0]?.invoice.total;

const orderPaymentsIsCaptured = (order) =>
  order.payments[0]?.mode === "captured";

const orderStatusIsCompleted = (order) =>
  order?.workflow?.status === "coreOrderWorkflow/completed";

const isOrderIsCompleted = (order) =>
  [
    orderIsPaid(order),
    orderPaymentsIsCaptured(order),
    orderStatusIsCompleted(order),
  ].every((condition) => condition);

module.exports = async (context, args) => {
  checkArgs(args);
  const { orderReferenceId, shopId } = args;
  const order = await getOrder(
    context,
    { referenceId: orderReferenceId, shopId, accountId: context.accountId },
    shopId
  );
  if (isOrderIsCompleted(order)) {
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
  }
  return { fulfillment: null };
};
