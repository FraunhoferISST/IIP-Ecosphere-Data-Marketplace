export const productPricing = (gql) => gql`
    fragment ProductPricingCommon on ProductPricingInfo {
        compareAtPrice {
            amount
            displayAmount
            currency {
                code
                format
                decimal
                scale
                rate
                symbol
                thousand
            }
        }
        currency {
            code
            format
            decimal
            scale
            rate
            symbol
            thousand
        }
        price
        maxPrice
        displayPrice
        minPrice
    }
`;
