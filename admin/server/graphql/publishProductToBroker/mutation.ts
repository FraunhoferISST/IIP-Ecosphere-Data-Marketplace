import { gql } from "@apollo/client/core/core.cjs";

export default gql`
  mutation publishProductsToBroker($productId: ID!) {
    publishProductsToBroker(productId: $productId) {
      _id
    }
  }
`;
