import {gql} from "@apollo/client/core";

export default gql`
    mutation register ($email: String, $password: String){
        createUser(user: { email: $email, password: $password }) {
            userId
            loginResult {
                tokens {
                    refreshToken
                    accessToken
                }
                user {
                    id
                    username
                    emails {
                        address
                        provides
                    }
                }
            }
        }
    }`;
