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
    <Slot>
      <template>
        我想替换第一个匿名插槽
      </template>
      <!--   v-slot:footer="scoped" 简写 #footer="scoped"  -->
      <!--   如果想获取插槽里的内容可以这样写 同时写多个会覆盖       -->
      <template v-slot:footer>默认插槽内容</template>
      <template v-slot:footer="scoped">
        <!--            qqqqqqqq-->{{ scoped.content }}
        <!--            <slot>qqqqqq</slot>-->
        <!--            <slot>{{user.name}}</slot>-->
        <!--            <slot slot="footer">父组件内容1&#45;&#45;footer</slot>-->
        <!--            <slot slot="footer">父组件内容2&#45;&#45;footer</slot>-->
        <!--            <slot>父组件内容2</slot>-->
        <!--            <slot>父组件内容3</slot>-->
      </template>
    </Slot>
    <!--    <message />-->
    <!--    <Filter />-->
    <!--    <div class="father">-->
    <!--      <div class="child"></div>-->
    <!--    </div>-->
    <!--    <button @click="isShowDialog">点击开启弹框</button>-->
    <!--    <FlightsCardList />-->
    <!--    <Slot>-->
    <!--      <template>zcy</template>-->
    <!--    </Slot>-->
    <!--    <video ></video>-->
    <!--    <video src="http://192.168.163.220/live?port=1935&app=avms-video&stream=test3" controls="controls">-->
    <!--      您的浏览器不支持 video 标签。-->
    <!--    </video>-->
    <!--    <video id="example_video_1" class="video-js vjs-default-skin" controls width="100%" src="http://192.168.163.220/live?port=1935&app=avms-video&stream=test3"-->
    <!--           data-setup="{}">-->
    <!--    </video>-->
    <!--    <slide />-->
    <!--    <Menu />-->
    <!--    <lodash />-->
    <!--    <div @contextmenu.prevent.shift="father" @keyup.f2="father" :style="{background: 'cyan'}" :class="['aaa']">aaa</div>-->
    <!--    <label>-->
    <!--      <input type="text" autofocus v-focus="'cyan'" @keyup.f2="aaa"  ref="focus">-->
    <!--    </label>-->
    <!--    <button @click="toggle=!toggle">切换</button>-->
    <!--    <div>&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;</div>-->
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
    <!--    <ReferenceDetail />-->
    <!--    <test @click.native="onClick"/>-->
    <!--    <Video/>-->
    <!--    <zindex/>-->

    <router-view/>
  </div>
</template>

<script>
import ReferenceDetail from './components/ReferenceDetails'
import transitions from './components/transition'
import message from './components/message/index'
import Table from "./views/Table";
import Table1 from "./views/Table1";
import TipDialog from "./components/TipDialog/TipDialog";
import CheckDialog from './components/CheckDialog'
import Slot from "./components/Slot/Slot";
import Menu from './components/menu'
import slide from './components/Slide'
import FlightsCardList from './components/FlightsCardList'
import Filter from './components/FilterDialog/index'
import lodash from './components/lodash'
import Vue from "vue";
import test from './components/test'
import Video from "./components/video/video";
import zindex from "./components/ZIndex/zindex";

export default {
  components: {
    // Table,
    // Table1
    // TipDialog
    // CheckDialog,
    // Filter,
    // message,
    Slot,
    // FlightsCardList
    // Menu,
    // slide,
    // lodash,
    // transitions,
    // ReferenceDetail,
    // test,
    // Video, // 视频注意项
    // zindex
  },
  data() {
    return {
      cancel: '取消',
      toggle: false,
      name: 'message'
    }
  },
  created() {
    var arr = [1, 2, 3, 4, 5]
    _.pull(arr, 1, 2, 3)

    this.$api.apronTest.getApron().then(res => {
      console.log(res)
    })
    /**
     * 深层 扁平化数组
     *  @param {Array} arr 要被“抹平”的数组
     *  @param {String} key 子级数组的 key name
     *
     *  @eg:
     *  deepFlattenArr(
     *    [
     *      {
     *        resourceName:'a',
     *        resourceKey:'a',
     *        children:[
     *          {resourceName:'c',resourceKey:'c',children:[]}
     *        ]
     *       }
     *    ],
     *    'children'
     *  )
     *
     *  ->
     *
     *  [{resourceName:'a',resourceKey:'a'}, {resourceName:'c',resourceKey:'c'}]
     * {resourceName:'a',resourceKey:'a',children:[resourceName:'c',resourceKey:'c',children:[]]}
     */
    function deepFlattenArr(arr, key) {
      return _.flatMapDeep(arr, d => (_.isEmpty(d[key])
        ? d
        : deepFlattenArr(d[key], key)));
    }
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
    },
    isShowDialog() {
      // this.toggle = !this.toggle;
      this.$dialog({
        title: 'zcy',
        // headerContent:'',
        footerContent: '我是footerContent'
      }).then(() => {
        this.fConfirm();
      }).catch(() => {
        this.fCancel();
      })
    },
    aaa() {
      console.log(11)
    },
    onClick() {
      console.log('调用了父组件方法');
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
</style>
