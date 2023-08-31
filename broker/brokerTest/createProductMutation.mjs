import gql from "graphql-tag";

export default gql`
  mutation createProduct(
    $product: ProductInput
    $shopId: ID!
    $shouldCreateFirstVariant: Boolean = false
  ) {
    createProduct(
      input: {
        shopId: $shopId
        shouldCreateFirstVariant: $shouldCreateFirstVariant
        product: $product
      }
    ) {
      clientMutationId
      product {
        _id
        title
        variants {
          _id
        }
      }
    }
  }
`;
