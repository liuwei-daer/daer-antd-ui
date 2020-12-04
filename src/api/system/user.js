import { axios } from '@/utils/request'

const api = {
  user: '/system/user'
}

export default api

export function getUserList (parameter) {
  return axios({
    url: api.user + '/list',
    method: 'get',
    params: parameter
  })
}

export function getUser (userId) {
  return axios({
    url: api.user + '/get/' + `${userId}`,
    method: 'get'
  })
}

export function saveUser (parameter) {
  return axios({
    url: api.user + (parameter.userId > 0 ? '/update' : '/save'),
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
export function delUser (parameter) {
  return axios({
    url: api.user + '/remove',
    method: 'post',
    params: parameter
  })
}
export function changUserStatus (parameter) {
  return axios({
    url: api.user + '/status',
    method: 'post',
    data: parameter
  })
}
export function resetPwd (parameter) {
  return axios({
    url: api.user + '/resetPwd',
    method: 'post',
    data: parameter
  })
}
