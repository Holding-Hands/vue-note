<template>
  <input type="text" :value="value" @input="handleInput">
</template>
<!--
在vue中，v-model 的值相当于默认传递了一个名为
value 的 prop和一个名为 input 的方法（注意，这个value的prop是需要在自定义组件内声明的
<VModel v-model="title"></VModel>
-->
<script>
export default {
  name: "index",
  props: {
    value: {
      default: '',
      type: [Number, String]
    },
    title: {
      type: String
    }
  },
  methods: {
    handleInput (e) {
      this.$emit('input', e.target.value);
    }
  }
}
</script>

<style scoped lang="less">
@height: 100px;
@width: @height;

#namespaces {
  .border {
    border-radius: 1px;
    border: 1px solid cyan
  }
}

.box {
  height: @height;
  width: @width;
  #namespaces .border
}
.mixin-class() {
  .box;
  border: 1px solid orange;
}
.mixin-class1 {
  .mixin-class();
}
</style>
