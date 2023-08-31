import { gql } from "@apollo/client/core/core.cjs";

export default gql`
  query paymentMethods($shopId: ID!) {
    paymentMethods(shopId: $shopId) {
      isEnabled
      name
      displayName
      pluginName
      data {
        __typename
      }
    }
  }
`;
