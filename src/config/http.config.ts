/**
 * 引入axios
 * 引入qs模块，用来序列化post类型的数据
 * 引入router用于跳转
 */
import axios from 'axios';
import qs from 'qs';
import router from '../router';


/* 接口域名管理 */
let urlPrefix = import.meta.env.VITE_API_URL_PREFIX || '/';

/* 请求失败返回错误处理 */
const errorHandler = (status: number | string, other: number | string) => {
  switch (status) {
    /**
     * 401: 未登录 或 token过期
     * 未登录则跳转登录页面，并携带当前页面的路径
     * 在登录成功后返回当前页面，这一步需要在登录页操作
     */
    case 401:
      router.push({ path: '/base/login' }).catch((err) => {
        console.error('路由跳转异常', err);
      });
      break;
    /**
     * 403 token过期
     * 登录过期对用户进行提示
     * 清除本地token和清空vuex中token对象
     * 跳转登录页面
     */
    case 403:
      /* 清除token */
      /* 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面 */
      break;
    /* 404请求不存在 */
    case 404:
      router.push({ path: '/base/error' }).catch((err) => {
        console.error('路由跳转异常', err);
      });
      break;
    case 500:
      break;
    /* 其他错误，直接抛出错误提示 */
    default:
      break;
  }
};

/* 创建 axios 实例 */
const service = axios.create({
  baseURL: urlPrefix,
  timeout: 10000,
  transformRequest: [
    (data) => {
      let res = data;
      if (typeof data !== 'string') {
        res = qs.stringify(data);
      }
      return res;
    }
  ],

  transformResponse: [
    (data) => {
      let res = data;
      if (typeof data === 'string' && data.startsWith('{')) {
        res = JSON.parse(data);
      }
      return res;
    }
  ]
});

/* 允许携带cookie */
// service.defaults.withCredentials = true;

/* x-www-form-urlencoded */
service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

/* 请求拦截器 */
service.interceptors.request.use(
  (config) => {
    /**
     * 每次发送请求之前判断vuex中是否存在token
     * 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
     * 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
     */
    const res = config;
    const accessToken = localStorage.getItem('_tea_token');
    if (accessToken) {
      (res.headers as any).Authorization = `Bearer ${accessToken}`;
    }
    const locale = localStorage.getItem('_tea_locale') || 'zh';
    (res.headers as any)['x-custom-lang'] = locale;
    return res;
  },
  (error) => Promise.reject(error)
);

/* 响应拦截器 */
service.interceptors.response.use(
  /**
   *  如果返回的状态码小于400，说明接口请求成功，可以正常拿到数据
   *  否则的话抛出错误
   *  请求成功
   */
  (res) => {
    return res.status < 400 ? Promise.resolve(res.data) : Promise.reject(res);
  },
  /**
   * 服务器状态码非小于400的情况
   * 这里可以跟你们的后台开发人员协商好统一的错误状态码
   * 然后根据返回的状态码进行一些操作，例如登录过期提示，错误提示等等
   * 下面列举几个常见的操作，其他需求可自行扩展
   */
  (error) => {
    const { response } = error;
    if (response) {
      /* 请求已发出，但是不在2xx的范围 */
      errorHandler(response.status, response.data.data);
      return Promise.reject(response);
    }
    /**
     * 处理断网的情况
     * eg:请求超时或断网时，更新state的network状态
     * network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
     * 关于断网组件中的刷新重新获取数据，会在断网组件中说明
     */
    if (!window.navigator.onLine) {
      console.error('客户端网络连接出现异常');
    } else {
      return Promise.reject(error);
    }

    if (error.response.status) {
      return Promise.reject(error.response);
    }

    return Promise.resolve(response);
  }
);

export default service;
