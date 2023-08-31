import {gql} from "@apollo/client/core";

export default gql`
    mutation login ($email: String, $password: String){
        authenticate(
            serviceName: "password",
            params: {
                user: {
                    email: $email,
                },
                password: $password
            }
        )
        {
            tokens {
                refreshToken
                accessToken
            }
            user {
                id
                emails {
                    address
                    verified
                    provides
                }
                username
            }
        }
    }`;
