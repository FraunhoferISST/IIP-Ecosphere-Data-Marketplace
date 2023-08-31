import createShopMutation from "~/server/graphql/createShop/createShopMutation";
import { Shop } from "~/types";

const prepareResponse = ({
  data: {
    createShop: { shop },
  },
}): Shop => ({
  ...shop,
  tags: shop.tags.nodes.map(({ node: { tag } }) => tag),
});

export const createShop = async (event, body): Promise<Shop> => {
  return event.context.apiClient
    .mutate({
      mutation: createShopMutation,
      variables: body,
    })
    .then((response) => prepareResponse(response));
};
