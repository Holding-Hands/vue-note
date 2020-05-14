<template>
  <div>
    <slot :user="user">{{user.name}}</slot>
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
