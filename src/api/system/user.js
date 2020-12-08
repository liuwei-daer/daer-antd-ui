import { axios } from '@/utils/request'

const api = {
  user: '/system/user',
  userList: '/system/user/list',
  saveUser: '/system/user/add',
  editUser: '/system/user/update',
  delUser: '/system/user/delete'
}

export default api

export function getUserList (parameter) {
  return axios({
    url: api.userList,
    method: 'post',
    data: parameter
  })
}

export function getUser (id) {
  return axios({
    url: api.user + '/' + `${id}`,
    method: 'get'
  })
}

export function saveUser (parameter) {
  return axios({
    url: api.saveUser,
    method: 'post',
    data: parameter
  })
}

export function editUser (parameter) {
  return axios({
    url: api.editUser,
    method: 'post',
    data: parameter
  })
}

export function delUser (id) {
  return axios({
    url: api.delUser + '/' + `${id}`,
    method: 'delete'
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
