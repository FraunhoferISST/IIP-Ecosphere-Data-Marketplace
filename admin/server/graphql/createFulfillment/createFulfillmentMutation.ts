import { gql } from "@apollo/client/core/core.cjs";

export default gql`
  mutation createDigitalFulfillmentMethod($shopId: ID!) {
    createDigitalFulfillmentMethod(
      input: {
        shopId: $shopId
        method: {
          cost: 0
          fulfillmentTypes: [digital]
          group: "Free"
          handling: 0
          isEnabled: true
          label: "Digital distribution"
          name: "Digital distribution"
          rate: 0
        }
      }
    ) {
      method {
        _id
        group
        label
        name
        handling
        rate
        cost
        fulfillmentTypes
      }
    }
  }
`;
