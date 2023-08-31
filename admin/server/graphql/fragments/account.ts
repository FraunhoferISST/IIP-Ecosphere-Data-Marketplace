import gql from "graphql-tag";

export const account = gql`
  fragment AccountCommon on Account {
    _id
    userId
    username
    picture
    createdAt
    firstName
    lastName
    language
    name
    note
    bio
    preferences
    primaryEmailAddress
    updatedAt
    adminUIShops {
      _id
      name
    }
    metafields {
      value
      key
      scope
      valueType
      description
      namespace
    }
    emailRecords {
      address
      verified
      provides
    }
    groups {
      nodes {
        _id
        name
        description
        updatedAt
        createdAt
        createdBy {
          _id
          userId
          username
        }
        description
        permissions
      }
    }
  }
`;
