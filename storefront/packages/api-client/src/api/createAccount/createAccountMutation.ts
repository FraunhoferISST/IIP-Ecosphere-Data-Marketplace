import {gql} from "@apollo/client/core";

export default gql`
    mutation createAccount ($userId: ID!, $emails: [Object], $name: String, $username: String, $shopId: ID, $picture: String){
        createAccount(
            input: { shopId: $shopid, userId: $userId, emails: $emails, name: $name, username: $username, picture: $picture }
        ) {
            account {
                _id
                name
                state
                shopId
                groups
                emails {
                    address
                }
                createdAt
                userId
                updatedAt
            }
        }
    }`;
