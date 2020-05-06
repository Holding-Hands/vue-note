import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import flvjs from 'flv.js'
Vue.use(flvjs)
Vue.config.productionTip = false
import axios from 'axios'
Vue.prototype.$axios = axios
// import _ from 'lodash'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
import Dialog from "./components/Dialogs";
//安装toast
Vue.use(Dialog);
import _ from 'lodash'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
