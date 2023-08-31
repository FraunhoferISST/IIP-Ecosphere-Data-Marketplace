export const review = (gql) => gql`
  fragment ReviewCommon on Review {
    _id
    attributedAccountId
    attributedProductId
    attributedProductId
    createdAt
    reviewBody
    reviewRating
    account {
      _id
      name
      firstName
      lastName
      picture
    }
  }
`;
