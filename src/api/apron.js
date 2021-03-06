import axios from 'axios'; // axios
import _ from 'lodash'; // lodash
import qs from 'qs'; // qs
import Vue from 'vue';// vue

/*  拦截器
 *  请求成功 状态码 2xx
 *  返回内容示例
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
    // 2020.08.11  删除 res.data.data 这层转换
    // if (_.get(res, 'data.success')) {
    //   console.log('data.success', res);
    //   return res.data.data;
    // }
    return res.data;
  }
}

/* 拦截器
 * 请求出错 状态码4xx 5xx 或者 2xx但是执行success方法出错
 */
export function error(err) {
  const status = _.get(err, 'response.status');
  if ((status === 403 || status === 401) && (window.location.hash !== '#/login')) {
    // 非 login 页面下
    // 状态码为 401 或 403 时，重定向至 login 页面
    Vue.prototype.$message = null;// 清除message提示

    window.location.href = window.location.origin;
  }
  return Promise.reject(err);
}

const http = axios.create({
  baseURL: process.env.VUE_APP_API,
  headers: { 'Content-type': 'application/json' }
});

// http请求response拦截器（预处理返回值）
http.interceptors.response.use(success, error);
http.interceptors.request.use(
  async (config) => {
    if (config.method === 'get') {
      config.paramsSerializer = function (params) {
        return qs.stringify(params, { arrayFormat: 'repeat' });
      };
    }
    return config;
  },
  errorSelf => Promise.reject(errorSelf)
);

export default http;
