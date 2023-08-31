import { gql } from "graphql-tag";
import { group } from "../../../../shared/gql/fragments/group";

export default gql`
  query groups($shopId: ID!) {
    accountsGroups(shopId: $shopId) {
      ...GroupCommon
    }
  }
  ${group(gql)}
`;
