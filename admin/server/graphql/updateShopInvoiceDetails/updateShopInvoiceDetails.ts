import updateShopInvoiceDetailsMutation from "~/server/graphql/updateShopInvoiceDetails/updateShopInvoiceDetailsMutation";
import type { Shop } from "~/types";

export const updateShopInvoiceDetails = (event, body): Promise<Shop> =>
  event.context.apiClient
    .mutate({
      mutation: updateShopInvoiceDetailsMutation,
      variables: {
        input: body,
        shopId: event.context.cookies.shopId,
      },
    })
    .then(({ data: { updateShopInvoiceDetails: shop } }): Shop => shop);
