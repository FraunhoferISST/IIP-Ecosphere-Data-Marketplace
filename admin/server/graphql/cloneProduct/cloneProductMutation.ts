import { gql } from "@apollo/client/core/core.cjs";

export default gql`
  mutation cloneProducts($productIds: [ID]!, $shopId: ID!) {
    cloneProducts(input: { shopId: $shopId, productIds: $productIds }) {
      products {
        _id
        title
        description
        variants {
          _id
          title
          attributeLabel
          optionTitle
        }
      }
    }
  }
`;
