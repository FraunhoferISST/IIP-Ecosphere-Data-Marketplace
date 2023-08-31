import { UserOrderGetters } from "@vue-storefront/core";
import type { Order, OrderItem } from "@vue-storefront/iiepmarket-api";

function getDate(order: Order): string {
  return order.createdAt;
}

function getId(order: Order): string {
  return order.referenceId;
}

function getStatus(order: Order): string {
  const statusMap: Record<string, string> = {
    new: "new",
    "coreOrderWorkflow/processing": "processing",
    "coreOrderWorkflow/completed": "completed",
  };
  return statusMap[order.status] ?? order.status;
}

function getPrice(order: Order): |number | null {
  return order.summary.total.amount;
}

function getItems(order: Order): OrderItem[] {
  return order.fulfillmentGroups[0].items.nodes;
}

function getItemSku(item: OrderItem): string {
  return item._id;
}

function getItemName(item: OrderItem): string {
  return item.variantTitle;
}

function getItemQty(item: OrderItem): number {
  return item.quantity;
}

function getItemPrice(item: OrderItem): number {
  return item.price.amount;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getFormattedPrice(price: number): string {
  return "";
}

// eslint-disable-next-line
function getOrdersTotal(orders: any): number {
  return orders.length;
}

export const orderGetters: UserOrderGetters<Order, OrderItem> = {
  getDate,
  getId,
  getStatus,
  getPrice,
  getItems,
  getItemSku,
  getItemName,
  getItemQty,
  getItemPrice,
  getFormattedPrice,
  getOrdersTotal,
};
