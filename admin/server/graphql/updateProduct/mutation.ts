import { gql } from "graphql-tag";

export default gql`
  mutation updateProduct($input: UpdateProductInput!) {
    updateProduct(input: $input) {
      product {
        title
        _id
      }
    }
  }
`;
