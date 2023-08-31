import gql from "graphql-tag";
import { order } from "~/server/graphql/fragments/order";

export default gql`
  mutation updateOrderFulfillmentGroup(
    $orderFulfillmentGroupId: ID!
    $orderId: ID!
    $status: String
  ) {
    updateOrderFulfillmentGroup(
      input: {
        orderId: $orderId
        orderFulfillmentGroupId: $orderFulfillmentGroupId
        status: $status
      }
    ) {
      order {
        ...OrderCommon
      }
    }
  }
  ${order}
`;
