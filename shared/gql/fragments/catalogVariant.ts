import { distribution } from "./distribution";
import { productPricing } from "./productPricing";
import { fieldsTemplate } from "./fieldsTemplate";

export const catalogVariant = (gql) => gql`
    fragment VariantCommon on CatalogProductVariant {
        _id
        variantId
        title
        taxDescription
        isTaxable
        isSoldOut
        isLowQuantity
        taxCode
        taxDescription
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
        versionInfo
        versionNotes
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
            ...ProductPricingCommon
        }
        templates {
            ...FieldsTemplateCommon
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
        templatesFields
        images
    }
    ${distribution(gql)}
    ${fieldsTemplate(gql)}
    ${productPricing(gql)}
`;
