import axios from "axios";

const gqlQueryToString = (queryObject) => {
  return (queryObject.query ?? queryObject.mutation).loc.source.body;
}

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
    console.log(errors)
    throw { errors };
  }
  return response?.data;
};

export const clientFactory = (apiUrl = "/", authToken = null) => {
  console.info("[API CLIENT]: Creating  client");
  console.info("[API CLIENT]: user token", authToken);
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
          .post(apiUrl, { ...requestData, query: gqlQueryToString(requestData) })
          .then(handleResponse)
          .catch(handleResponse);
    },
    mutate: (requestData) => {

      return client
          .post(apiUrl, { ...requestData, query: gqlQueryToString(requestData) })
          .then(handleResponse)
          .catch(handleResponse);
    },
  };
};

