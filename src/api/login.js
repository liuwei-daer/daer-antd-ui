// import api from './index'
import { axios, pureAxios } from '@/utils/request'

/**
 * login func
 * @param parameter
 * @returns {*}
 */
export function login (parameter) {
  parameter.grant_type = 'password'
  return axios({
    url: '/uaa/oauth/token',
    method: 'post',
    params: parameter,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    auth: {
      username: 'webapp',
      password: 'webapp'
    }
  })
}

export function getInfo () {
  return axios({
    url: '/system/user/info',
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function logout (token) {
  return axios({
    url: '/uaa/oauth/token',
    method: 'delete',
    params: {
      access_token: token
    },
    auth: {
      username: 'webapp',
      password: 'webapp'
    }
  })
}

export function imgcode () {
  return pureAxios({
    url: '/code',
    method: 'get',
    responseType: 'blob'
  })
}

/**
 * get user 2step code open?
 * @param parameter {*}
 */
export function get2step (parameter) {
  return axios({
    url: '1232',
    method: 'post',
    data: parameter
  })
}

// 获取验证图片  以及token
export function getCaptcha (data) {
  return axios({
    url: '/auth/captcha/get',
    method: 'post',
    data
  })
}

// 滑动或者点选验证
export function captchaCheck (data) {
  return axios({
    url: '/auth/captcha/check',
    method: 'post',
    data
  })
}
