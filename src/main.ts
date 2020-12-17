// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from './router/axios.js'
import moment from 'moment'
import sdUI from 'sudong-ui'

Vue.use(sdUI)

import 'sudong-ui/packages/theme-default/lib/index.min.css'


Vue.prototype.$axios = axios
Vue.prototype.$moment = moment
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
