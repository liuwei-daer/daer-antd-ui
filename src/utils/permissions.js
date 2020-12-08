import store from '@/store'
export function actionToObject (json) {
  try {
    return JSON.parse(json)
  } catch (e) {
    console.log('err', e.message)
  }
  return []
}
// 权限检查方法
export function checkPermission (value) {
  // userId=1直接拥有所有权限
  // const userId = store.getters.userId
  // if (userId === 1) return true
  // 获取用户按钮权限
  let isExist = false
  const dynamicPermissions = store.getters.permissions
  if (dynamicPermissions === undefined || dynamicPermissions === null || dynamicPermissions.length < 1) {
    return isExist
  }
  dynamicPermissions.forEach(permission => {
    if (permission === value) {
      isExist = true
      return isExist
    }
  })
  return isExist
}
