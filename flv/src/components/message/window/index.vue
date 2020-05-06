<template>
  <ui-draggable
    handle=".ui-window-header"
    :top="top"
    :left="left"
    :z-index="zIndex + 1"
    :disabled="!draggable || maximized"
    :visible="visible"
  >
    <ui-resizable
      ref="resizable"
      :disabled="!resizable"
      :width="width"
      :height="height"
      :z-index="zIndex + 2"
      :resizeTypes="['se', 's', 'e']"
      :min-height="370"
      :min-width="600"
      @maximized="onMaximized"
    >
      <div class="ui-window"
        :style="{zIndex}">
        <header
          class="ui-window-header"
          @dblclick="onMaximizeWindow"
        >
          <h1 class="header-title">
            <slot name="title">
              {{title}}
            </slot>
          </h1>
          <div class="header-actions">
            <!-- 最小化 -->
            <a v-if="minimizable"
               class="ui-action ui-minimize">
				<i class="el-icon-minus"></i>
            </a>
			<!-- 最大化 -->
            <a
              v-if="maximizable"
              class="ui-action ui-maximize"
              :title="maximized ? '恢复' : '最大化'"
              @click="onMaximizeWindow"
            >
              <i v-if="!maximized" class="maximize"></i>
              <i v-else class="minimize">
                <span></span>
                <span></span>
              </i>
            </a>
			<!-- 删除 -->
            <a
              v-if="closable"
              class="ui-action ui-close"
              @click="onCloseWindow"
              title="关闭窗口"
            >
              <i class="el-icon-close"></i>
            </a>
          </div>
        </header>
        <main class="ui-window-content">
          <slot></slot>
        </main>
      </div>
    </ui-resizable>
  </ui-draggable>
</template>

<script>
import UiResizable from './resize.vue';
import UiDraggable from './draggable.vue';

export default {
  name: 'ui-window',
  components: {
    'ui-resizable': UiResizable,
    'ui-draggable': UiDraggable,
  },
  props: {
    title: {
      type: String,
      default: '', // 标题名称
    },
    draggable: {
      type: Boolean,
      default: true, // 是否可拖动
    },
    resizable: {
      type: Boolean,
      default: true, // 是否可以改变大小
    },
    closable: {
      type: Boolean,
      default: true, // 是否可以关闭
    },
    maximizable: {
      type: Boolean,
      default: true, // 能否最大化
    },
    minimizable: {
      type: Boolean,
      default: false, // 能否最小化
    },
    zIndex: {
      type: Number,
      default: 1, // zIndex值
    },
    width: {
      type: Number,
      default: 650, // 初始宽度
    },
    height: {
      type: Number,
      default: 370, // 初始高度
    },
    top: {
      type: Number,
      default: 0, // 初始的top位置
    },
    left: {
      type: Number,
      default: 0, // 初始的left位置
    },
    visible: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      style: {
        zIndex: 1,
      },
      maximized: false,
    };
  },
  methods: {
    /**
     * 点击关闭按钮时触发
     */
    onCloseWindow() {
      this.$emit('close');
    },
    /**
     * 最大化时触发的方法
     */
    onMaximizeWindow() {
      this.$refs.resizable.maximize();
    },
    /**
     * 窗口最大化或恢复后触发
     * @param {boolean} maximized 是否最大化
     */
    onMaximized(maximized) {
      this.maximized = maximized;
    },
  },
};
</script>

<style lang="less" scoped>
/*$header-height: 50px;*/
.ui-window {
  height: 100%;
  width: 100%;
  box-shadow: 0 0 5px #916d3d;
  background: #ebebeb;
}

.ui-window-content {
  position: relative;
  height: calc(100% - 50px);
  overflow: auto;
  width: 100%;
}

.ui-window-header {
  height: 50px;
  background: #191615;
  padding: 0 15px 0 0;
  color: #916d3d;
  position: relative;
  user-select: none;
  display: flex;
  justify-content: space-between;
  .header-title {
    line-height: 50px;
    font-size: 14px;
    font-weight: normal;
  }
  .header-actions {
    float: right;
    .ui-action {
      cursor: pointer;
      line-height: 50px;
    }
    .ui-action:not(:last-child) {
      margin-right: 6px;
    }
    .maximize {
      display: inline-block;
      height: 12px;
      width: 12px;
      box-sizing: border-box;
      border: 1px solid #916d3d;
      border-bottom-width: 2px;
    }
    .minimize {
      display: inline-block;
      height: 12px;
      width: 12px;
      position: relative;
      span:nth-child(1) {
        box-sizing: border-box;
        border: 1px solid #916d3d;
        display: block;
        height: 10px;
        width: 10px;
        position: absolute;
        top: 0;
        left: 0;
      }
      span:nth-child(2) {
        box-sizing: border-box;
        border: 1px solid #666;
        display: block;
        height: 10px;
        width: 10px;
        position: absolute;
        bottom: 0;
        right: 0;
      }
    }
  }
}
</style>
