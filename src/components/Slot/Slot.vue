<template>
  <div>
    <slot :user="user">{{user.name}}</slot>
    <div>
      <slot>子组件的内容</slot>
    </div>
    <div>
      <slot name="footer" :aaa="user" content="content">子组件的内容footer111111111111</slot>
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
<!--如果有多个匿名插槽 那么外面使用插槽替换 的时候不指定 剧名插槽的话 会替换所有的匿名插槽-->

<!-- v-slot 只能使用在template上 vue指令 slot相当于属性可以作用于标签上 -->

<!-- vue2.5以下必须使用template vue2.6以上可以使用其他标签替换 例如div 但是使用v-slot必须用template 使用slot可以使用div等元素-->
