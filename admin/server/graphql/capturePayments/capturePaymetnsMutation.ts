import { gql } from "graphql-tag";
import { order } from "../../../../shared/gql/fragments/order";

export default gql`
  mutation captureOrderPayments(
    $shopId: ID!
    $orderId: ID!
    $paymentIds: [ID]!
  ) {
    captureOrderPayments(
      input: { shopId: $shopId, orderId: $orderId, paymentIds: $paymentIds }
    ) {
      order {
        ...OrderCommon
      }
    }
  }
  ${order(gql)}
`;
