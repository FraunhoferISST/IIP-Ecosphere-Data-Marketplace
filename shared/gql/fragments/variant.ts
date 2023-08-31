import { distribution } from "./distribution";
import { fieldsTemplate } from "./fieldsTemplate";

export const variant = (gql) => gql`
    fragment VariantCommon on ProductVariant {
        _id
        title
        taxDescription
        isTaxable
        taxCode
        minOrderQuantity
        sku
        attributeLabel
        barcode
        createdAt
        updatedAt
        index
        minOrderQuantity
        optionTitle
        originCountry
        versionNotes
        versionInfo
        updateCycle
        assetType
        metafields {
            description
            value
            namespace
            valueType
            key
            scope
        }
        pricing {
            compareAtPrice {
                amount
                displayAmount
            }
            price
            maxPrice
            displayPrice
            minPrice
        }
        distributions {
            ...DistributionCommon
        }
        dataQuality {
            completeness
            accuracy
            completeness
        }
        priceModel {
            type
            timeRange {
                from
                to
            }
            paymentPeriod
            quantity
            volume
        }
        templates {
            ...FieldsTemplateCommon
        }
        templatesFields
        images
    }
    ${distribution(gql)}
    ${fieldsTemplate(gql)}
`;
