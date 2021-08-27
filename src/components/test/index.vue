<template>
  <div>
    <button @click="onClickButton">点我</button>
    <div class="div" @click="onClickDiv">
      {{ title }}
    </div>
  </div>
</template>

<script>

  export default {
    props: {
      title: {
        type: String,
        default: ''
      },
      name: {
        type: String,
        default: ''
      }
    },
    mounted() {
      console.log(this.title, this.name, 'props')
    },
    methods: {
      onClickButton() {
        console.log('点击子组件的button');
      },
      onClickDiv() {
        console.log('点击子组件的div')

        this.$emit('update:title', '哈哈哈')
        this.$emit('handlePrint')
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
