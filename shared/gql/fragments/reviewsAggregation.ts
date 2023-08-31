export const reviewsAggregation = (gql) => gql`
  fragment ReviewsAggregationCommon on ReviewsAggregation {
    averageRating
    totalCount
    counts {
      rating
      count
    }
  }
`;
