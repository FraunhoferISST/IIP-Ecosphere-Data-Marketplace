import { gql } from "graphql-tag";
import { account } from "../../../../shared/gql/fragments/account";

export default gql`
  query accounts {
    accounts(sortBy: updatedAt, sortOrder: desc) {
      nodes {
        ...AccountCommon
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        endCursor
        startCursor
      }
      totalCount
    }
  }
  ${account(gql)}
`;
