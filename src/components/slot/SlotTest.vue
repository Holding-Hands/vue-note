<template>
  <div>
<!--    <slot :user="user">{{user.name}}</slot>-->
    <div>
      <slot>子组件的内容</slot>
    </div>
    <div>
      <slot name="footer">子组件的内容footer</slot>
    </div>
    <div>
      <slot>子组件内容第二个匿名插槽</slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Slot",
    data() {
      return {
        user: {
          name :'zcy'
        }
      }
    }
  }
</script>

<style scoped>

</style>
<!--一个插槽，可以被多个slot插槽进行替换-->
