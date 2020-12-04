import storage from 'store'
import { login, getInfo, logout } from '@/api/login'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { welcome } from '@/utils/util'

const user = {
  state: {
    userId: '',
    token: '',
    name: '',
    welcome: '',
    avatar: '',
    roles: [],
    permissions: [], // 按钮权限
    info: {}
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, { name, welcome }) => {
      state.name = name
      state.welcome = welcome
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_INFO: (state, info) => {
      state.info = info
    },
    SET_PERMISSIONS: (state, permissions) => {
      state.permissions = permissions
    },
    SET_USERID: (state, userId) => {
      state.userId = userId
    }
  },

  actions: {
    // 登录
    Login ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then(response => {
          const result = response
          storage.set(ACCESS_TOKEN, result.access_token, 12 * 60 * 60 * 1000)
          commit('SET_TOKEN', result.access_token)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          const resultData = response.data
          if (resultData.roles) {
            commit('SET_ROLES', resultData.roles)
            commit('SET_PERMISSIONS', resultData.permissions)
            commit('SET_USERID', resultData.userId)
            commit('SET_INFO', resultData)
          } else {
            reject(new Error('getInfo: roles must be a non-null array !'))
          }
          // console.log(result)
          commit('SET_NAME', { name: resultData.userName, welcome: welcome() })
          commit('SET_AVATAR', resultData.avatar || '/avatar.jpg')
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    Logout ({ commit, state }) {
      return new Promise((resolve) => {
        logout(state.token).then(() => {
          resolve()
        }).catch(() => {
          resolve()
        }).finally(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          commit('SET_INFO', {})
          storage.remove(ACCESS_TOKEN)
        })
      })
    }

  }
}

export default user
