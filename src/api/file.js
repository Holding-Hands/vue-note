import Vue from "vue";
import axios from "axios";
import _ from "lodash";
import qs from "qs";

/*  拦截器
 *  请求成功 状态码 2xx返回内容示例
 *  {
 *      status: 200,
 *      data: {
 *        success: true,
 *        msg: "success"
 *      }
 *
 */
export function success(res) {
  if (res.status === 200) {
    return res.data;
  }
}

/* 拦截器
 * 请求出错 状态码4xx 5xx 或者 2xx但是执行success方法出错22
 */
export function error(err) {
  const status = _.get(err, "response.status");
  if (
    (status === 403 || status === 401) &&
    window.location.hash !== "#/login"
  ) {
    // 非 login 页面下
    // 状态码为 401 或 403 时，重定向至 login 页面
    Vue.prototype.$message = null; // 清除message提示11

    window.location.href = window.location.origin;
  }
  return Promise.reject(err);
}

const file = axios.create({
  baseURL: process.env.VUE_APP_File,
  headers: { "Content-type": "application/json" },
});

// file请求response拦截器（预处理返回值）2221
file.interceptors.response.use(success, error);
file.interceptors.request.use(
  async (config) => {
    if (config.method === "get") {
      config.paramsSerializer = function (params) {
        return qs.stringify(params, { arrayFormat: "repeat" });
      };
    }
    return config;
  },
  (errorSelf) => Promise.reject(errorSelf)
);
export default file;
