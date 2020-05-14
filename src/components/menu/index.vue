<template>
  <el-container style="height: 630px">
    <el-aside width="300px">
      <el-tree :data="productTypes" :props="defaultProps" node-key="id"
               @node-contextmenu="rightClick" @node-click="handlClick">
      </el-tree>
      <div v-show="menuVisible">
        <ul id="menu" class="menu">
          <li class="menu_item" >平级添加</li>
          <li class="menu_item" >下级添加</li>
          <li class="menu_item" >删除</li>
        </ul>
      </div>
    </el-aside>
    <el-main>
    </el-main>
  </el-container>
</template>

<script>
  export default {
    data() {
      return {
        menuVisible: false,
        productTypes: [],
        defaultProps: {
          children: 'children',
          label: 'name'
        }
      }
    },
    methods: {
      handlClick() {
      },
      //右键点击
      rightClick(MouseEvent, object, Node, element) { // 鼠标右击触发事件
        this.menuVisible = false // 先把模态框关死，目的是 第二次或者第n次右键鼠标的时候 它默认的是true
        this.menuVisible = true  // 显示模态窗口，跳出自定义菜单栏
        var menu = document.querySelector('#menu')
        document.addEventListener('click', this.foo) // 给整个document添加监听鼠标事件，点击任何位置执行foo方法
        menu.style.display = "block";
        menu.style.left = MouseEvent.clientX - 0 + 'px'
        menu.style.top = MouseEvent.clientY - 80 + 'px'
      },
      foo() { // 取消鼠标监听事件 菜单栏
        this.menuVisible = false
        document.removeEventListener('click', this.foo) // 要及时关掉监听，不关掉的是一个坑，不信你试试，虽然前台显示的时候没有啥毛病，加一个alert你就知道了
      },
    },
    mounted() {
      this.loadTreeData();
    }
  }
</script>

<style scoped>
  .el-aside {
    border: 1px solid #ccc;
    border-right: none;
  }

  .el-main {
    border: 1px solid #ccc;
  }

  .menu_item {
    line-height: 20px;
    text-align: center;
    margin-top: 10px;
  }

  .menu {
    height: 100px;
    width: 80px;
    position: absolute;
    border-radius: 10px;
    border: 1px solid #999999;
    background-color: #f4f4f4;
  }

  li:hover {
    background-color: #1790ff;
    color: white;
  }
  li{font-size:15px}
</style>
