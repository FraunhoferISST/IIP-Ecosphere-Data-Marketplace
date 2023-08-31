import { TaskInterval } from "~/utils/TaskInterval";

import type { Account } from "~/types";
import type { UseAsyncState } from "~/types/composables";
import { cookiesNames } from "~/helpers/cookies";
import { useRequest } from "~/composables/useRequest";
import type { ComputedRef } from "vue";

type LoginDto = {
  email: string;
  password: string;
};

type CreateDto = {
  email: string;
  password: string;
  shopId: string;
};

export interface UserComposable {
  user: ComputedRef<Account>;
  id: ComputedRef<string>;
  login: UseAsyncState<LoginDto>;
  logout: UseAsyncState;
  create: UseAsyncState<CreateDto>;
  load: UseAsyncState;
  update: UseAsyncState<Partial<Account>>;
}
const timer = new TaskInterval(10 ** 6);
const user = ref<Account>(null);

export const useUser = (): UserComposable => {
  const { $api: api } = useNuxtApp();
  const tokenCookie = useCookie(cookiesNames.userTokenCookieName);
  const refreshTokenCookie = useCookie(cookiesNames.userRefreshTokenCookieName);
  const idCookie = useCookie(cookiesNames.userIdCookieName);

  const setCookies = (
    token: string | null,
    refreshToken: string | null,
    id: string | null
  ) => {
    tokenCookie.value = token;
    refreshTokenCookie.value = refreshToken;
    idCookie.value = id;
  };

  const refreshToken = () =>
    api
      .handle("refreshToken", {})
      .then(({ tokens: { accessToken, refreshToken }, user: { id } }) => {
        setCookies(accessToken, refreshToken, id);
      })
      .catch((e) => {
        console.warn("Couldn't refresh token!", e);
      });

  const startRefreshTokenTimer = () => {
    timer.start(refreshToken);
  };

  const login = useRequest<LoginDto>(({ email, password }: LoginDto) => {
    return api
      .handle("login", { email, password })
      .then(({ refreshToken, accessToken, id }) => {
        setCookies(accessToken, refreshToken, id);
        startRefreshTokenTimer();
      });
  });

  const create = useRequest<CreateDto>((data: CreateDto) => {
    return api
      .handle("register", data)
      .then(({ refreshToken, accessToken, id }) => {
        setCookies(accessToken, refreshToken, id);
      });
  });

  const update = useRequest<object>((data: object) => {
    return api
      .handle("updateAccount", { ...data, accountId: idCookie.value })
      .then((updatedUser: Account) => {
        user.value = updatedUser;
      });
  });

  const logout = useRequest<void, void>(() => {
    return api.handle("logout").finally(() => {
      setCookies(null, null, null);
    });
  });

  const load = useRequest<void, void>(() => {
    return api.handle("getViewer").then((userData: Account) => {
      if (!userData) {
        setCookies(null, null, null);
      } else {
        startRefreshTokenTimer();
      }
      user.value = userData;
    });
  });
  return {
    user: computed(() => user.value),
    id: computed(() => tokenCookie.value),
    login,
    create,
    logout,
    load,
    update,
  };
};
