export const account = (gql) => gql`
  fragment AccountMinimal on Account {
    _id
    username
    picture
    firstName
    lastName
    language
    name
    primaryEmailAddress
  }
`;
