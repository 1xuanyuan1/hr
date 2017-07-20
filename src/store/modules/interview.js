import api from '@/service'

import * as types from '../mutation_types'

// 重要信息：state 必须是一个函数，
// 因此可以创建多个实例化该模块
const state = () => ({
  eachCount: {},
  data: {}, // 所有面试人员信息
  pending: {},
  success: {},
  fail: {},
  talent: {}
})

const actions = {
  getEachCount ({ commit }, param = {}) {
    return api.post('interview/eachCount', param).then((result) => {
      commit(types.GET_INTERVIEW_EACHCOUNT, result.data)
    })
  },
  getList ({ commit }, param = {}) {
    return api.post('interview/list', param).then((result) => {
      if (param.status) {
        commit(types.GET_INTERVIEW_ONE_LIST, {data: result.data, status: param.status})
      } else {
        commit(types.GET_INTERVIEW_LIST, result.data)
      }
    })
  },
  getListMore ({ commit }, {param, page}) {
    return api.post(`interview/list?page=${page}`, param).then((result) => {
      if (param.status) {
        commit(types.GET_INTERVIEW_ONE_LIST_MORE, {data: result.data, status: param.status})
      } else {
        commit(types.GET_INTERVIEW_LIST_MORE, result.data)
      }
    })
  }
}

const mutations = {
  [types.GET_INTERVIEW_EACHCOUNT] (state, data) {
    let eachCount = {}
    for (let item of data) {
      eachCount[item._id] = item.num
    }
    state.eachCount = eachCount
  },
  [types.GET_INTERVIEW_LIST] (state, data) {
    state.data = data
  },
  [types.GET_INTERVIEW_LIST_MORE] (state, data) {
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
  [types.GET_INTERVIEW_ONE_LIST] (state, { status, data }) {
    if (!status) return
    state[status] = data
    state.eachCount[status] = data.total
  },
  [types.GET_INTERVIEW_ONE_LIST_MORE] (state, { status, data }) {
    if (!status) return
    state.eachCount[status] = data.total
    state[status] = {
      hasNext: data.hasNext,
      hasPrev: data.hasPrev,
      total: data.total,
      list: [
        ...state[status].list,
        ...data.list
      ]
    }
  }
}

const getters = {
  eachCount: state => state.eachCount
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
