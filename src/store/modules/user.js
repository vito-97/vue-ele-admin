import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'
import settings from '@/settings'

const state = {
  token: getToken(),
  name: '',
  avatar: settings.avatar,
  userinfo: {},
  introduction: '',
  role: '',
  menus: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_USERINFO: (state, userinfo) => {
    state.userinfo = userinfo
  },
  SET_AVATAR: (state, avatar) => {
    if (!avatar) {
      avatar = settings.avatar
    }
    state.avatar = avatar
  },
  SET_ROLE: (state, role) => {
    state.role = role
  },
  SET_MENUS: (state, menus) => {
    state.menus = menus
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          reject('验证失败，请重新登录')
        }

        const { role, detail, menu } = data

        // auth must be a non-empty array
        if (!role.auth || role.auth.length <= 0) {
          reject('返回的权限数据不为数组')
        }

        commit('SET_USERINFO', detail)
        commit('SET_ROLE', role)
        commit('SET_MENUS', menu)
        commit('SET_NAME', detail.nickname)
        if (detail.avatar) {
          commit('SET_AVATAR', detail.avatar)
        }
        commit('SET_INTRODUCTION', role.name)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state, dispatch }, payload = {}) {
    return new Promise((resolve, reject) => {
      logout(payload).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLE', '')
        commit('SET_MENUS', [])
        removeToken()
        resetRouter()

        // reset visited views and cached views
        // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
        dispatch('tagsView/delAllViews', null, { root: true })

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLE', '')
      commit('SET_MENUS', [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  async changeRole({ commit, dispatch }, key) {
    const token = key + '-token'

    commit('SET_TOKEN', token)
    setToken(token)

    const { role } = await dispatch('getInfo')

    resetRouter()

    // generate accessible routes map based on role
    const accessRoutes = await dispatch('permission/generateRoutes', role, { root: true })
    // dynamically add accessible routes
    router.addRoutes(accessRoutes)

    // reset visited views and cached views
    dispatch('tagsView/delAllViews', null, { root: true })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
