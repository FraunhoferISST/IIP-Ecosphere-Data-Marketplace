import {gql} from "@apollo/client/core";
import { cart } from "../../../../../../shared/gql/fragments/cart";

export default gql`
    mutation selectFulfillmentOptionForGroup($fulfillmentGroupId: ID!, $fulfillmentMethodId: ID!, $cartId: ID!){
        selectFulfillmentOptionForGroup(
            input: {
                fulfillmentGroupId: $fulfillmentGroupId,
                fulfillmentMethodId: $fulfillmentMethodId,
                cartId: $cartId
            }
        ) {
            cart {
                ...CartCommon
            }
        }
    }
    ${cart(gql)}
`;
