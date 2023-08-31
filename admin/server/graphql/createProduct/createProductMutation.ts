import { gql } from "@apollo/client/core/core.cjs";

export default gql`
  mutation createProduct($product: ProductInput, $shopId: ID!) {
    createProduct(
      input: {
        shopId: $shopId
        shouldCreateFirstVariant: false
        product: $product
      }
    ) {
      clientMutationId
      product {
        _id
        title
      }
    }
  }
`;
