import axios from "axios";

const gqlQueryToString = (queryObject) =>
  (queryObject.query ?? queryObject.mutation).loc.source.body;

const responseError = (response) => {
  return (
    response.errors ??
      response?.data?.errors ??
      response?.response?.data?.errors
  );
};

const handleResponse = (response) => {
  const errors = responseError(response);
  if (errors) {
    console.error(errors);
    throw { errors };
  }
  return response?.data;
};
export const clientFactory = (apiUrl: string, authToken: string): object => {
  console.info("[API CLIENT]: Creating client");
  console.info(
    "[API CLIENT]: user token",
    authToken ? authToken.slice(0, 3) + "***" : ""
  );
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
