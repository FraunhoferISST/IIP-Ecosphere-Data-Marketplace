export const fieldsTemplate = (gql) => gql`
    fragment FieldsTemplateCommon on FieldsTemplate {
        id
        title
        description
        priority
        fields {
            type
            attributeName
            title
            enum
            description
            fullWidth
            multiple
        }
    }
`;
