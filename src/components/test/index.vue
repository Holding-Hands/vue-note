<template>
  <div>
    <button @click="onClickButton">点我</button>
    <div class="div" @click="onClickDiv"></div>
  </div>
</template>

<script>
  export default {
    methods: {
      onClickButton() {
        console.log('点击子组件的button');
      },
      onClickDiv() {
        console.log('点击子组件的div')
        this.$emit('print')
      }
    }
  }
</script>

<style scoped>
.div {
  background: #0086b3;
  height: 100px;
  width: 100px;
}
</style>
