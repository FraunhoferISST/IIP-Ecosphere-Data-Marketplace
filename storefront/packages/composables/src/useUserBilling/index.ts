import {
  Context,
  useUserBillingFactory,
  UseUserBillingFactoryParams
} from "@vue-storefront/core";
import type {
  UserBillingAddress as Address,
  UserBillingAddressItem as AddressItem,
  Account
} from "@vue-storefront/iiepmarket-api";

const params: UseUserBillingFactoryParams<Address, AddressItem> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addAddress: async (context: Context, { address}) => {
    return context.$iiepmarket.api.addAccountAddress({ address: { ...address, isBillingDefault: true, isShippingDefault: false } });
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  deleteAddress: async (context: Context, params) => {
    console.log("Mocked: useUserBilling.deleteAddress");
    return {};
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateAddress: async (context: Context, params) => {
    console.log("Mocked: useUserBilling.updateAddress");
    return {};
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  load: async (context: Context, params) => {
    const account: Account = await context.$iiepmarket.api.getAccount();
    return account?.addressBook ?? [];
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setDefaultAddress: async (context: Context, params) => {
    console.log("Mocked: useUserBilling.setDefaultAddress");
    return {};
  },
};

export const useUserBilling = useUserBillingFactory<Address, AddressItem>(params);
