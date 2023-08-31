import { variant } from "./variant";
import { shop } from "./shop";

export const product = (gql) => gql`
    fragment ProductCommon on Product {
        _id
        shop {
            ...ShopCommon
        }
        publishedProductHash
        isVisible
        isDeleted
        title
        description
        metaDescription
        productType
        supportedFulfillmentTypes
        slug
        originCountry
        vendor
        owners
        dataClassification
        themes
        isPrivate
        accessMode
        accessAccounts
        metafields {
            description
            value
            namespace
            valueType
            key
            scope
        }
        tags {
            nodes {
                _id
                displayTitle
            }
            pageInfo {
                hasNextPage
                hasPreviousPage
                endCursor
                startCursor
            }
        }
        pricing {
            maxPrice
            minPrice
            price
            displayPrice
            compareAtPrice {
                amount
                displayAmount
            }
        }
        variants {
            isVisible
            isDeleted
            ...VariantCommon
        }
        images
    }
    ${variant(gql)}
    ${shop(gql)}
`;
