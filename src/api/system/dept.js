import { axios } from '@/utils/request'

const deptApi = {
  dept: '/system/dept'
}

export default deptApi

// dept
export function getDeptList (parameter) {
  return axios({
    url: deptApi.dept + '/list',
    method: 'get',
    params: parameter
  })
}
export function getDeptListEnable (parameter) {
  return axios({
    url: deptApi.dept + '/list/enable',
    method: 'get',
    params: parameter
  })
}
export function getRoleDeptIds (roleId) {
  return axios({
    url: deptApi.dept + '/role/' + `${roleId}`,
    method: 'get'
  })
}
export function saveDept (parameter) {
  return axios({
    url: deptApi.dept + (parameter.deptId > 0 ? '/update' : '/save'),
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function delDept (deptId) {
  return axios({
    url: deptApi.dept + '/remove/' + `${deptId}`,
    method: 'post'
  })
}
