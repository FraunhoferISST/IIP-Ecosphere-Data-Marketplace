import getPrimaryShopQuery from "~/server/graphql/getPrimaryShop/query";
import type { Shop } from "~/types";

const prepareResponse = ({ data: { primaryShop } }): Shop => ({
  ...primaryShop,
  tags: primaryShop.tags.nodes.map(({ node: { tag } }) => tag),
});

export const getPrimaryShop = (event): Promise<Shop> => {
  return event.context.apiClient
    .query({
      query: getPrimaryShopQuery,
      variables: {},
    })
    .then((response) => {
      if (response?.data?.primaryShop) {
        return prepareResponse(response);
      }
      return null;
    });
};
