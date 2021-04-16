import { showAlert } from "../utils";
import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";

const http: AxiosInstance = axios.create({
  baseURL: "https://localhost:3000",
});

http.defaults.headers.post["Content-Type"] = "application/json";

http.interceptors.response.use(
  async (response: AxiosResponse<any>): Promise<any> => {
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    }
  },
  (error: AxiosError) => {
    const {
      response,
      request,
    }: { response?: AxiosResponse; request?: XMLHttpRequest } = error;
    if (response) {
      showAlert(response.data?.data?.message, "error");
      return null;
    } else if (request) {
      showAlert("Request failed. Please try again.", "error");
      return null;
    }
    return Promise.reject(error);
  }
);

export default http;
