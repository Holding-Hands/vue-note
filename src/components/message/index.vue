<template>
  <div id="message">
    <div @click="onClick">
      <button>开启弹框</button>
    </div>
    <v-window
      v-show="show"
      :top="windowTop"
      :left="windowLeft"
      :z-index="100"
      :height="380"
      :width="600"
      @close="close"
    >
      <template v-if="show">
        <template>
          内容
        </template>
      </template>
    </v-window>
  </div>
</template>

<script>
import vWindow from './window/index.vue';

export default {
  components: {
    vWindow,
  },
  data() {
    return {
      show: false, // 是否显示弹框
      left: 0,
      windowTop: 0, // 窗口的初始top值
      windowLeft: 0, // 窗口的初始left值
    };
  },
  mounted() {
    this.getTopAndLeft();
  },
  methods: {
    // 关闭消息弹窗
    close() {
      this.show = false;
    },
    // 计算获得窗口的top和left
    getTopAndLeft() {
      const top = document.body.offsetHeight - 380;
      console.log(document.body.offsetHeight, 'document.body.offsetHeight')
      const left = document.body.offsetWidth - 600;
      this.windowTop = top;
      this.windowLeft = left;
    },
    onClick() {
      this.show = !this.show
    }
  },
  watch: {
    message(val) {
      this.show = val;
    },
  }
};
</script>

<style lang="less" scoped>
#message {
  .ui-window-header {
    background: #3e4353;
    color: #d5ddff;

    .filter-change {
      width: 135px;
      margin-left: 10px;

      .el-input__inner {
        height: 30px;
        border-radius: 20px;
      }
    }
  }

  .ui-window-header .header-actions .maximize {
    border-color: #d5ddff;
  }

  .ui-window-header .header-actions .minimize span {
    border-color: #d5ddff;
  }

  .ui-window[data-v-d3e343b0] {
    box-shadow: 0 0 5px #3e4353;
  }
}
</style>
