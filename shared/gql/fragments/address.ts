export const address = (gql) => gql`
    fragment AddressCommon on Address {
        address1
        address2
        city
        company
        country
        firstName
        lastName
        fullName
        isCommercial
        isBillingDefault
        isShippingDefault
        phone
        postal
        region
        company
    }
`;
