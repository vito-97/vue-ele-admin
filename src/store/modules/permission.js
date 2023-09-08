import { asyncRoutes, constantRoutes } from '@/router'

const setting = require('@/settings')

/**
 * Use meta.role to determine if the current user has permission
 * @param role
 * @param route
 */
function hasPermission(role, route) {
  if (route.children && route.children.length > 0) {
    return route.children.some(r => hasPermission(role, r))
  } else if (route.meta && route.meta.auth) {
    return route.meta.auth.some(auth => role.auth[setting.authPrefix + auth] || false)
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param role
 */
export function filterAsyncRoutes(routes, role) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    var hasChild = tmp.children && tmp.children.length > 0
    if (hasChild || hasPermission(role, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, role)
      }
      if (hasChild && tmp.children.length || !hasChild) {
        res.push(tmp)
      }
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, role) {
    return new Promise(resolve => {
      let accessedRoutes
      if (role.key === 'admin') {
        accessedRoutes = asyncRoutes || []
      } else {
        console.time('route')
        accessedRoutes = filterAsyncRoutes(asyncRoutes, role)
        console.timeEnd('route')
      }
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
