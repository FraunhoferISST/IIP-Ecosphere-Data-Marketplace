import { Shop } from "@vue-storefront/iiepmarket-api";
import { AgnosticStore, UseStoreGetters } from "@vue-storefront/core";
import { UseStoreFilterParams } from "../types";

interface UseStoreGettersExtended extends UseStoreGetters<Shop, UseStoreFilterParams> {
  getName(store: Shop): string,
  getId(store: Shop): string,
  getDescription(store: Shop): string,
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getItems(stores: Shop, criteria: UseStoreFilterParams = {}): AgnosticStore[] {
  return [];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getSelected(stores: Shop): AgnosticStore | undefined {
  return null;
}

const getName = (store: Shop): string => store.name;

const getId = (store: Shop): string => store._id;

const getDescription = (store: Shop): string => store._id;

export const storeGetters: UseStoreGettersExtended = {
  getItems,
  getName,
  getId,
  getDescription,
  getSelected,
};
