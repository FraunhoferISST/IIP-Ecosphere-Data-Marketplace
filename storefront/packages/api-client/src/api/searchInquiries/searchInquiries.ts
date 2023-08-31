import query from "./searchInquiriesQuery";
import type { InquiriesSearchResult, InquirySearchQuery } from "../../../../../../shared/types";

const prepareResponse = ({ data: { searchInquiries } }): InquiriesSearchResult =>
  searchInquiries;

export const searchInquiries = (context: Record<any, any>, searchQuery: InquirySearchQuery): Promise<InquiriesSearchResult> => {
  return context.client
    .query({
      query,
      variables: {
        searchQuery,
        shopIds: [context.config.state.getShopId()],
      },
    })
    .then((response) => prepareResponse(response));
};
