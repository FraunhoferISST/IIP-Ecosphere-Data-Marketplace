import {gql} from "@apollo/client/core";

export default gql`
    query availablePaymentMethods($shopId: ID!) {
        availablePaymentMethods(shopId: $shopId) {
            isEnabled
            name
            displayName
            pluginName
            data {
                __typename
            }
        }
    }
`;

