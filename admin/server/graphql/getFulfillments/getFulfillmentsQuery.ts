import { gql } from "graphql-tag";

export default gql`
  query digitalFulfillmentMethods($shopId: ID!) {
    digitalFulfillmentMethods(shopId: $shopId) {
      methods {
        _id
        group
        label
        name
        handling
        isEnabled
        rate
        cost
        fulfillmentTypes
      }
    }
  }
`;
