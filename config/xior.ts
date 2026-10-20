import { getCookie, setCookie } from "cookies-next";
import xior, { type XiorResponse } from "xior";
import errorRetry from "xior/plugins/error-retry";
import setupTokenRefresh from "xior/plugins/token-refresh";

import { attemptRefresh, decodeToken, signOut } from "@/lib/auth";

function shouldRefresh(response: XiorResponse) {
  const token = getCookie("accessToken");
  return Boolean(token && response?.status && [401, 403].includes(response.status));
}

const fetch = xior.create({
  baseURL: "https://api.manageyourecommerce.com",
});

export const fetchAuth = xior.create({
  baseURL: "https://auth.evidentbd.com",
  headers: {
    "service-name": "mye",
  },
});

export const fetchPayment = xior.create({
  baseURL: "https://api-sandbox.manageyourecommerce.com/payment",
});

export const fetchPostage = xior.create({
  baseURL: "https://api.manageyourecommerce.com/mps",
  // baseURL: "https://82xp9lvq-9099.asse.devtunnels.ms",
  // baseURL: "http://localhost:9099",
});

export const evidentApi = xior.create({
  baseURL: "https://api.evidentbd.com",
});

fetch.plugins.use(
  errorRetry({
    enableRetry: (_config, error) => {
      if (error?.response && shouldRefresh(error.response)) {
        return true;
      }
    },
  })
);

setupTokenRefresh(fetch, {
  shouldRefresh,
  refreshToken: async (error) => {
    try {
      const { data } = await attemptRefresh();

      if (data) {
        setCookie("accessToken", data.data.access_token);
        setCookie("refreshToken", data.data.refresh_token);
      }
    } catch (_e) {
      signOut();
      return Promise.reject(error);
    }
  },
});

fetch.interceptors.request.use(async (config) => {
  const token = getCookie("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

fetchAuth.interceptors.request.use(async (config) => {
  const token = getCookie("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

fetchPostage.interceptors.request.use(async (config) => {
  const user = decodeToken();

  if (user) {
    config.headers["x-company-id"] = user.company_uid;
    config.headers["x-user-id"] = user.id;
  }

  return config;
});

fetchPostage.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export default fetch;
