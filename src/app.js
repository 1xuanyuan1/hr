// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import 'es6-promise/auto'
import App from './App.vue'
import { createRouter } from './router'
import { createStore } from './store'
import { sync } from 'vuex-router-sync'
import api from '@/service'
import * as utils from '@/utils'

import 'nprogress/nprogress.css'

// 表单验证
import VeeValidate, { Validator } from 'vee-validate'
import messages from 'assets/js/zh_CN.js'
Validator.updateDictionary({
  zh_CN: {
    messages
  }
})
const config = {
  errorBagName: 'errors', // change if property conflicts.
  delay: 0,
  locale: 'zh_CN',
  messages: null,
  strict: true
}
Vue.use(VeeValidate, config)

export function createApp () {
    // create router and store instances
  const router = createRouter()
  const store = createStore()

  // sync so that route state is available as part of the store
  sync(store, router)

  Vue.prototype.$api = api
  Vue.prototype.$dateFormat = utils.dateFormat
  Vue.prototype.$openMessage = utils.openMessage
  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })
  // return both the app and the router
  return { app, router, store }
}
