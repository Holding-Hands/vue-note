<template>
  <div>

  </div>
</template>

<script>
  import _ from 'lodash'
  export default {
    name: "index",
    data() {
      return {
        info: {}
      }
    },
    methods: {
      differenceBy() {
        console.log(_.differenceBy([{ 'x': 2 }, { 'x': 1 }], [{ 'x': 1 }], {'x':1}));
        console.log(_.differenceBy([{ 'x': 2 }, { 'x': 1 },{ 'x':1 }], { 'x':1 }));
        console.log(_.differenceWith([{ 'x': 2 }, { 'x': 1 }], [{ 'x': 1 }], function (a, b) {
          console.log(a)
          // console.log(b)

          return true
        }));
        console.log(_.differenceBy([3.1, 2.2, 1.3], [4.4, 2.5], Math.floor));
        console.log(_.differenceBy([{ 'x': 2 }, { 'x': 1 }], [{ 'x': 1 }], {'x':1}));
      },
      difference(item) {
        console.log(item);
      }
    },
    created() {
      this.differenceBy()
    }
  }
</script>

<style scoped>

</style>
