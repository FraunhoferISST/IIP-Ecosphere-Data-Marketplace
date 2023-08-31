import {gql} from "@apollo/client/core";

export default gql`
    mutation setCartPaymentMethod($paymentMethod: CartPaymentMethodInput!, $cartId: ID!, $shopId: ID!){
        setCartPaymentMethod(
            input: {
                paymentMethod: $paymentMethod
                cartId: $cartId
                shopId: $shopId
            }
        ) {
            name
            displayName
            pluginName
        }
    }`;
