import { gql } from "@apollo/client/core";

export default gql`
  mutation addAccountAddressBookEntry(
    $address: AddressInput!
    $accountId: ID!
  ) {
    addAccountAddressBookEntry(
      input: {
        address: $address
        accountId: $accountId
      }
    ) {
      address {
        _id
        address1
        address2
        city
        company
        country
        firstName
        lastName
        fullName
        isBillingDefault
        isShippingDefault
        phone
        postal
        region
        company
      }
    }
  }
`;
