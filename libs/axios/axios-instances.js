import axios from "axios";
import { getLocalStorage } from "../localStorage";

export const axiosAuth = axios.create({
  baseURL: process.env.AUTHORIZE_API_URL,
});
axiosAuth.interceptors.request.use(
  (config) => {
    const token = getLocalStorage("access_token");
    if (token) {
      config.headers.common["Authorization"] = token;
      config.headers.common["Access-Control-Allow-Origin"] = "*";
      config.headers.common["Access-Control-Allow-Credentials"] = "true";
      config.headers.common["Access-Control-Max-Age"] = "1800";
      config.headers.common["Access-Control-Allow-Headers"] = "content-type";
      config.headers.common["Access-Control-Allow-Methods"] =
        "PUT, POST, GET, DELETE, PATCH, OPTIONS";
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
