import axios from "axios";
import { getLocalStorage } from "../localStorage";

export const axiosAuth = axios.create({
  baseURL:
    "https://cors-anywhere.herokuapp.com/" + process.env.AUTHORIZE_API_URL,
});
axiosAuth.interceptors.request.use(
  (config) => {
    const token = getLocalStorage("access_token");
    if (token) {
      config.headers.common["Authorization"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
