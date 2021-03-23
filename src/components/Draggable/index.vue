<template>
  <div id="draggable">
    <div class="drag-item" @dragover="handleDragOver" draggable="true" @drop="onDrop" @ondrag="ondrag" @ondragstart="onDragStart(event)">1</div>
    <div class="drag-item" @dragover="handleDragOver" draggable="true" @drop="onDrop" @ondrag="ondrag" @ondragstart="onDragStart(event)">2</div>
    <div class="drag-item" @dragover="handleDragOver" draggable="true" @drop="onDrop" @ondrag="ondrag" @ondragstart="onDragStart(event)">3</div>
  </div>
</template>

<script>
import draggable from "vuedraggable"

export default {
  name: "index",
  methods: {
    onDragStart(e) {
      console.log(e, 'onDragStart')
    },
    /**
     * 在拖动目标上触发事件 (源元素) 元素正在拖动时触发
     */
    ondrag(){
      console.log('ondrag')
    },
    /**
     * 当放置被拖数据时，会发生 drop 事件
     */
    onDrop(e) {
      e.preventDefault();
      console.log('onDrop')
    },
    /**
     * 使用dragover事件 拖拽目标拖拽到指定目标 才能触发drag相关事件
     * @param e
     */
    handleDragOver(e) {
      // console.log('dragover', e)
      e.preventDefault()
    }
  }
}
</script>

<style scoped lang="less">
#draggable {
  display: flex;
  .drag-item {
    width: 100px;
    height: 100px;
    background: cadetblue;
    margin-right: 10px;
  }
}
</style>
