<template>
  <div>
    aaaaaaaaaa
    <FilterTree :categoryList="filterList" />
  </div>
</template>

<script>
  import FilterTree from "./FilterTree/FiterTree";
  export default {
    name: "index",
    data() {
      return {
        filterList:[
          {
            id:1,
            title:'first'
          },
          {
            id:2,
            title:'first'
          },
          {
            id:3,
            title:'first'
          },
          {
            id:4,
            title:'first'
          }
        ]
      }
    },
    components: {
      FilterTree
    }
  }
</script>

<style scoped>

</style>
