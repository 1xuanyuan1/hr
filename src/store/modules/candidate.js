import api from '@/service'

import * as types from '../mutation_types'

export default {
  namespaced: true,
  // 重要信息：state 必须是一个函数，
  // 因此可以创建多个实例化该模块
  state: () => ({
    list: []
  }),
  actions: {
    getList ({ commit }) {
      return api.get('candidate/list').then((result) => {
        commit(types.GET_CANDIDATE_LIST, result.data.list)
      })
    }
  },
  mutations: {
    [types.GET_CANDIDATE_LIST] (state, list) {
      state.list = list
    }
  }
}
