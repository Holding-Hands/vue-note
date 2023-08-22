<template>
  <div id="main">
        <message />

    <input type="text" autofocus v-focus="'cyan'" @keyup.f2="aaa">

    <Menu style="margin-bottom: 20px;"/>
    <router-view/>
  </div>
</template>

<script>
import Menu from './components/Menu.vue'
import message from './components/message/index'
const path = require('path')
export default {
  components: {
    message,
    Menu
  },
  mounted() {
    console.log(path.resolve(__dirname))
    console.log(path, 'path')
  },
  data() {
    return {
      arr: [1, 2, 3, 4, 5],
      obj: {
        name: 'zcy'
      },
      name: 'message',
    }
  },
  methods: {
    handlePrint() {
      console.log(this.obj)
      console.log('父组件的handlePrint');
    },
    aaa() {
      console.log(11)
    }
  },
  // 自定义修饰符
  config: {
    keyCodes: {
      f2: 113,
      f3: 114
    }
  },
  directives: {
    'focus': {
      // 样式相关在bind里设置
      bind(el, binding) {
        el.style.color = binding.value
        // 绑定到元素的时候立即执行，只执行一次 元素没有放到dom中 ，内存中就调用了，
        // 只要绑定自定义样式指令不管元素有没有插入到页面中去，都有了内联样式
      },
      // 行为相关在inserted里设置
      inserted(el) {
        console.log('inserted'); // 插入到dom中会执行这个函数， 插入页面中才调用
      },
      updated(el) {
        console.log('updated'); // vnode更新时候执行这个函数
      }
    }
  }
};
</script>
<style lang="scss">
#main {
  overflow: hidden;
  height: 100vh;
  width: 100vw;
}
.v-enter,
.v-leave-to {
  opacity: 0;
  transform: translateX(100vh);
}

.v-enter-to,
.v-leave {
  /*transform: translateX(500px);*/
}

.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}

.move-enter {
  transform: translateX(100%);
  opacity: 0
}

.move-leave-to {
  transform: translateX(-100%);
  opacity: 0;
  position: absolute;
  width: 100%;
}

.move-enter-active, .move-leave-active {
  transition: all 2s ease;
}

.transition {
  min-height: 100px;
}

.router-link-active {
  color: red;
}

::v-deep .el-select {
  $num1: 3;

  .el-tag.el-tag--info:nth-child(n + 3) {
    display: none !important;
  }
}
</style>
