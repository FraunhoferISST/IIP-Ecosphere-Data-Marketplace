import {gql} from "@apollo/client/core";

export default gql`
    mutation placeOrder(
        $payments: [PaymentInput], 
        $cartId: String!, 
        $shopId: String!, 
        $email: String!, 
        $currencyCode: String!, 
        $fulfillmentGroups: [OrderFulfillmentGroupInput]!
    ){
        placeOrder(
            input: {
                order: {
                    cartId: $cartId
                    shopId: $shopId
                    email: $email
                    currencyCode: $currencyCode
                    fulfillmentGroups: $fulfillmentGroups
                }
                payments: $payments
            }
        ) {
            orders {
                _id
                cartId
                totalItemQuantity
                account {
                    _id
                }
                billingName
                updatedAt
                createdAt
                displayStatus(language: "en")
                email
                referenceId
                fulfillmentGroups {
                    _id
                    data {
                        __typename
                    }
                    type
                    tracking
                    totalItemQuantity
                    selectedFulfillmentOption {
                        fulfillmentMethod {
                            _id
                            carrier
                            name
                            displayName
                            group
                        }
                        price {
                            amount
                            displayAmount
                            currency {
                                _id
                                code
                            }
                        }
                        handlingPrice {
                            amount
                            displayAmount
                            currency {
                                _id
                                code
                            }
                        }
                    }
                    status
                    summary {
                        discountTotal {
                            amount
                            displayAmount
                            currency {
                                code
                            }
                        }
                        total {
                            amount
                            displayAmount
                            currency {
                                code
                            }
                        }
                        fulfillmentTotal {
                            amount
                            displayAmount
                            currency {
                                code
                            }
                        }
                    }
                    trackingUrl
                    type
                }
                payments {
                    _id
                    amount {
                        displayAmount
                        amount
                        currency {
                            code
                            decimal
                        }
                    }
                    billingAddress {
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
                }
                summary {
                    discountTotal {
                        amount
                        displayAmount
                        currency {
                            code
                        }
                    }
                    total {
                        amount
                        displayAmount
                        currency {
                            code
                        }
                    }
                    itemTotal {
                        amount
                        displayAmount
                        currency {
                            code
                        }
                    }
                    taxTotal {
                        amount
                        displayAmount
                        currency {
                            code
                        }
                    }
                }
                refunds {
                    _id
                    createdAt
                    paymentId
                    paymentDisplayName
                    reason
                    amount {
                        amount
                        displayAmount
                        currency {
                            code
                        }
                    }
                }
                shop {
                    _id
                }
            }
        }
    }`;
