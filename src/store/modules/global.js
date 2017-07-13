/**
 * 选择语言
 */
// import * as types from '../mutation_types.js'
import langs from 'assets/lang'

const state = () => ({
  string: langs.cn
})

const getters = {
  string: state => state.string
}
export default {
  namespaced: true,
  state,
  getters
}
