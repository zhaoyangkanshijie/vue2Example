import Vue from 'vue'
import Main from './Main.vue'
import router from './router'
import store from './store'
import cookie from 'vue-cookies'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.config.productionTip = false
Vue.use(cookie);
Vue.use(VueAxios,axios);

new Vue({
  router,
  store,
  render: h => h(Main)
}).$mount('#main')
