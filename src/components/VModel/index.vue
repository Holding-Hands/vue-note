<template>
  <div>
    <input type="text" :value="value" @input="handleInput">
    <div class="box"></div>
    <div class="mixin-class1"> </div>
  </div>
</template>

<script>
export default {
  name: "index",
  props: {
    value: {
      default: '',
      type: [Number, String]
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
