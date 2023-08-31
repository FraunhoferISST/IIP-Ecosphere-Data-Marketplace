import { useRequest } from "~/composables/useRequest";
import { ComputedRef } from "vue";
import type { UseAsyncState } from "~/types/composables";
import {
  Order,
  ApproveOrderPaymentsInput,
  OrderFulfilment,
  OrderFulfilmentOption,
} from "~/types";

type OrderPaymentsInput = Pick<
  ApproveOrderPaymentsInput,
  "paymentIds" | "orderId"
>;
type UpdateFulfillmentInput = {
  orderId: string;
  orderFulfillmentGroupId: string;
  status?: string;
};

type CreateFulfillmentInput = {
  orderId: string;
  fulfillment: OrderFulfilmentOption[];
};

export interface UseOrdersComposable {
  order: ComputedRef<Order>;
  invoice: ComputedRef<string>;
  fulfillment: ComputedRef<OrderFulfilmentOption[]>;
  load: UseAsyncState<void, void>;
  update: UseAsyncState<{ status: string }, void>;
  approvePayments: UseAsyncState<OrderPaymentsInput, void>;
  capturePayments: UseAsyncState<OrderPaymentsInput, void>;
  createFulfillment: UseAsyncState<CreateFulfillmentInput, void>;
  loadFulfillment: UseAsyncState<void, void>;
  updateFulfillmentOptions: UseAsyncState<UpdateFulfillmentInput, void>;
  loadInvoice: UseAsyncState<{ languageCode?: string }, void>;
}

export const useOrder = (
  id: string,
  referenceId?: string
): UseOrdersComposable => {
  const { $api: api } = useNuxtApp();
  const order = ref<Order>(null);
  const fulfillment = ref<OrderFulfilmentOption[]>([]);
  const invoice = ref<string>("");

  const load = useRequest<void, void>(() =>
    api.handle("getOrder", { id }).then((loadedOrder: Order) => {
      order.value = loadedOrder;
    })
  );

  const update = useRequest<{ status: string }, void>(
    ({ status }: { status: string }) =>
      api
        .handle("updateOrder", { orderId: id, status })
        .then((updatedOrder: Order) => {
          order.value = updatedOrder;
        })
  );

  const approvePayments = useRequest<OrderPaymentsInput, void>(
    ({ paymentIds, orderId }: OrderPaymentsInput) =>
      api
        .handle("approvePayments", { orderId, paymentIds })
        .then((updatedOrder: Order) => (order.value = updatedOrder))
  );

  const capturePayments = useRequest<OrderPaymentsInput, void>(
    ({ paymentIds, orderId }: OrderPaymentsInput) =>
      api
        .handle("capturePayments", { orderId, paymentIds })
        .then((updatedOrder: Order) => (order.value = updatedOrder))
  );

  const createFulfillment = useRequest<CreateFulfillmentInput, void>(
    ({ fulfillment: newFulfillment, orderId }: CreateFulfillmentInput) =>
      api
        .handle("createOrderFulfillment", {
          orderId,
          fulfillment: newFulfillment,
        })
        .then(
          (createdFulfillment: OrderFulfilment) =>
            (fulfillment.value = createdFulfillment.fulfillment)
        )
  );

  const loadFulfillment = useRequest<void, void>(() =>
    api
      .handle("getOrderFulfillment", { orderId: id })
      .then(
        (loadedFulfillment: OrderFulfilment) =>
          (fulfillment.value = loadedFulfillment.fulfillment)
      )
  );

  const updateFulfillmentOptions = useRequest<UpdateFulfillmentInput, void>(
    ({ orderFulfillmentGroupId, orderId, status }: UpdateFulfillmentInput) =>
      api.handle("updateFulfillmentOptions", {
        orderId,
        status,
        orderFulfillmentGroupId,
      })
  );

  const loadInvoice = useRequest<{ languageCode?: string }, void>(
    ({ languageCode = "EN" }: { languageCode?: string }) =>
      api
        .handle("getOrderInvoice", {
          orderId: id,
          languageCode,
        })
        .then((generatedInvoice: string) => (invoice.value = generatedInvoice))
  );

  return {
    order: computed(() => order.value),
    invoice: computed(() => invoice.value),
    fulfillment: computed(() => fulfillment.value),
    load,
    update,
    approvePayments,
    capturePayments,
    updateFulfillmentOptions,
    loadFulfillment,
    createFulfillment,
    loadInvoice,
  };
};
