import { gql } from "@apollo/client/core/core.cjs";

export default gql`
  mutation enablePaymentMethodForShop(
    $shopId: ID!
    $paymentMethodName: String!
    $isEnabled: Boolean!
  ) {
    enablePaymentMethodForShop(
      input: {
        shopId: $shopId
        paymentMethodName: $paymentMethodName
        isEnabled: $isEnabled
      }
    ) {
      paymentMethods {
        canRefund
        isEnabled
        displayName
        name
        pluginName
      }
    }
  }
`;
