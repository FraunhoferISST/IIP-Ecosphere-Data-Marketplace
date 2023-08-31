import {gql} from "@apollo/client/core";
import { cart } from "../../../../../../shared/gql/fragments/cart";

export default gql`
    mutation setShippingAddressOnCart($addressId: String, $address: AddressInput!, $cartId: ID!){
        setShippingAddressOnCart(
            input: {
                addressId: $addressId
                address: $address,
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
