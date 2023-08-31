import { gql } from "graphql-tag";

export default gql`
  query account {
    viewer {
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
      addressBook {
        nodes {
          _id
          address1
        }
      }
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
  }
`;
