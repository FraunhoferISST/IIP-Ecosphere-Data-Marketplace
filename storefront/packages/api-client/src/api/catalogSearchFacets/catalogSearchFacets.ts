import query from "./query";

const prepareResponse = ({ data: { catalogSearchFacets: { facets } }}) => facets;

export const catalogSearchFacets = async (context: Record<any, any>): Promise<object> =>
  context.client.query({
    query: query,
    variables: {
      shopIds: [context.config.state.getShopId()],
    },
  })
    .then(response => prepareResponse(response));

