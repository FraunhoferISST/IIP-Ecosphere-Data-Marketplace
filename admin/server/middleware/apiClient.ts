import axios from "axios";
import { cookiesGetter } from "~/helpers/cookies";
import { CookiesGetter } from "~/types";
import apiHandlers from "~/server/graphql";

const gqlQueryToString = (queryObject) =>
  (queryObject.query ?? queryObject.mutation).loc.source.body;

const responseError = (response) => {
  return (
    response?.stack ??
    response.errors ??
    response?.data?.errors ??
    response?.response?.data?.errors
  );
};

const handleResponse = (response) => {
  const errors = responseError(response);
  if (errors) {
    throw { errors };
  }
  return response?.data;
};

export const clientFactory = (apiUrl: string, authToken: string): object => {
  console.info("[API CLIENT]: Creating  client");
  console.info(
    "[API CLIENT]: user token",
    authToken ? authToken.slice(0, 3) + "***" : ""
  );
  console.info("[API CLIENT]: apiUrl", apiUrl);
  const client = axios.create({
    baseURL: apiUrl,
    headers: {
      ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
    },
  });
  return {
    client,
    query: (requestData) => {
      return client
        .post("/", { ...requestData, query: gqlQueryToString(requestData) })
        .then(handleResponse)
        .catch(handleResponse);
    },
    mutate: (requestData) => {
      return client
        .post("/", { ...requestData, query: gqlQueryToString(requestData) })
        .then(handleResponse)
        .catch(handleResponse);
    },
  };
};

export default defineEventHandler((event) => {
  if (event.req.url.startsWith("/api")) {
    const apiURL: string = useRuntimeConfig().apiBaseUrl;
    const cookies = useCookies(event);
    const ckGetter: CookiesGetter = cookiesGetter(cookies);
    event.context.apiClient = clientFactory(apiURL, ckGetter.getUserToken());
    event.context.cookies = {
      userId: ckGetter.getUserId(),
      token: ckGetter.getUserToken(),
      refreshToken: ckGetter.getUserRefreshToken(),
      shopId: ckGetter.getShopId(),
    };
    event.context.createClient = (token = "") => clientFactory(apiURL, token);
    event.context.api = {};
    event.context.runtimeConfig = useRuntimeConfig();
    for (const handlerName of Object.keys(apiHandlers)) {
      event.context.api[handlerName] = (body: object = {}) =>
        apiHandlers[handlerName](event, body);
    }
  }
});
