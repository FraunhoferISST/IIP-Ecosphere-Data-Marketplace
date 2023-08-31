import updateProductVariantMutation from "~/server/graphql/updateProductVariant/updateProductVariantMutation";
import { updateProductVariantPrices } from "~/server/graphql/updateProductVariantPrices/updateProductVariantPrices";

export const updateProductVariant = (
  event,
  { createdAt, updatedAt, pricing, variantId, ...rest }
) => {
  return event.context.apiClient
    .mutate({
      mutation: updateProductVariantMutation,
      variables: {
        variant: rest,
        variantId: variantId,
        shopId: event.context.cookies.shopId,
      },
    })
    .then(
      async ({
        data: {
          updateProductVariant: { variant },
        },
      }) => {
        if (pricing) {
          await updateProductVariantPrices(event, {
            ...rest,
            compareAtPrice: pricing.compareAtPrice?.amount,
            price: pricing.price,
            variantId: variantId,
            shopId: event.context.cookies.shopId,
          });
        }
        return variant;
      }
    );
};
