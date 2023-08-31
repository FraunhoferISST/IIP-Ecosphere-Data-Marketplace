import {address} from "./address"
export const shop = (gql) => gql`
    fragment ShopCommon on Shop {
        _id
        name
        shopType
        description
        keywords
        language
        slug
        timezone
        allowGuestCheckout
        brandAssets {
            navbarBrandImage {
                original
            }
        }
        shopLogoUrls {
            primaryShopLogoUrl
        }
        emails {
            address
            provides
            verified
        }
        tags {
            nodes {
                _id
                name
                displayTitle
            }
        }
        currency {
            _id
            code
            rate
            format
            scale
            symbol
            thousand
            decimal
        }
        addressBook {
            ...AddressCommon   
        }
        invoiceDetails {
            bic
            iban
            taxIdentityNumber
            additionalInfo
        }
    }
    ${address(gql)}
`;
