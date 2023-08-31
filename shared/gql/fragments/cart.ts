import { account } from "./account";

export const cart= (gql) => gql`
  fragment CartCommon on Cart {
    _id
    createdAt
    expiresAt
    email
    referenceId
    totalItemQuantity
    updatedAt
    taxSummary {
      calculatedAt
      calculatedByTaxServiceName
      referenceId
    }
    surcharges {
      amount {
        amount
        displayAmount
      }
    }
    account {
      ...AccountCommon
    }
    paymentMethod {
      name
      displayName
      pluginName
    }
    checkout {
      fulfillmentGroups {
        _id
        type
        shippingAddress {
          _id
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
        data {
          shippingAddress {
            address1
            _id
          }
        }
        availableFulfillmentOptions {
          fulfillmentMethod {
            _id
            displayName
            name
            group
            carrier
            fulfillmentTypes
          }
          handlingPrice {
            amount
            currency {
              code
              symbol
            }
            displayAmount
          }
          price {
            amount
            displayAmount
            currency {
              _id
              symbol
              code
            }
          }
        }
        selectedFulfillmentOption {
          fulfillmentMethod {
            _id
            displayName
            name
            group
            carrier
            fulfillmentTypes
          }
          handlingPrice {
            amount
            displayAmount
            currency {
              code
              symbol
            }
            displayAmount
          }
          price {
            amount
            displayAmount
            currency {
              _id
              code
              symbol
            }
          }
        }
      }
      summary {
        total {
          amount
          displayAmount
          currency {
            code
            symbol
          }
        }
        fulfillmentTotal {
          amount
          displayAmount
          currency {
            code
            symbol
          }
        }
        itemTotal {
          amount
          displayAmount
          currency {
            code
            symbol
          }
        }
        effectiveTaxRate {
            amount
            displayPercent
            percent
        }
        taxableAmount {
          displayAmount
          currency {
            code
            symbol
          }
        }
        taxTotal {
          amount
          displayAmount
          currency {
            code
            symbol
          }
        }
        discountTotal {
          amount
          displayAmount
          currency {
            code
            symbol
          }
        }
      }
    }
    items {
      nodes {
        _id
        title
        quantity
        isSoldOut
        isTaxable
        isLowQuantity
        isBackorder
        addedAt
        createdAt
        optionTitle
        productSlug
        productType
        title
        variantTitle
        taxCode
        attributes {
          label
          value
        }
        productConfiguration {
          productId
          productVariantId
        }
        subtotal {
          amount
          displayAmount
        }
        tax {
          amount
          displayAmount
        }
        taxableAmount {
          displayAmount
          currency {
            code
            symbol
          }
        }
        taxes {
          _id
          jurisdictionId
          sourcing
          taxName
          taxRate {
            amount
            displayPercent
            percent
          }
          tax {
            amount
            displayAmount
            currency {
              code
              symbol
            }
          }
          taxableAmount {
            displayAmount
            currency {
              code
              symbol
            }
          }
        }
        createdAt
        compareAtPrice {
          amount
          displayAmount
        }
        price {
          displayAmount
          amount
        }
      }
    }
  }
  ${account(gql)}
`;
