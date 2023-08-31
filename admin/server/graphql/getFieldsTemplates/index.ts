import query from "~/server/graphql/getFieldsTemplates/query";
import type { InquiriesSearchResult } from "../../../../shared/types";

const prepareResponse = ({
  data: {
    fieldsTemplates: { templates },
  },
}): InquiriesSearchResult => templates;

export const getFieldsTemplates = (event): Promise<InquiriesSearchResult> => {
  return event.context.apiClient
    .query({
      query,
      variables: {
        shopIds: [event.context.cookies.shopId],
      },
    })
    .then((response) => prepareResponse(response));
};
