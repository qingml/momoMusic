import axios, { AxiosRequestConfig } from "axios";
import qs from "qs";
import { ElMessage } from "element-plus";
import { baseURL } from "@/constants/baseUrl";

const instance = axios.create({
  timeout: 1000 * 60 * 2,
  baseURL,
  withCredentials: true,
});

instance.defaults.withCredentials = true;
instance.defaults.transformRequest = [
  (data) => {
    return qs.stringify(data);
  },
];

instance.defaults.validateStatus = function () {
  return true;
};

/** 异常处理 */
instance.interceptors.response.use(
  (response) => {
    const data = response.data;
    const status = response.status;
    if (status === 200) {
      return Promise.resolve(data);
    } else if (status === 301) {
      ElMessage.error({ message: "请先登录!" });

      return;
    } else if (status === 400) {
      ElMessage.error({ message: data.msg });
    } else {
      return Promise.reject(response);
    }
  },
  (error) => {
    console.log(error);
  }
);

/** 请求拦截 */
instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    ElMessage.error({ message: "请求超时!" });
    return Promise.reject(error);
  }
);

interface IAjaxConfig extends AxiosRequestConfig {
  loading?: boolean;
}

/** get 请求 */
// todo 处理全局请求loading
export const getAjax = async <T = any>(
  url: string,
  config?: IAjaxConfig
): Promise<T> => {
  try {
    const resp = await instance.get(url, config);
    return resp as unknown as T;
  } catch (error) {
    // todo
    console.log(`error__url：${url}  error：${error}`);
    return error as unknown as T;
  } finally {
  }
};

/** post 请求 */
// todo 处理全局请求loading
export const postAjax = async <T = any>(
  url: string,
  config?: IAjaxConfig
): Promise<T> => {
  try {
    const resp = await instance.post(url, config?.data);
    return resp as unknown as T;
  } catch (error) {
    // todo
    console.log(`error__url：${url}  error：${error}`);
    return error as unknown as T;
  } finally {
  }
};
