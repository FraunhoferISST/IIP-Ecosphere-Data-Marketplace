import gql from "graphql-tag";

export default gql`
  mutation createProductVariant(
    $variant: ProductVariantInput
    $shopId: ID!
    $productId: ID!
  ) {
    createProductVariant(
      input: { productId: $productId, shopId: $shopId, variant: $variant }
    ) {
      variant {
        _id
        title
      }
    }
  }
`;
