'use strict'

import axios from 'axios'
import router from '../router/router'
import iView from 'iview'

axios.interceptors.request.use(config => {
  // loading show
  document.getElementById('ajaxLoader').style.display = "table";
  return config
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
  return response
}, error => {
  return Promise.reject(error)
})

function checkStatus (response) {
  // loading hidden
  document.getElementById('ajaxLoader').style.display = "none";
  // 如果http状态码正常，则直接返回数据
  if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
    return response.data;
  }
  // 异常状态下，把错误信息返回去
  iView.Message.error('网络异常');
  return {
    status: response.status,
    msg: '网络异常'
  }
}

function checkCode (res) {
  // 如果code异常(这里已经包括网络错误，服务器错误，后端抛出的错误)，可以弹出一个错误提示，告诉用户
  if (res.messageCode === 40009) {
    iView.Modal.confirm({
      title: "消息提示",
      content: "登录超时，是否重新登录",
      cancelText:"取消",
      okText:"确定",
      onOk:function () {
        router.replace('登录页路径');
      }
    });
  }
  return res;
}

export default {
  post (url, data) {
    return axios({
      method: 'post',
      baseURL: '/',
      url,
      data: JSON.stringify(data),
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).then(
      (response) => {
        return checkStatus(response)
      }
    ).then(
      (res) => {
        return checkCode(res)
      }
    )
  },
  get (url, params) {
    return axios({
      method: 'get',
      baseURL: '/',
      url,
      params, // get 请求时带的参数
      timeout: 10000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    }).then(
      (response) => {
        return checkStatus(response)
      }
    ).then(
      (res) => {
        return checkCode(res)
      }
    )
  }
}
