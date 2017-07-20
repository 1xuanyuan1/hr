/**
 * 首页信息
 */
import api from '@/service'

import * as types from '../mutation_types'
const state = () => ({
  data: {}
})

const actions = {
  getHomeInfo ({ commit }) {
    return api.get('home').then(req => {
      commit(types.GET_HOME_INFO, req.data)
    })
  }
}

const mutations = {
  [types.GET_HOME_INFO] (state, data) {
    state.data = data
  }
}

const getters = {
  allNum: state => state.data.allNum || 0,
  communication: state => state.data.communication || [],
  pending: state => state.data.pending || []
}
export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
