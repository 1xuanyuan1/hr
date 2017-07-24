/**
 * 选择语言
 */
import * as types from '../mutation_types.js'
import langs from 'assets/lang'

const state = () => ({
  string: langs.cn,
  cookies: []
})

const actions = {
  setCookies ({ commit }, cookies) {
    commit(types.SET_COOKIES, cookies)
  }
}

const mutations = {
  [types.SET_COOKIES] (state, cookies) {
    state.cookies = cookies
  }
}

const getters = {
  string: state => state.string,
  cookie: state => {
    let cookie = ''
    for (let [key, val] of Object.entries(state.cookies)) {
      cookie += `${key}=${val};`
    }
    return cookie
  }
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
