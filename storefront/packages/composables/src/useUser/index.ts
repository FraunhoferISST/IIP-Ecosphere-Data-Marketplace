import {
  Context,
  useUserFactory,
  UseUserFactoryParams
} from "@vue-storefront/core";
import type { Account } from "@vue-storefront/iiepmarket-api";
import type {
  UseUserUpdateParams as UpdateParams,
  UseUserRegisterParams as RegisterParams
} from "../types";
import { removeAccountCookies } from "../helpers/cookie";

declare type RegisterData = {
  email: string,
  password: string,
  username?: string
  name?: string
  firstName?: string;
  lastName?: string;

}

const handleApiResponsePromise = (promise: Promise<any>) => promise.then(res => {
  // FIXME: why the error is not properly propagated from the API call?? who catches it?? currently it's only the case for this endpoint
  if (res?.errors || res?.graphQLErrors || res?.clientErrors) {
    throw res;
  }
  return res;
});

const params: UseUserFactoryParams<Account, UpdateParams, RegisterParams> = {
  load: async (context: Context): Promise<Account> => {
    const account = await handleApiResponsePromise(context.$iiepmarket.api.getAccount());
    if (account) {
      await handleApiResponsePromise(context.$iiepmarket.api.refreshToken());
      return account;
    } else {
      removeAccountCookies();
      return null;
    }
  },

  logOut: async (context: Context) => context.$iiepmarket.api.logout().then(removeAccountCookies),

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateUser: async (context: Context, {currentUser, updatedUserData}) => {
    return context.$iiepmarket.api.refreshToken();
  },

  register: async (context: Context, { email, password, lastName, firstName}: RegisterData) => {
    await handleApiResponsePromise(
      context.$iiepmarket.api.register({email, password})
    );
    const user: Account = await handleApiResponsePromise(context.$iiepmarket.api.getAccount());
    handleApiResponsePromise(context.$iiepmarket.api.updateAccount({accountId: user._id, lastName, firstName, name: `${firstName} ${lastName}`}));
    return user;
  },

  logIn: async (context: Context, {
    username,
    password,
  }) => {
    await handleApiResponsePromise(context.$iiepmarket.api.login({email: username, password}));
    return handleApiResponsePromise(context.$iiepmarket.api.getAccount());
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  changePassword: async (context: Context, {currentUser, currentPassword, newPassword}) => {
    console.log("Mocked: useUser.changePassword");
    return context.$iiepmarket.api.refreshToken();
  },
};

export const useUser = useUserFactory<Account, UpdateParams, RegisterParams>(params);
