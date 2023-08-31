import { gql } from "graphql-tag";

export default gql`
  mutation updateProductVariant(
    $shopId: ID!
    $variantId: ID!
    $variant: ProductVariantInput!
  ) {
    updateProductVariant(
      input: { variantId: $variantId, shopId: $shopId, variant: $variant }
    ) {
      variant {
        _id
        title
      }
    }
  }
`;
