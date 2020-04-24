import Vue from 'vue'
import App from '@/App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from "@/router"
import store from "@/store"
import axios from 'axios'
import qs from 'qs'

Vue.prototype.qs = qs;
Vue.config.productionTip = false;
Vue.use(ElementUI);

axios.defaults.baseURL = 'http://localhost:8088/api';
Vue.prototype.$axios = axios;
Vue.config.productionTip = false;


new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app');