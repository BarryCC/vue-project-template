'use strict'

import axios from 'axios'
import router from '../router'
import iView from 'iview'

axios.interceptors.request.use(
  config => {
    // loading show
    document.getElementById('ajaxLoader').style.display = "inline-block";
    return config;
  },
  error => {
    return Promise.reject(error);
  }
)

axios.interceptors.response.use(
  response => {
    // loading hidden
    document.getElementById('ajaxLoader').style.display = "none";
    const res = response.data;
    if (res.messageCode !== 10000) {
      // 判断登录状态
      if (res.messageCode === 40009) {
        iView.Modal.confirm({
          title: "消息提示",
          content: "登录超时，是否重新登录",
          cancelText:"取消",
          okText:"确定",
          onOk:function () {
            router.replace('/');
          }
        });
      }
      iView.Message.error(res.messageContent);
      return Promise.reject(res.messageContent || 'error');
    } else {
      return res;
    }
  },
  error => {
    // loading hidden
    document.getElementById('ajaxLoader').style.display = "none";
    iView.Message.error(error);
    return Promise.reject(error)
  }
)

export default {
  post (url, data) {
    return axios({
      method: 'post',
      baseURL: '/',
      url,
      data: JSON.stringify(data),
      timeout: 20000,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
  },
  get (url, params) {
    return axios({
      method: 'get',
      baseURL: '/',
      url,
      params,
      timeout: 20000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    })
  }
}
