<template>
  <div>
    id:<input type="text" v-model="id">
    name:<input type="text" v-model="name">
    <button @click="add">添加</button>
    <!-- appear实现页面刷新刚展示时的效果  -->
    <!--  tag="ul"指定tag属性默认渲染什么元素，默认span标签  -->
    <transition-group tag="ul" appear>
      <li v-for="item in list" :key="item.id" @click="del(item.id)">
        name:{{item.name}}---id: {{item.id}}
      </li>
    </transition-group>
  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        id: '',
        name: '',
        list: [
          { name: 'zcy', id: 1 },
          { name: 'zcy/vip', id: 2 },
          { name: 'zcy/99', id: 3 },
          { name: 'zcy/99', id: 4 },
          { name: 'zcy/99', id: 5 },
          { name: 'zcy/99', id: 6 },
          { name: 'zcy/99', id: 7 },
          { name: 'zcy/99', id: 8 },
          { name: 'zcy/99', id: 9 },
          { name: 'zcy/99', id: 10 },
        ]
      }
    },
    methods: {
      add() {
        this.list.push({ id: this.id, name: this.name })
        this.id = this.name = '';
      },
      del(id) {
        this.list.forEach((item, index) => {
          if (item.id === id) {
            this.list.splice(index, 1)
          }
        })
      }
    }
  }
</script>

<style scoped>
  li:hover {
    background: deeppink;
  }

  li {
    width: 100%;
  }

  .v-enter,
  .v-leave-to {
    opacity: 0;
    transform: translateY(200px);
  }

  .v-enter-active,
  .v-leave-active {
    transition: all 1s ease;
  }

  /* 元素位移时相关设置与v-leave-active配合使用，列表后续元素渐渐漂浮显示的效果 */
  .v-move {
    transition: all 1s ease;
  }

  .v-leave-active {
    position: absolute;
  }
</style>
