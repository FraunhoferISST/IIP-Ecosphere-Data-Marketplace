import {gql} from "@apollo/client/core";
import { shop } from "../../../../../../shared/gql/fragments/shop";

export default gql`
    query primaryShop {
        primaryShop {
            ...ShopCommon
        }
    }
    ${shop(gql)}
`;
