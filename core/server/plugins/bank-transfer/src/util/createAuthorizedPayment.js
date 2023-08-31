const Random = require("@reactioncommerce/random");

const METHOD = "credit";
const PACKAGE_NAME = "bank-transfer";
const PAYMENT_METHOD_NAME = "bank_transfer";

const PROCESSOR = "bank-transfer";

module.exports = async (context, input) => {
  const {
    amount,
    billingAddress,
    shopId,
    paymentData: { fullName },
  } = input;

  return {
    _id: Random.id(),
    address: billingAddress,
    amount,
    createdAt: new Date(),
    data: {
      fullName,
    },
    displayName: "Bank transfer",
    method: METHOD,
    mode: "authorize",
    name: PAYMENT_METHOD_NAME,
    paymentPluginName: PACKAGE_NAME,
    processor: PROCESSOR,
    riskLevel: "normal",
    shopId,
    status: "created",
    transactionId: Random.id(),
    transactions: [],
  };
};
