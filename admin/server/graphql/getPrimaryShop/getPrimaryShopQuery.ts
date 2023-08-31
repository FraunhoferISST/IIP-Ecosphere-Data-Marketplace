import { gql } from "graphql-tag";
import { shop } from "../../../../shared/gql/fragments/shop";

export default gql`
  query primaryShop {
    primaryShop {
      ...ShopCommon
    }
  }
  ${shop(gql)}
`;
