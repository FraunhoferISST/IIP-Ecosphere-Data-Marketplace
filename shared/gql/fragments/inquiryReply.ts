export const inquiryReply = (gql) => gql`
    fragment InquiryReplyCommon on InquiryReply {
        _id
        message
        accepted
        rejected
        createdAt
        updatedAt
        account {
            ...AccountMinimal
        }
        offers {
            variant {
                _id
                variantId
                title
            }
            product {
                ...ProductCommon
            }
        }
    }
`;
