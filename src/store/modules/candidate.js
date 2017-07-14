import api from '@/service'

import * as types from '../mutation_types'

// 重要信息：state 必须是一个函数，
// 因此可以创建多个实例化该模块
const state = () => ({
  data: {}
})

const actions = {
  getList ({ commit }, param = {}) {
    return api.get('candidate/list', param).then((result) => {
      commit(types.GET_CANDIDATE_LIST, result.data)
    })
  }
}

const mutations = {
  [types.GET_CANDIDATE_LIST] (state, data) {
    state.data = data
  }
}

const getters = {
  total: state => state.data.total || 0,
  list: state => state.data.list || []
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
