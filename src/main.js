import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VeeValidate from 'vee-validate';
import axios from "axios";
Vue.config.productionTip = false

new Vue({
  router,
  VeeValidate,
  axios,
  render: h => h(App)
}).$mount('#app')
