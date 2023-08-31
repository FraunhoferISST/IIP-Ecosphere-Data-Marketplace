export const fulfillment = (gql) => gql`
    fragment FulfillmentCommon on OrderFulfilmentOption {
        productId
        variantId
        variantTitle
        quantity
        distributionsGroups {
            title
            distributions {
                title
                user
                password
                accessUrl
                encryption
                format
                type
                volume
                size
                mimeType
                createdAt
                language
                metafields {
                    value
                    key
                    scope
                    valueType
                    description
                    namespace
                }
            }
        }
    }
`;
