import { gql } from "graphql-tag";
import { account } from "../../../../shared/gql/fragments/account";

export default gql`
  mutation updateAccount($input: UpdateAccountInput!) {
    updateAccount(input: $input) {
      account {
        ...AccountCommon
      }
    }
  }
  ${account(gql)}
`;
