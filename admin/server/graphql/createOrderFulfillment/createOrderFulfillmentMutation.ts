import gql from "graphql-tag";
import { fulfillment } from "../../../../shared/gql/fragments/fulfillment";

export default gql`
  mutation createOrderFulfillment(
    $orderId: ID!
    $shopId: ID!
    $fulfillment: [OrderFulfilmentOptionInput]!
  ) {
    createOrderFulfillment(
      input: { orderId: $orderId, shopId: $shopId, fulfillment: $fulfillment }
    ) {
      fulfillment {
        ...FulfillmentCommon
      }
    }
  }
  ${fulfillment(gql)}
`;
