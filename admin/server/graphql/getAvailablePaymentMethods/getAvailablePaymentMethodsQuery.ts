import { gql } from "@apollo/client/core/core.cjs";

export default gql`
  query availablePaymentMethods($shopId: ID!) {
    availablePaymentMethods(shopId: $shopId) {
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
