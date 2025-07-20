import axios from 'axios';
export const axiosInstance = axios.create({});

export const apiConnector = (
  method,
  url,
  bodyData,
  headers,
  params,
  withCreds = false
) => {
  const config = {
    method: `${method}`,
    url: `${url}`,
    headers: headers ? headers : null,
    params: params ? params : null,
    withCredentials: withCreds,
  };

  // Only attach data for POST, PUT, PATCH requests
  if (bodyData && ['POST', 'PUT', 'PATCH'].includes(method.toUpperCase())) {
    config.data = bodyData;
  }

  return axiosInstance(config);
};
