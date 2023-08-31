import { gql } from "graphql-tag";
import { order } from "../../../../shared/gql/fragments/order";

export default gql`
  mutation approveOrderPayments(
    $shopId: ID!
    $orderId: ID!
    $paymentIds: [ID]!
  ) {
    approveOrderPayments(
      input: { shopId: $shopId, orderId: $orderId, paymentIds: $paymentIds }
    ) {
      order {
        ...OrderCommon
      }
    }
  }
  ${order(gql)}
`;
