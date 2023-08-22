import CheckDialog from "@/components/Dialogs/CheckDialog.vue";

export const routes = [
  {
    hidden: false,
    path: '/',
    redirect: '',
    name: 'Vue学习使用',
    children: [
      {
        path: '/Slot',
        name: 'Slot插槽',
        component: () => import('../components/Slot/Slot.vue'),
        meta: { title: 'Slot插槽' },
      },
      {
        path: '/Transition',
        name: 'Transition动画',
      },
      {
        path: '/VModel',
        name: 'VModel原理',
      },
      {
        path: '/CheckDialog',
        name: 'CheckDialog',
      },
      {
        path: '/zindex',
        name: 'zindex',
      },
      {
        path: '/slide',
        name: 'slide',
      },
      {
        path: '/TreeSelect',
        name: 'TreeSelect',
      },
    ],
  },
  {
    path: '',
    name: '项目功能实现',
    children: [
      {
        path: '/FLV',
        name: 'FLV',
      },
      {
        path: '/PDFPreview',
        name: '在线PDF预览',
      },
      {
        path: '/Video',
        name: 'Video使用',
      },
      {
        path: '/Sortable',
        name: 'Sortable使用',
      },
      {
        path: '/Accordion',
        name: '手风琴',
      },
      {
        path: '/GridDrag',
        name: 'GridDrag',
      },
      {
        path: '/Select',
        name: '自定义MaxCount的Select',
      },
      {
        path: '/Upload',
        name: '上传下载原理',
      },
      {
        path: '/dialog',
        name: 'dialog利用promise原理',
      },
    ]
  },
]
