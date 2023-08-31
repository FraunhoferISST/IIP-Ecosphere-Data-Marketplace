import gql from "graphql-tag";
import { fieldsTemplate } from "../../../../shared/gql/fragments/fieldsTemplate";

export default gql`
  query fieldsTemplates {
    fieldsTemplates {
      templates {
        ...FieldsTemplateCommon
      }
    }
  }
  ${fieldsTemplate(gql)}
`;
