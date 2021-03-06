import api from '@/service'

import * as types from '../mutation_types'

// 重要信息：state 必须是一个函数，
// 因此可以创建多个实例化该模块
const state = () => ({
  data: {},
  detail: {}
})

const actions = {
  getDetail ({ commit }, id) {
    return api.get('candidate/item', {id}).then((result) => {
      commit(types.GET_CANDIDATE_DETAIL, result.data)
    })
  },
  getList ({ commit }, {cookie, ...param}) {
    return api.post('candidate/list', param, cookie).then((result) => {
      commit(types.GET_CANDIDATE_LIST, result.data)
    })
  },
  getListMore ({ commit }, {page, ...param}) {
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
  },
  [types.GET_CANDIDATE_DETAIL] (state, data) {
    state.detail = data.detail || {}
  }
}

const getters = {
  data: state => state.data || {},
  total: state => state.data.total || 0,
  list: state => state.data.list || [],
  detail: state => state.detail || {}
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
