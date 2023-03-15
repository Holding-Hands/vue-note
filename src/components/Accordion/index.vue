<template>
  <div class="accordion">
    <button @click="onClick">onclick我从上面出来</button>
    <div class="right_content" ref="content">
      <div v-for="item in list" :key="item.id">
        {{item}}
      </div>
    </div>
    <button @click="isActive = !isActive">onclick我从左侧出来</button>
    <div class="left_content" :class="[isActive ? 'active' : 'no-active']" ref="left_content">
      <div v-for="item in list" :key="item.id">
        {{item.name}}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "accordion",
    data() {
      return {
        list: [
          { name: 'zcy', age: 18, id: 1 },
          { name: 'zcy', age: 18, id: 2 },
          { name: 'zcy', age: 18, id: 3 },
          { name: 'zcy', age: 18, id: 4 },
          { name: 'zcy', age: 18, id: 5 }
        ],
        isActive: false,
        height: '200px',
        width: '300px'
      }
    },
    methods: {
      onClick() {
        if (this.$refs.content) {
          if (this.$refs.content.style.height !== this.height) {
            this.$refs.content.style.height = this.height
          } else {
            this.$refs.content.style.height = 0;
          }
        }
      },
      onClickLeftContent() {
        if (this.$refs.content) {
          this.isActive = !this.isActive;
        }
      }
    }
  }
</script>

<style scoped>
  .right_content {
    height: 0;
    overflow: hidden;
    transition-property: height;
    transition-duration: 0.5s;
    background: #00b77c;
    /* 加上下面两行代码固定位置从哪里出来 */
    position: fixed;
    /*bottom: 330px;*/
    left: 330px;
  }
  .left_content {
    overflow: hidden;
    transition: all 0.5s linear;
  }
  /* 需要过渡的属性，活跃时的属性 */
  /* 过渡颜色，可以是16进制，可以是，red，可以是reb(0,255,255) */
  .active {
    /*background: rgb(0,255,255);*/
    background: darkcyan;
    height: 200px;
    width: 300px;
    opacity: 1;
    position: fixed;
    /*right: 500px;*/
    /*left: 330px;*/
    left: 330px;
    /*bottom: 330px;*/
  }
  /* 默认样式 */
  .no-active {
    /*width: 0;*/
    /*height: 0;*/
    opacity: 0;
    /*background: transparent;*/
    position: fixed;
    /*right: 500px;*/
    /*left: 330px;*/
  }
</style>
