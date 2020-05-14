<template>
  <div
    class="ui-resizable"
    ref="resizeElement"
    :style="{width: `${width}px`, height: `${height}px`}"
    @mousedown="onMouseDown"
  >
    <template v-if="!disabled && !hasMaximized">
      <div
        v-for="resizeType of resizeTypes"
        class="ui-resizable-handle"
        :class="`ui-resizable-${resizeType}`"
        :data-resize-type="resizeType"
        :key="resizeType"
      >
      </div>
    </template>
    <slot></slot>
  </div>
</template>

<script>
import { getRelativeElementPosition } from './utils';

export default {
  name: 'resizable',
  props: {
    // 可以resize的方向，与css cursor中resize的鼠标形状对应
    // https://developer.mozilla.org/en-US/docs/Web/CSS/cursor
    resizeTypes: {
      validator(types) {
        const allTypes = ['n', 's', 'w', 'e', 'ne', 'nw', 'se', 'sw'];
        return types.every(t => allTypes.indexOf(t) !== -1);
      },
      default() {
        return ['n', 's', 'w', 'e', 'ne', 'nw', 'se', 'sw'];
      },
    },
    // 最低高度
    minHeight: {
      type: Number,
      default: 100,
    },
    // 最低宽度
    minWidth: {
      type: Number,
      default: 100,
    },
    maxHeight: {},
    // 是否禁用resize功能
    disabled: {
      type: Boolean,
      default: false,
    },
    // 初始宽度
    width: {
      type: Number,
      default: 500,
    },
    // 初始高度
    height: {
      type: Number,
      default: 300,
    },
  },
  data() {
    return {
      hasMaximized: false,
      resizeType: null,
      restorePosition: {},
      position: {},
      curWidth: 0,
      curHeight: 0,
    };
  },
  mounted() {
    window.addEventListener('resize', this.resize);
  },
  methods: {
    maximize() {
      const resizeElement = this.$el;
      if (this.hasMaximized) {
        const {
          top, left, outerHeight, outerWidth,
        } = this.restorePosition;
        resizeElement.style.top = `${top}px`;
        resizeElement.style.left = `${left}px`;
        resizeElement.style.height = `${outerHeight}px`;
        resizeElement.style.width = `${outerWidth}px`;
        this.hasMaximized = false;
        this.$emit('maximized', false);
      } else {
        this.restorePosition = getRelativeElementPosition(resizeElement);
        const {
          top, left, offsetTop, offsetLeft,
        } = this.restorePosition;
        const windowHeight = window.innerHeight;
        const windowWidth = window.innerWidth;
        resizeElement.style.height = `${windowHeight}px`;
        resizeElement.style.width = `${windowWidth}px`;
        resizeElement.style.top = `${top - offsetTop}px`;
        resizeElement.style.left = `${left - offsetLeft}px`;
        this.hasMaximized = true;
        this.$emit('maximized', true);
      }
    },
    onMouseMove(event) {
      const resizeElement = this.$el;
      let { clientX, clientY } = event;
      // 如果鼠标拖动到浏览器可视窗口外。就将clientX，clientY限制在窗口内
      if (clientX > window.innerWidth) {
        clientX = window.innerWidth;
      } else if (clientX < 0) {
        clientX = 0;
      }
      if (clientY > window.innerHeight) {
        clientY = window.innerHeight;
      } else if (clientY < 0) {
        clientY = 0;
      }
      const {
        clientY: initClientY,
        clientX: initClientX,
        outerHeight: initHeight,
        outerWidth: initWidth,
        top: initTop,
        left: initLeft,
      } = this.position;
      let height = initHeight;
      let width = initWidth;
      let top = initTop;
      let left = initLeft;
      // 鼠标在Y方向移动的差值
      const mouseYOffset = clientY - initClientY;
      // 鼠标在X方向移动的差值
      const mouseXOffset = clientX - initClientX;
      switch (this.resizeType) {
        case 'e':
          width = initWidth + mouseXOffset;
          break;
        case 's':
          height = initHeight + mouseYOffset;
          break;
        case 'se':
          width = initWidth + mouseXOffset;
          height = initHeight + mouseYOffset;
          break;
        case 'n':
          top = initTop + mouseYOffset;
          height = initHeight - mouseYOffset;
          break;
        case 'w':
          left = initLeft + mouseXOffset;
          width = initWidth - mouseXOffset;
          break;
        case 'ne':
          top = initTop + mouseYOffset;
          height = initHeight - mouseYOffset;
          width = initWidth + mouseXOffset;
          break;
        case 'nw':
          top = initTop + mouseYOffset;
          height = initHeight - mouseYOffset;
          left = initLeft + mouseXOffset;
          width = initWidth - mouseXOffset;
          break;
        case 'sw':
          height = initHeight + mouseYOffset;
          left = initLeft + mouseXOffset;
          width = initWidth - mouseXOffset;
          break;
        default:
          break;
      }
      // 如果resize宽度小于最小值，就将宽度重置成最小值
      if (width < this.minWidth) {
        width = this.minWidth;
        // 包含w-resize时宽度是由left决定，所以要重置left
        if (this.resizeType.indexOf('w') !== -1) {
          left = initLeft + (initWidth - width);
        }
      }
      // 与最小宽度的逻辑相同
      if (height < this.minHeight) {
        height = this.minHeight;
        if (this.resizeType.indexOf('n') !== -1) {
          top = initTop + (initHeight - height);
        }
      }

      // 根据拖拽结果赋值元素的width height top left值
      resizeElement.style.width = `${width}px`;
      resizeElement.style.height = `${height}px`;
      resizeElement.style.top = `${top}px`;
      resizeElement.style.left = `${left}px`;
    },
    onMouseUp() {
      if (this.resizeType) {
        this.resizeType = null;
        document.removeEventListener('mousemove', this.onMouseMove, true);
        document.removeEventListener('selectstart', this.preventSelect);
        document.addEventListener('mouseup', this.onMouseUp, true);
      }
    },
    preventSelect(event) {
      event.preventDefault();
    },
    onMouseDown(event) {
      const resizeElement = this.$el;
      const resizeHandle = event.target;
      this.resizeType = resizeHandle.dataset.resizeType;
      if (!this.resizeType) {
        return;
      }
      const { clientX, clientY } = event;
      this.position = {
        clientX,
        clientY,
        ...getRelativeElementPosition(resizeElement),
      };
      document.addEventListener('mousemove', this.onMouseMove, true);
      document.addEventListener('mouseup', this.onMouseUp, true);
      document.addEventListener('selectstart', this.preventSelect);
    },
    resize() {
      if (this.hasMaximized) {
        const resizeElement = this.$el;
        const restorePosition = getRelativeElementPosition(resizeElement);
        const {
          top, left, offsetTop, offsetLeft,
        } = restorePosition;
        const windowHeight = window.innerHeight;
        const windowWidth = window.innerWidth;
        resizeElement.style.height = `${windowHeight}px`;
        resizeElement.style.width = `${windowWidth}px`;
        resizeElement.style.top = `${top - offsetTop < 0 ? 0 : top - offsetTop}px`;
        resizeElement.style.left = `${left - offsetLeft < 0 ? 0 : top - offsetLeft}px`;
      }
    },
  },
};
</script>

<style lang="less" scoped>
 /* @resizeTypes: "n", "s", "w", "e", "ne", "nw", "se", "sw";
  $handleSize: 7px; // handle的长度
  $handleOutbound: -5px; // handle在边界外的长度
  $cornerIndex: 5;
  $cornerSize: 8px;*/

.ui-resizable {
  position: relative;
  box-sizing: border-box;
}

/*@each $type in $resizeTypes {*/
/*  .ui-resizable-#{$type} {*/
/*    cursor: #{$type}-resize;*/
/*  }*/
/*}*/
 /* each(@resizeTypes, {
    .ui-resizable-@{val} {
      cursor: @resizeTypes-resize;
    }
  })*/

.ui-resizable-s {
  z-index: 5 - 1;
  height: 7px;
  width: 100%;
  left: 0;
  bottom: -5px;
}

.ui-resizable-n {
  z-index: 5 - 1;
  height: 7px;
  width: 100%;
  left: 0;
  top: -5px;
}

.ui-resizable-e {
  z-index: 5 - 1;
  right: -5px;
  height: 100%;
  width: 7px;
  top: 0;
}

.ui-resizable-w {
  z-index: 5 - 1;
  left: -5px;
  height: 100%;
  width: 7px;
  top: 0;
}

.ui-resizable-nw {
  z-index: 5;
  width: 8px;
  height: 8px;
  left: 1px;
  top: 1px;
}

.ui-resizable-ne {
  z-index: 5;
  width: 8px;
  height: 8px;
  right: 1px;
  top: 1px;
}

.ui-resizable-sw {
  z-index: 5;
  width: 8px;
  height: 8px;
  left: 1px;
  bottom: 1px;
}

.ui-resizable-se {
  z-index: 5;
  width: 8px;
  height: 8px;
  right: 1px;
  bottom: 1px;
}

.ui-resizable-handle {
  position: absolute;
  font-size: 0.1px;
  display: block;
  -ms-touch-action: none;
  touch-action: none;
}
</style>
