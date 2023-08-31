import gql from "graphql-tag";
import { order } from "../../../../shared/gql/fragments/order";

export default gql`
  mutation updateOrder($orderId: ID!, $status: String) {
    updateOrder(input: { orderId: $orderId, status: $status }) {
      order {
        ...OrderCommon
      }
    }
  }
  ${order(gql)}
`;
