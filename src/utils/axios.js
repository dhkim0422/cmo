import axios from "axios";

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
    const { config } = error;
    console.log("axios respone error", config);
    if (error.response.data.status === 401 && config.retry === undefined) {
      config.retry = true;

      //토큰 갱신
      //await refreshToken();

      //실패한 request 재실행
      //   return await axiosInstance(config);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
