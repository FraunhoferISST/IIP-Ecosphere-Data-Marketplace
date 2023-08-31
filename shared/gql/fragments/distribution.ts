export const distribution = (gql) => gql`
    fragment DistributionCommon on Distribution {
        title
        encryption
        format
        type
        volume
        size
        mimeType
        createdAt
        language
        description
        metafields {
            value
            key
            scope
            valueType
            description
            namespace
        }
    }
`;
