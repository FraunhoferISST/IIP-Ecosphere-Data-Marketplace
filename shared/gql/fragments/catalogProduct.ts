import { catalogVariant } from "./catalogVariant";
import { shop } from "./shop";

export const catalogProduct = (gql) => gql`
    fragment ProductCommon on CatalogProduct {
        _id
        shop {
            ...ShopCommon
        }
        isVisible
        isSoldOut
        title
        description
        metaDescription
        minOrderQuantity
        productId
        productType
        sku
        supportedFulfillmentTypes
        slug
        isLowQuantity
        originCountry
        vendor
        dataClassification
        themes
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
        owners
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
        metafields {
            description
            value
            namespace
            valueType
            key
            scope
        }
        variants {
            variantId
            ...VariantCommon
        }
        reviewsTotalCount
        avgRating
        images
    }
    ${catalogVariant(gql)}
    ${shop(gql)}
`;
