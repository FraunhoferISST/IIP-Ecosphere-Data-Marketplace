import gql from "graphql-tag";

export default gql`
  mutation createInquiry(
    $accountId: ID!
    $shopId: ID!
    $inquiry: InquiryInput!
  ) {
    createInquiry(
      shopId: $shopId
      accountId: $accountId
      inquiry: $inquiry
    ) {
      _id
    }
  }
`;
