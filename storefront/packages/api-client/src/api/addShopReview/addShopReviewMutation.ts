import { gql } from "graphql-tag";
import { review } from "../../../../../../shared/gql/fragments/review";

export default gql`
  mutation addShopReview(
    $input: ShopReviewInput!
  ) {
    addShopReview(
      input: $input
    ) {
        ...ReviewCommon
    }
  }
  ${review(gql)}
`;
