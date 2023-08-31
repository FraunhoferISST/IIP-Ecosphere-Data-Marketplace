export const account = (gql) => gql`
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
    groups(offset: 1000) {
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
