import { gql } from "@apollo/client/core";

export default gql`
  mutation updateAccount(
    $accountId: ID!
    $note: String
    $name: String
    $username: String
    $firstName: String!
    $lastName: String!
    $bio: String
    $picture: String
    $language: String
  ) {
    updateAccount(
      input: {
        accountId: $accountId
        note: $note
        bio: $bio
        name: $name
        language: $language
        username: $username
        lastName: $lastName
        firstName: $firstName
        picture: $picture
      }
    ) {
      account {
        _id
        firstName
        language
        lastName
        bio
        createdAt
        picture
        preferences
        name
        note
        primaryEmailAddress
        updatedAt
        userId
        username
        emailRecords {
          address
          provides
          verified
        }
        groups(offset: 1000) {
          nodes {
            _id
            description
            name
            slug
            updatedAt
            createdAt
            createdBy {
              _id
              userId
              name
              username
              primaryEmailAddress
              picture
            }
            permissions
          }
        }
        adminUIShops {
          _id
          name
        }
      }
    }
  }
`;
