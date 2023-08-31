import { gql } from "graphql-tag";
import { account } from "../../../../shared/gql/fragments/account";

export default gql`
  query account($id: ID!) {
    account(id: $id) {
      ...AccountCommon
    }
  }
  ${account(gql)}
`;
