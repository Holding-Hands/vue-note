import Vue from 'vue'
import VueRouter from 'vue-router'
import Slot from '../components/Slot/Slot'
import Accordion from '../components/Accordion'
import Flv from '../components/Flv'
import Video from '../components/Video'
import PDFPreview from '../components/PDFPreview'
import Sortable from '../components/Sortable'
import Draggable from '../components/Draggable'
import Transition from '../components/Transition'
import VModel from "@/components/VModel/index.vue";
import CheckDialog from "@/components/Dialogs/CheckDialog.vue";

Vue.use(VueRouter)

const routes = [
  { path: '/Slot', name: 'Slot', component: Slot }, // 插槽笔记
  { path: '/Transition', name: 'Draggable', component: Transition }, // vue动画
  { path: '/VModel', name: 'VModel', component: VModel }, // vue动画
  { path: '/CheckDialog', name: 'CheckDialog', component: CheckDialog }, // vue动画

  { path: '/Accordion', name: 'Accordion', component: Accordion }, // 手风琴笔记
  { path: '/Flv', name: 'Flv', component: Flv }, // Flv使用
  { path: '/Video', name: 'Video', component: Video }, // Video使用的注意
  { path: '/PDFPreview', name: 'Video', component: PDFPreview }, // Video使用的注意
  { path: '/Sortable', name: 'Sortable', component: Sortable }, // Video使用的注意
  { path: '/Draggable', name: 'Draggable', component: Draggable }, // h5原生drag

  { path: '/Select', name: 'Select', component: () => import('../components/Select') }, // 自定义maxCount标签
  { path: '/Upload', name: 'Upload', component: () => import('../components/Upload') }, // 上传下载

  { path: '/PracticeDrag', name: 'PracticeDrag', component: () => import('../components/PracticeDrag') }, // 练习PracticeDrag
  { path: '/GridDrag', beforeEnter: (to, from, next) => {next()}, props: true, meta: { title: '111' }, name: 'GridDrag', component: () => import('../components/GridDrag') }, // GridDrag
]

const router = new VueRouter({
  // mode: 'history',
  routes
})

// 全局后置钩子
router.afterEach((to, from) => {
  document.title = '啦啦啦'
})

// 全局前置守卫
router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})

// 路由独享的守卫


export default router
