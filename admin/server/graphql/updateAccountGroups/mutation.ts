import { gql } from "graphql-tag";
import { account } from "../../../../shared/gql/fragments/account";

export default gql`
  mutation updateGroupsForAccounts($input: UpdateGroupsForAccountsInput!) {
    updateGroupsForAccounts(input: $input) {
      accounts {
        ...AccountCommon
      }
    }
  }
  ${account(gql)}
`;
