<template>
  <div id="main">
    <!--    <message />-->

    <!--    <div class="father">-->
    <!--      <div class="child"></div>-->
    <!--    </div>-->

    <!--    <button @click="isShowDialog">点击开启弹框</button>-->

    <!--    <slide />-->
    <!--    <Menu />-->

    <!--    <lodash />-->

<!--        <div @contextmenu.prevent.shift="father" @keyup.f2="father" :style="{background: 'cyan'}" :class="['aaa']">aaa</div>-->

    <!--    <label>-->
    <!--      <input type="text" autofocus v-focus="'cyan'" @keyup.f2="aaa"  ref="focus">-->
    <!--    </label>-->

    <!--    <button @click="toggle=!toggle">切换</button>-->

    <!--    <transition>-->
    <!--      <div class="test" v-if="toggle">我是动画</div>-->
    <!--    </transition>-->

    <!--    <transitions />-->
    <!--    可以用来多个组件切换-->
    <!--    <button @click="name='message'">切换message件</button>-->
    <!--    <button @click="name='Table'">切换Table组件</button>-->
    <!--    &lt;!&ndash; 组件切换的动画 &ndash;&gt;-->
    <!--    <div class="transition">-->
    <!--      <transition appear name="move">-->
    <!--        <component :is="name"></component>-->
    <!--      </transition>-->
    <!--    </div>-->

    <!--  组件点击事件要加native  -->
    <test v-bind:title.sync="title" @handlePrint="handlePrint"/>

    <ul>
      <li v-for="(item, index) in arr" :key="index" >
        <input type="checkbox"> {{item}}
        <button @click="arr.splice(index, 1)">删除</button>
      </li>
    </ul>
    <!--    <zindex/>-->

<!--    <router-link to="/GridDrag/111">home</router-link>-->
<!--    <button @click="handleClickBtn">home</button>-->
    {{ obj.title }}
    <VModel v-model="title" @on-change="onChange"></VModel>
    <router-view/>
  </div>
</template>

<script>
import VModel from './components/VModel'
import transitions from './components/transition'
import message from './components/message/index'
import Menu from './components/menu'
import slide from './components/Slide'
import lodash from './components/lodash'
import test from './components/test'
import zindex from "./components/ZIndex/zindex";

export default {
  components: {
    // message,
    // Menu,
    // slide,
    // lodash,
    // transitions,
    test,
    VModel
    // zindex
  },
  mounted() {
    setTimeout(() => {
      this.title = '1111'
    }, 2000)
  },
  data() {
    return {
      arr: [1,2,3,4,5],
      title: '这是一个title',
      obj: {
        title: 'lalal',
        name: 'zcy'
      },
      toggle: false,
      name: 'message'
    }
  },
  methods: {
    onChange (data) {
      console.log(data, 'data')
    },
    handlePrint() {
      console.log(this.obj)
      console.log('父组件的handlePrint');
    },
    handleClickBtn (){
      this.$router.push({
        path: '/GridDrag/111'
      },((a) => {
        // console.log(a)
      }))
    },
    fConfirm() {
      console.log('confirm')
    },
    father() {
      console.log(1);
    },
    isShowDialog() {
      this.$dialog({
        title: 'zcy',
        footerContent: '我是footerContent'
      })
        .then(() => {
        this.fConfirm();
      })
        .catch(() => {
        this.fCancel();
      })
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
<style>
#main {
  overflow: hidden;
}

/*.draggable {*/
/*  background: #795da3;*/
/*  color: white;*/
/*  width: 100px;*/
/*  height: 100px;*/
/*}*/
  .aaa {
  color: #67C23A !important;
}

/*
 <transition
    enter-active-class="animated fadeInDown"
    leave-active-class="animated fadeOutUp"
    :duration='400'> // 入场400ms，离场400ms :duration='{leave:300,enter:400}'
  <div v-if="toggle">包裹动画元素</div>
</transition>
**另一种写法**
<transition
      enter-active-class="fadeInDown"
      leave-active-class="fadeOutUp">
    <div v-if="toggle" class="animated">包裹动画元素</div>
  </transition>
*/
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

.test {
  height: 200px;
  width: 50px;
  background: #795da3;
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
</style>
