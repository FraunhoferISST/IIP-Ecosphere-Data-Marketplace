import gql from "graphql-tag";

export default gql`
    query accountOrderFulfillment($accountId: ID!, $shopId: ID!, $orderReferenceId: ID!) {
        accountOrderFulfillment(accountId: $accountId, shopId: $shopId, orderReferenceId: $orderReferenceId) {
            fulfillment {
                variantId
                variantTitle
                productId
                quantity
                distributionsGroups {
                    title
                    distributions {
                        type
                        user
                        accessUrl
                        password
                        volume
                        format
                        encryption
                        title
                        format
                        mimeType
                        modifiedAt
                    }
                }
            }
        }
    }
`;
