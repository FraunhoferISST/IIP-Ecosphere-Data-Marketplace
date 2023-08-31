import query from "~/server/graphql/getInquiries/query";
import type { InquiriesSearchResult } from "../../../../shared/types";

const prepareResponse = ({
  data: {
    searchInquiries: { items, count, cursor },
  },
}): InquiriesSearchResult => ({
  items,
  count,
  cursor,
});

export const getInquiries = (event, body): Promise<InquiriesSearchResult> => {
  return event.context.apiClient
    .query({
      query,
      variables: {
        searchQuery: body,
        shopIds: [event.context.cookies.shopId],
      },
    })
    .then((response) => prepareResponse(response));
};
