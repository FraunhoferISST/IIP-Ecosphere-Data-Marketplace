import { gql } from "graphql-tag";
import { fulfillment } from "../../../../shared/gql/fragments/fulfillment";

export default gql`
  query orderFulfillment($shopId: ID!, $orderId: ID!) {
    orderFulfillment(shopId: $shopId, orderId: $orderId) {
      fulfillment {
        ...FulfillmentCommon
      }
    }
  }
  ${fulfillment(gql)}
`;
