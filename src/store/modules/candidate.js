import api from '@/service'

import * as types from '../mutation_types'

// 重要信息：state 必须是一个函数，
// 因此可以创建多个实例化该模块
const state = () => ({
  data: {}
})

const actions = {
  getList ({ commit }, param = {}) {
    return api.post('candidate/list', param).then((result) => {
      commit(types.GET_CANDIDATE_LIST, result.data)
    })
  },
  getListMore ({ commit }, {param, page}) {
    return api.post(`candidate/list?page=${page}`, param).then((result) => {
      commit(types.GET_CANDIDATE_LIST_MORE, result.data)
    })
  }
}

const mutations = {
  [types.GET_CANDIDATE_LIST] (state, data) {
    state.data = data
  },
  [types.GET_CANDIDATE_LIST_MORE] (state, data) {
    state.data = {
      hasNext: data.hasNext,
      hasPrev: data.hasPrev,
      total: data.total,
      list: [
        ...state.data.list,
        ...data.list
      ]
    }
  }
}

const getters = {
  data: state => state.data || {},
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
