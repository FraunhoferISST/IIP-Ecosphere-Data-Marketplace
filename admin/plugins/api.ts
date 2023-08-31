import axios from "axios";
import { cookiesNames } from "~/helpers/cookies";

export default defineNuxtPlugin(() => {
  const endpoint = useRuntimeConfig().frontendBaseUrl;
  const token = useCookie(cookiesNames.userTokenCookieName);
  const ax = axios.create({
    baseURL: endpoint, // defaults to URL origin, if not provided
    headers: {
      Cookie: `${cookiesNames.userTokenCookieName}=${token.value}`,
    },
  });
  const handle = <Response>(
    method: string,
    data?: unknown
  ): Promise<Response> =>
    ax
      .post(`api/handlers/${method}`, data)
      .then(({ data: response }) => response);
  return {
    provide: {
      api: {
        handle,
      },
    },
  };
});
