<template>
  <div>
    <input type="text" :value="value" @input="handleInput">
<!--    <input type="text" v-model="valueCopy">-->
    <div class="box"></div>
    <div class="mixin-class1"></div>
  </div>
</template>

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
  created() {
    console.log(this.value)
  },
  computed: {
    valueCopy: {
      set (value) {
        console.log(value)
        this.$emit('update:value',value)
      },
      get ({ value }) {
        return value
      }
    }
  },
  methods: {
    handleInput (e) {
      this.$emit('update:modelValue', e.target.value);
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
