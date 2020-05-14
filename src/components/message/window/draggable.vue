<template>
  <div
    class="vip_draggable"
    ref="draggedElement"
    :class="{
      'vip_hidden': !visible
    }"
    :style="{
      top: `${top}px`,
      left: `${left}px`,
      zIndex
    }"
    @mousedown.capture="onDragStart"
  >
    <slot></slot>
  </div>
</template>

<script>

export default {
  name: 'draggable',
  props: {
    outOfWindow: {
      type: Boolean,
      default: false, // 是否允许拖出窗口外
    },
    disabled: {
      type: Boolean,
      default: false, // 是否禁用拖拽
    },
    handle: {
      type: String,
      default: '', // 可以触发拖拽的子元素
    },
    top: {
      type: Number,
      default: 0, // 初始的top
    },
    left: {
      type: Number,
      default: 0, // 初始的left
    },
    zIndex: {
      type: Number,
      default: 1, // zIndex值
    },
    visible: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      click: false,
    };
  },
  mounted() {
    window.addEventListener('resize', this.resize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resize);
  },
  methods: {
    /**
     * 获取元素到document左边和顶部的距离
     * @param {HTMLElement} element
     */
    getTopAndLeft(element) {
      let l = element.offsetLeft;
      let t = element.offsetTop;
      while (element === element.offsetParent) {
        l += element.offsetLeft;
        t += element.offsetTop;
      }
      return {
        l,
        t
      };
    },
    onPreventSelect(event) {
      event.preventDefault();
    },
    onDragStart(event) {
      if (this.disabled) {
        return;
      }
      // 判断是否是handle元素上触发的事件
      const draggedElement = this.$refs.draggedElement;
      const handleElement = this.handle
        ? draggedElement.querySelector(this.handle)
        : draggedElement;
      if (handleElement && event.target.isSameNode(handleElement)) {
        this.isDragging = true;
        const { clientX, clientY } = event;
        const {
          top,
          left,
          height,
          width,
        } = draggedElement.getBoundingClientRect();
        this.position = {
          clientX, clientY, top, left, height, width,
        };
        document.addEventListener('mousemove', this.onDrag, true);
        document.addEventListener('mouseup', this.onDragEnd);
        document.addEventListener('selectstart', this.onPreventSelect);
      }
    },
    onDrag(event) {
      console.log(event)
      if (this.isDragging) {
        this.click = true;
        const { clientX, clientY } = event;
        const {
          clientX: initClientX,
          clientY: initClientY,
          top: initTop,
          left: initLeft,
          height: initHeight,
          width: initWidth,
        } = this.position;
        let t = initTop + clientY - initClientY;
        let l = initLeft + clientX - initClientX;
        if (!this.outOfWindow) {
          const windowHeight = window.innerHeight;
          const windowWidth = window.innerWidth;
          t = Math.max(0, t);
          t = Math.min(t, windowHeight - initHeight);
          l = Math.max(0, l);
          l = Math.min(l, windowWidth - initWidth);
        }
        this.$refs.draggedElement.style.top = `${t}px`;
        this.$refs.draggedElement.style.left = `${l}px`;
        event.stopImmediatePropagation();
      }
    },
    onDragEnd() {
      if (!this.click) {
        this.$emit('click');
      }
      this.click = false;
      this.isDragging = false;
      document.removeEventListener('mousemove', this.onDrag, true);
      document.removeEventListener('mouseup', this.onDragEnd);
      document.removeEventListener('selectstart', this.onPreventSelect);
    },
    resize() {
      if (!this.outOfWindow) {
        let { l, t } = getTopAndLeft(this.$el);
        const { width, height } = this.$el.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const windowWidth = window.innerWidth;
        t = Math.max(0, t);
        t = Math.min(t, windowHeight - height);
        l = Math.max(0, l);
        l = Math.min(l, windowWidth - width);
        this.$refs.draggedElement.style.top = `${t}px`;
        this.$refs.draggedElement.style.left = `${l}px`;
      }
    },
  },
};
</script>

<style scoped>
.vip_draggable {
  position: fixed;
  z-index: 10;
}
.vip_draggable.vip_hidden {
  visibility: hidden;
  z-index: -100;
}
</style>
