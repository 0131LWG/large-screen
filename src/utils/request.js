import axios from "axios";

const baseUrl = process.env.NODE_ENV === "development" ? "/dev/" : "";

const config = {
  baseURL: baseUrl,
  timeout: 10000,
};

const instance = axios.create(config);

// 请求设置
instance.interceptors.request.use(
  (request) => {

    // 设置header（暂时不加token）
    const header = {
      "Content-Type": "application/json"
    }
    request.headers = header;

    return request;
  },
  (error) => {
    console.log(error, "全局请求拦截器错误");
    Promise.reject(error);
  }
)

// 响应设置
instance.interceptors.response.use((response) => {
  if(response.data.code !== 200){
    return Promise.reject(response.data.message);
  }
  return response;
},
(error) => {
  const errorString = error.toString();
  if(errorString.includes("timeout")){
    return Promise.reject("请求超时");
  }
  if(error.response.status >= 500){
    return Promise.reject("服务器接口错误");
  }
})

// 请求方法
const request = async(url, config) => {
  try {
    config = {
      ...config,
      url: url,
    }

    const response = await instance.request(config);
    return response.data;
  }
  catch(error){
    return Promise.reject(error);
  }
}

export default request;