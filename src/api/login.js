import { axios, loginAxios } from '@/utils/request'

/**
 * login func
 * @param parameter
 * @returns {*}
 */
export function login (parameter) {
  parameter.grant_type = 'password'
  return loginAxios({
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
    method: 'get'
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
