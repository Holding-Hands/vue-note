<template>
  <el-select :style="{ '--num': maxTagCount, width }" v-model="value" @change="onChange" placeholder="请选择" multiple>
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</template>

<script>
let span
export default {
  data() {
    return {
      value: ''
    }
  },
  props: {
    // 下拉数据，需包含value， label字段
    options: {
      type: Array,
      default: () => [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }]
    },
    // 显示的tag数量
    maxTagCount: {
      default: 3
    },
    // 下拉选择框的宽度
    width: {
      default: '320px'
    }
  },
  mounted() {
    span = document.createElement('span')
    span.setAttribute('class', 'maxTagCount el-tag--small')
    document.querySelector('.el-select').appendChild(span)
  },
  methods: {
    onChange(val) {
      this.$nextTick(() => {
        // const tag = document.querySelectorAll('.el-select__tags span .el-tag')
        if (val.length > this.maxTagCount) {
          // tag.forEach((el, index) => {
          //   el.setAttribute('style', `display: ${index + 1 > this.maxTagCount  ? 'none' : 'inline'}`)
          // })
          span.setAttribute('style', 'display: inline')
          span.innerText = `+${val.length - this.maxTagCount}`
        } else {
          span.setAttribute('style', 'display: none')
        }
      })
    }
  }
}
</script>
<!--<style lang="less">-->
<!--//@import './style.less';-->

<!--.maxTagCount {-->
<!--  display: none;-->
<!--  position: absolute;-->
<!--  top: 9px;-->
<!--  right: 35px;-->
<!--  background-color: #f4f4f5;-->
<!--  border-color: #e9e9eb;-->
<!--  color: #909399;-->
<!--  padding: 0 8px;-->
<!--  height: 24px;-->
<!--  border-radius: 4px;-->
<!--  margin-left: 6px;-->
<!--}-->
<!--.el-select {-->
<!--  //@num1: var(&#45;&#45;num);-->
<!--  //@num1: 4;-->
<!--  ////.el-tag.el-tag&#45;&#45;info:nth-child(n + 4) {-->
<!--  ////  background-color: cyan!important;-->
<!--  ////  background-color: @num1;-->
<!--  ////  display: none;-->
<!--  ////}-->
<!--  //.el-tag.el-tag&#45;&#45;info:nth-child(n + @{num1}) {-->
<!--  //  display: none;-->
<!--  //}-->
<!--}-->
<!--</style>-->

<style lang="scss">
.maxTagCount {
  display: none;
  position: absolute;
  top: 9px;
  right: 35px;
  background-color: #f4f4f5;
  border-color: #e9e9eb;
  color: #909399;
  padding: 0 8px;
  height: 24px;
  border-radius: 4px;
  margin-left: 6px;
}
:root {
  --num: "3";
}
.el-select {
  $num1: 4;
  .el-tag.el-tag--info:nth-child(n + #{$num1}) {
    display: none;
  }
  //@for $i from 1 through $num1 {
  //
  //}
}
</style>
