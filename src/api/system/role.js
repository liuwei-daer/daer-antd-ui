import { axios } from '@/utils/request'

const roleApi = {
  role: '/system/role',
  roleList: '/system/role/list'
}

export default roleApi

// role
export function getRoleList (parameter) {
  return axios({
    url: roleApi.roleList,
    method: 'post',
    data: parameter
  })
}
export function getRoleAll () {
  return axios({
    url: roleApi.role + '/all',
    method: 'get'
  })
}

export function saveRole (parameter) {
  return axios({
    url: roleApi.role + (parameter.roleId > 0 ? '/update' : '/save'),
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function delRole (parameter) {
  return axios({
    url: roleApi.role + '/remove',
    method: 'post',
    params: parameter
  })
}
export function changRoleStatus (parameter) {
  return axios({
    url: roleApi.role + '/status',
    method: 'post',
    data: parameter
  })
}
export function authDataScope (parameter) {
  return axios({
    url: roleApi.role + '/authDataScope',
    method: 'post',
    data: parameter
  })
}

export function getRolePermIds (roleId) {
  return axios({
    url: roleApi.role + '/role/' + `${roleId}`,
    method: 'get'
  })
}

export function getPermissions (parameter) {
  return axios({
    url: roleApi.role + '/list',
    method: 'get',
    params: parameter
  })
}
