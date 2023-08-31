import query from "./query";

const prepareResponse = ({ data: { inquiriesSearchFacets: { facets } }}) => facets;

export const inquiriesSearchFacets = async (context: Record<any, any>): Promise<object> =>
  context.client.query({
    query: query,
    variables: {
      shopIds: [context.config.state.getShopId()],
    },
  })
    .then(response => prepareResponse(response));

