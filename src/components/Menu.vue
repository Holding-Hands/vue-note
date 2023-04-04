<template>
  <el-menu class="el-menu-demo" mode="horizontal" @select="handleSelect">
    <template v-for="route in routes" >
      <el-menu-item :index="`${route.path}`" v-if="!route.children && !route.hidden" :key="route.path">{{ route.name }}</el-menu-item>
      <el-submenu :index="`${route.path}`" v-if="route.children && !route.hidden" :key="route.path">
        <template slot="title">{{ route.name }}</template>
        <template v-for="itemX in route.children" >
          <el-menu-item v-if="!itemX.children && !itemX.hidden" :index="itemX.path" :key="itemX.path">{{ itemX.name }}</el-menu-item>
          <Menu v-if="itemX.children && !itemX.hidden" :key="itemX.path"/>
        </template>
      </el-submenu>
    </template>
  </el-menu>
</template>

<script>
import { routes } from '../Menu/index'
export default {
  name: "Menu",
  data() {
    return {
      routes
    }
  },
  methods: {
    handleSelect(key) {
      this.$router.push(key,((e) => {
        console.log(e, 'e')
      }))
    }
  }
}
</script>

<style scoped>

</style>
