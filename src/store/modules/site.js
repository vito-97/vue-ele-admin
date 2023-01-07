import { getConfig } from '@/api/site'

const state = {
  config: {}
}

const mutations = {
  SET_CONFIG: (state, value) => {
    state.config = Object.assign({}, state.config, value)
  }
}

const actions = {
  // 獲取配置
  getConfig({ commit }) {
    return getConfig().then(res => {
      var { data } = res
      commit('SET_CONFIG', data)
      return data
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
