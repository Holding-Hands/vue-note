import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './style/common.less'

import api from './api'

Vue.prototype.$api = api
import flvjs from 'flv.js'
Vue.use(flvjs)

// 拖拽的插件 使用v-drag就可以拖拽
import vueDrag from 'vue-dragging'
Vue.use(vueDrag)
import ElTreeSelect from 'el-tree-select';
Vue.use(ElTreeSelect);

Vue.config.productionTip = false
import axios from 'axios'
Vue.prototype.$axios = axios

import _ from 'lodash'
Vue.prototype.$lodash = _
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
import Dialog from "./components/Dialogs";
//安装toast
Vue.use(Dialog);
console.log(App, 'render()')
// App 是一个对象 并且没有 template 内部已经解析了render函数了 所以 不再有template -> ast -> render这个步骤了
// .vue中的template 哪去了 是因为之前安装的一个插件 vue-template-compiler 已经解析了
// 这就是为什么使用 runtime-only 不使用 runtime compiler
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
