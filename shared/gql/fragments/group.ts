export const group = (gql) => gql`
  fragment GroupCommon on Group {
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
`;
