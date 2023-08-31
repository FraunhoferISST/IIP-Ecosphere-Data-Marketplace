import axios, {AxiosError, AxiosResponse} from "axios";
import {KnownNodeConfig} from "~/types";
import apiHandlers from "~/server/graphql";
import {H3Event} from "h3";
import urlJoin from 'url-join';

const getTokenFromRequestHeader = (event: H3Event) => {
  const headerValue = getRequestHeader(event, "Authorization") ?? ""
  return headerValue.replace("Bearer ", "")
}

const parseKnownNodesEndpointsUrl = (envValue = ""): KnownNodeConfig[] => {
  return JSON.parse(envValue);
};

const getBrokerVerificationUrl = () => {
  const BROKER_API_ENDPOINT = useRuntimeConfig().brokerApiEndpoint
  return urlJoin(BROKER_API_ENDPOINT, "/verify");
};

const gqlQueryToString = (queryObject: any) => {
  return (queryObject.query ?? queryObject.mutation).loc.source.body;
}

const responseError = (response: AxiosError | any) => {
  debugger
  return (
    response?.stack ??
    response.errors ??
    response?.data?.errors ??
    response?.response?.data?.errors
  );
};

const handleResponse = (response: AxiosResponse) => {
  const errors = responseError(response);
  if (errors) {
    throw { errors };
  }
  return response?.data;
};

export const clientFactory = (apiUrl = "/", authToken?: string): object => {
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
    query: (endpoint: string, requestData: object) => {
      return client
        .post(endpoint, { ...requestData, query: gqlQueryToString(requestData) })
        .then(handleResponse)
        .catch(handleResponse);
    },
    mutate: (endpoint: string, requestData: object) => {

      return client
        .post(endpoint, { ...requestData, query: gqlQueryToString(requestData) })
        .then(handleResponse)
        .catch(handleResponse);
    },
  };
};

export default defineEventHandler((event: H3Event) => {
  if (event.node.req.url?.startsWith("/api")) {
    const knownNodesConfig: KnownNodeConfig[] = parseKnownNodesEndpointsUrl(useRuntimeConfig().knownNodesConfig as unknown as string);
    event.context.apiClient = clientFactory("", getTokenFromRequestHeader(event));
    event.context.knownNodesConfig = knownNodesConfig;
    event.context.brokerVerificationEndpoint = getBrokerVerificationUrl();
    event.context.createClient = (token = "") => clientFactory("", token);
    event.context.api = {};
    for (const handlerName of Object.keys(apiHandlers)) {
      event.context.api[handlerName] = (body: object = {}) =>
        apiHandlers[handlerName](event, body);
    }
  }
});
