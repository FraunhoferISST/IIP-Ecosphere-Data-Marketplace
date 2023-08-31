import { gql } from "graphql-tag";
import { review } from "../../../../../../shared/gql/fragments/review";

export default gql`
  mutation addProductReview(
    $input: ProductReviewInput!
  ) {
    addProductReview(
      input: $input
    ) {
        ...ReviewCommon
    }
  }
  ${review(gql)}
`;
