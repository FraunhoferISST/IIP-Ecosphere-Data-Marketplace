import { gql } from "graphql-tag";
import { shop } from "../../../../shared/gql/fragments/shop";

export default gql`
  mutation updateShop($input: UpdateShopInput!) {
    updateShop(input: $input) {
      shop {
        ...ShopCommon
      }
    }
  }
  ${shop(gql)}
`;
