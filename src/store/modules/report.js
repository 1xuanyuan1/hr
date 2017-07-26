/**
 * 报告信息
 */
import api from '@/service'

import * as types from '../mutation_types'
const state = () => ({
  data: {}
})

const actions = {
  getReportInfo ({ commit }, {cookie, ...param}) {
    return api.get('report/info', param, cookie).then(req => {
      commit(types.GET_REPORT_INFO, req.data)
    })
  }
}

const mutations = {
  [types.GET_REPORT_INFO] (state, data) {
    state.data = data
  }
}

const getters = {
  allNum: state => state.data.allNum || 0,
  success: state => state.data.success || [],
  talent: state => state.data.talent || []
}
export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
