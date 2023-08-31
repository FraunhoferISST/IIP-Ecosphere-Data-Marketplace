import { gql } from "graphql-tag";

export default gql`
  mutation updateProductVariantPrices(
    $shopId: ID!
    $variantId: ID!
    $compareAtPrice: Float
    $price: Float
  ) {
    updateProductVariantPrices(
      input: {
        variantId: $variantId
        shopId: $shopId
        prices: { compareAtPrice: $compareAtPrice, price: $price }
      }
    ) {
      variant {
        _id
        title
      }
    }
  }
`;
