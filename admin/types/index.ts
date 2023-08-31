import { ComputedRef } from "@vue/runtime-core";

export type CookiesGetter = {
  getUserId: () => string;
  getShopId: () => string;
  getUserToken: () => string;
  getUserRefreshToken: () => string;
};

export type NavItem = {
  icon?: string;
  path: string;
  title: string;
};

export type SetInput = {
  cursor?: string;
  page?: number;
  count?: number;
  pages?: number;
};

export interface UsePagination {
  cursor: ComputedRef<string>;
  page: ComputedRef<number>;
  pages: ComputedRef<number>;
  pageSize: ComputedRef<number>;
  count: ComputedRef<number>;
  set: (input: SetInput) => void;
  reset: () => void;
}

export interface PaginatedResponse<T> {
  items: T[];
  cursor?: string;
  count?: number;
}

export * from "../../shared/types";
