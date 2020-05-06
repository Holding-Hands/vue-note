<template>
  <div id="main">
<!--        <Table />-->
<!--        <Table1 />-->
<!--    <TipDialog-->
<!--      :f-cancel="fCancel"-->
<!--      :f-confirm="fConfirm"-->
<!--      :isShowDialog.sync="toggle"-->
<!--      title="父组件的标题"-->
<!--      content="父组件的内容"-->
<!--    />-->

<!--    <CheckDialog :isShowCheckDialog.sync="toggle" :f-confirm="fCancel">-->
<!--      <Slot slot="title">-->
<!--        <p>父组件的标题b</p>-->
<!--      </slot>-->
<!--      <slot slot="content">-->
<!--        <div>父组件的内容b</div>-->
<!--      </slot>-->
<!--    </CheckDialog>-->
<!--    <SlotTest >-->
<!--      <template #default="father">-->
<!--        <slot>{{father.user.name}}</slot>-->
<!--      </template>-->
<!--    </SlotTest>-->
<!--    <message />-->
<!--    <Filter />-->
<!--    <div class="father">-->
<!--      <div class="child"></div>-->
<!--    </div>-->
<!--    <button @click="isShowDialog">点击开启弹框</button>-->
<!--    <FlightsCardList />-->
<!--    <SlotTest>-->
<!--      <template>zcy</template>-->
<!--    </SlotTest>-->
<!--    <video ></video>-->
<!--    <video src="http://192.168.163.220/live?port=1935&app=avms-video&stream=test3" controls="controls">-->
<!--      您的浏览器不支持 video 标签。-->
<!--    </video>-->
<!--    <video id="example_video_1" class="video-js vjs-default-skin" controls width="100%" src="http://192.168.163.220/live?port=1935&app=avms-video&stream=test3"-->
<!--           data-setup="{}">-->
<!--    </video>-->
<!--    <slide />-->
<!--    <Flv />-->
<!--    <Menu />-->
<!--    <lodash />-->
<!--    <div @contextmenu.prevent.shift="father" @keyup.f2="father" :style="{background: 'cyan'}" :class="['aaa']">aaa</div>-->
<!--    <label>-->
<!--      <input type="text" autofocus v-focus="'cyan'" @keyup.f2="aaa"  ref="focus">-->
<!--    </label>-->
    <button @click="toggle=!toggle">切换</button>
    <div>----------------------------------------------</div>
    <transition>
      <div class="test" v-if="toggle">我是动画</div>
    </transition>
    <transitions />
    可以用来多个组件切换
    <button @click="name='message'">切换message件</button>
    <button @click="name='Table'">切换Table组件</button>
    <!-- 组件切换的动画 -->
    <div class="transition">
      <transition appear name="move">
        <component :is="name"></component>
      </transition>
    </div>
  </div>
</template>

<script>
  import transitions from './components/transition'
  import Flv from "./flv/Flv";
  import message from './components/message/index'
  import SlotTest from "./views/SlotTest";
  import Table from "./views/Table";
  import Table1 from "./views/Table1";
  import TipDialog from "./components/TipDialog/TipDialog";
  import CheckDialog from './components/CheckDialog'
  // import SlotTest from "./components/slot/SlotTest";
  import Menu from './components/menu'
  import slide from './components/slide'
  import FlightsCardList from './components/FlightsCardList'
  import Filter from './components/FilterDialog/index'
  import lodash from './components/lodash'
  import Vue from "vue";
  export default {
    name: "test",
    components: {
      Table,
      // Table1
      // TipDialog
      // CheckDialog,
      // SlotTest
      // Filter,
      message,
      // SlotTest
      // FlightsCardList
      // Flv,
      // Menu,
      // slide,
      // lodash,
      transitions
    },
    data() {
      return {
        cancel: '取消',
        toggle: false,
        name: 'message'
      }
    },
    created() {
      var arr = [1,2,3,4,5]
      _.pull(arr,1,2,3)
      this.$nextTick().then(() => {
        console.log(111)
      })
      // this.$axios.get('/api').then(console.log)
    },
    mounted() {

    },
    methods: {
      fCancel(e) {
        if (e.keyCodes === 65) {
          console.log("cancel")
        }
      },
      fConfirm() {
        console.log('confirm')
      },
      father() {
        console.log(1);
      } ,
      isShowDialog() {
        // this.toggle = !this.toggle;
        this.$dialog({
          title:'zcy',
          // headerContent:'',
          footerContent:'我是footerContent'
        }).then(() => {
          this.fConfirm();
        }).catch(() => {
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
    color: #67C23A!important;
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
  .v-leave{
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
  .move-enter-active, .move-leave-active{
    transition: all 2s ease;
  }
  .transition {
    min-height: 100px;
  }
</style>
