<template>
  <div class="grid" ref="container">
    <div class="grid-item grid-item-1">1</div>
    <div class="grid-item grid-item-2">2</div>
    <div class="grid-item grid-item-3">3</div>

    <div class="grid-item grid-item-4">4</div>
    <div class="grid-item grid-item-5">5</div>
    <div class="grid-item grid-item-6">6</div>

  </div>
</template>

<script>
import Sortable from "sortablejs";

export default {
  name: "index",
  mounted() {
    const el = this.$refs.container;
    this.sixBigGridInstanceOne = new Sortable(el, {
      group: "shared",  // or { name: "...", pull: [true, false, 'clone', array], put: [true, false, array] }
      sort: true,  // boolean 定义是否列表单元是否可以在列表容器内进行拖拽排序
      delay: 0, // number 定义鼠标选中列表单元可以开始拖动的延迟时间；
      touchStartThreshold: 0, // px, how many pixels the point should move before cancelling a delayed drag event
      disabled: false, // boolean 定义是否此sortable对象是否可用，为true时sortable对象不能拖放排序等功能，为false时为可以进行排序，相当于一个开关；
      store: null,  // @see Store
      animation: 150,  // ms, number 单位：ms，定义排序动画的时间
      easing: "cubic-bezier(1, 0, 0, 1)", // Easing for animation. Defaults to null. See https://easings.net/ for examples.
      // filter: ".big-item",  // 过滤器，不需要进行拖动的元素
      draggable: ".grid-item",  // 允许拖拽的项目类名
      ghostClass: "sortable-ghost",  // drop placeholder的css类名
      chosenClass: "sortable-chosen",  // 被选中项的css 类名
      dragClass: "sortable-drag",  // 正在被拖拽中的css类名
      direction: 'horizontal', // 拖拽方向 (默认情况下会自动判断方向)
      forceFallback: false,  // 忽略 HTML5拖拽行为，强制回调进行
    });
  }
}
</script>

<style scoped>
.grid {
  background: #aaaaaa;
  height: 890px;
  display: grid;
  grid-template-columns: 200px 200px 200px;
  /*grid-template-columns: repeat(3, 1fr);*/
  grid-template-rows: 200px 200px 200px;
  gap: 30px;
  grid-auto-flow: column;
  /*grid-auto-columns: 50px;*/
  /*grid-auto-rows: 50px;*/
}

.grid-item {
  /*height: 100px;*/
}

.grid-item-1 {
  background: cadetblue;
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row-start: 1;
  grid-row-end: 3;
}

.grid-item-2 {
  background: aquamarine;
}

.grid-item-3 {
  background: brown;
}
.grid-item-4 {
  background: cadetblue;
}
.grid-item-5 {
  background: cyan;
}
.grid-item-6 {
  background: antiquewhite;
}
</style>
