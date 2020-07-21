import axios from "axios";
import router from "../router";
import store from "../store";

// Add custom configuration here.
const axiosInstance = axios.create({
  baseURL: process.env.VUE_APP_CONTEXT,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  async function(config) {
    //토큰이 있을 경우 헤더에 포함한다.
    config.headers["x-auth-token"] = localStorage.getItem("x-auth-token");
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

//토큰 만료 처리
axiosInstance.interceptors.response.use(
  function(response) {
    return response;
  },
  async function(error) {
    // Object.entries(error).forEach((item) => console.log(item));
    // const { config } = error;
    if (error.response.status === 401) {
      localStorage.setItem("x-auth-token", "");
      store.dispatch("setIsLoginAt", false);
      router.push({ name: "login" });
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
