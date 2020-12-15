import { axios } from '@/utils/request'

const permsApi = {
  permission: '/system/perms',
  tree: '/system/perms/tree',
  selTree: '/system/perms/selTree'

}

export default permsApi

// menu
export function getPermissionAll (parameter) {
  return axios({
    url: permsApi.permission + '/all',
    method: 'get',
    params: parameter
  })
}
export function getPermsTree (parameter) {
  return axios({
    url: permsApi.tree,
    method: 'post',
    data: parameter
  })
}
export function getPermsSelTree () {
  return axios({
    url: permsApi.selTree,
    method: 'post'
  })
}
export function getRolePermIds (roleId) {
  return axios({
    url: permsApi.permission + '/role/' + `${roleId}`,
    method: 'get'
  })
}

export function savePerm (parameter) {
  return axios({
    url: permsApi.permission + (parameter.menuId > 0 ? '/update' : '/save'),
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function delPerm (deptId) {
  return axios({
    url: permsApi.permission + '/remove/' + `${deptId}`,
    method: 'post'
  })
}
