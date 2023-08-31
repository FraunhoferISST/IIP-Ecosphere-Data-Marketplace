import getPrimaryShopQuery from "./getPrimaryShopQuery";
import type {Context, Shop} from "../../types";

const prepareResponse = ({ data: { primaryShop }}): Shop => ({
  ...primaryShop,
  tags: primaryShop.tags.nodes.map(({ node: { tag } }) => tag),
});

export const getPrimaryShop = async (context: Context): Promise<Shop> =>
  context.client.query({
    query: getPrimaryShopQuery,
    variables: {},
  })
    .then(response => {
      if (response?.data?.primaryShop) {
        const shop = prepareResponse(response);
        context.config.state.setShopId(shop._id);
        return shop;
      }
      context.config.state.setShopId(null);
      return null;
    });

