function xformOrderPayment(payment) {
  const {
    _id,
    address,
    amount,
    captureErrorMessage,
    cardBrand,
    createdAt,
    currencyCode,
    data,
    displayName,
    mode,
    name: methodName,
    processor,
    riskLevel,
    status,
    transactionId,
    ...rest
  } = payment;

  return {
    ...rest,
    _id,
    amount: {
      amount,
      currencyCode,
    },
    billingAddress: address,
    captureErrorMessage,
    cardBrand,
    createdAt,
    currencyCode,
    data,
    displayName,
    isAuthorizationCanceled: mode === "cancel",
    isCaptured: mode === "captured",
    method: {
      displayName,
      name: methodName,
    },
    mode,
    processor,
    riskLevel,
    status,
    transactionId,
  };
}

async function payments(context, order) {
  if (Array.isArray(order.payments)) {
    return order.payments.map(async (payment) => {
      const xformPayment = xformOrderPayment(payment);

      const refunds = await context.queries.refundsByPaymentId(
        context,
        {
          orderId: order._id,
          paymentId: payment._id,
          shopId: order.shopId,
          token: order.token || null,
        },
        order
      );

      if (Array.isArray(refunds)) {
        xformPayment.refunds = refunds;
      }

      return xformPayment;
    });
  }

  return null;
}

module.exports = {
  payments: (node, _, context) => payments(context, node),
};
