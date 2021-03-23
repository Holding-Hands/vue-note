<template>
  <div>
    <el-button type="primary" @click="onClickTemplate">选择模板</el-button>
    <!--  模板弹框  -->
    <el-dialog
      title="选择模板"
      :visible.sync="isShowTemplateDialog"
      width="40%"
    >
      <div class="content">
        <el-form inline>
          <el-form-item label-width="400px">
            <img style="width: 100px; vertical-align: middle;" class="img" src="./img/6布局.png" alt="">
            <el-checkbox v-model="firstGrid"/>
            <img style="width: 100px; vertical-align: middle;" class="img" src="./img/5.png" alt="">
            <el-checkbox v-model="secondGrid"/>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="onCancel">取 消</el-button>
        <el-button type="primary" @click="onConfirm">确 定</el-button>
      </span>
    </el-dialog>

    <!--  指标弹框  -->
    <el-dialog
      title="选择指标"
      :visible.sync="isShowDialogTarget"
      width="30%"
    >
      <div class="content">
        <el-form inline>
          <el-form-item>
            <el-checkbox-group v-model="checkList">
              <el-checkbox label="送货及时率"/>
              <el-checkbox label="结单及时率"/>
              <el-checkbox label="超期未处理工单"/>
              <el-checkbox label="月度结算金额"/>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShowDialogTarget = false">取 消</el-button>
        <el-button type="primary" @click="onConfirmTarget">确 定</el-button>
      </span>
    </el-dialog>
    <div class="work" ref="work" v-if="checkedFirstCopy">
      <div class="drag-item" v-for="(item, index) in dataList" :key="index" @click="onClickFirstItem(index)">
        {{ item.message }}
      </div>
    </div>

    <div class="grid-6" v-if="checkedSecondCopy">
      <div class="work-2">
        <div class="drag drag-1">1</div>
        <div ref="first" class="work-3 drag-2">
          <div class="drag">2</div>
          <div class="drag">3</div>
        </div>
      </div>
      <div ref="second" class="work-4">
        <div class="drag">5</div>
        <div class="drag">6</div>
        <div class="drag">7</div>
      </div>
    </div>
  </div>
</template>

<script>
import Sortable from 'sortablejs'

export default {
  name: "index",
  data() {
    return {
      firstGrid: false, // 是否选择第一个布局
      secondGrid: false, // 是否选择第二个布局
      checkList: [], // 选择指标列表
      dataList: [
        { message: '', id: 1 },
        { message: '', id: 2 },
        { message: '', id: 3 },
        { message: '', id: 4 },
        { message: '', id: 5 },
        { message: '', id: 6 }
      ],
      checkedFirst: false,
      checkedSecond: false,
      isShowTemplateDialog: false, // 是否显示选择模板弹框
      checkedFirstCopy: false, // 是否显示第一个模板布局
      checkedSecondCopy: false, // 是否显示第二个模板布局
      isShowDialogTarget: false,
      currentIndex: 0 // 当前点击六宫格的下标
    }
  },
  methods: {
    /**
     * 点击每个指标 空盒子 触发的事件
     * @param index
     */
    onClickFirstItem(index) {
      this.isShowDialogTarget = true;
      this.currentIndex = index;
    },
    /**
     * 点击选择模板按钮 打开模板弹框
     */
    onClickTemplate() {
      this.isShowTemplateDialog = true;
    },
    /**
     * 点击选择模板中确定按钮
     */
    onConfirm() {
      const arr = [this.firstGrid, this.secondGrid ]
      if(arr.filter(item => item === true).length !== 1) {
        return this.$message.warning('请选择一个模板')
      }
      if (this.firstGrid) {
        this.isShowTemplateDialog = false;
        this.checkedFirstCopy = true;
        this.checkedSecondCopy = false;
        return
      }
      if (this.secondGrid) {
        this.isShowTemplateDialog = false;
        this.checkedSecondCopy = true;
        this.checkedFirstCopy = false;
      }
    },
    onCancel() {
      this.isShowTemplateDialog = false;
    },
    /**
     * 点击确定指标按钮
     * @return {ElMessageComponent}
     */
    onConfirmTarget() {
      if (this.checkList.length !== 1) {
        return this.$message.warning('请选择一个指标')
      }
      this.isShowDialogTarget = false;
      this.dataList[this.currentIndex].message = this.checkList[0]
    }
  },
  watch: {
    checkedFirstCopy(newValue) {
      if (newValue) {
        this.$nextTick(() => {
          const el = this.$refs.work;
          const sortable = new Sortable(el, {
            group: "draggable",  // or { name: "...", pull: [true, false, 'clone', array], put: [true, false, array] }
            sort: true,  // boolean 定义是否列表单元是否可以在列表容器内进行拖拽排序
            delay: 0, // number 定义鼠标选中列表单元可以开始拖动的延迟时间；
            touchStartThreshold: 0, // px, how many pixels the point should move before cancelling a delayed drag event
            disabled: false, // boolean 定义是否此sortable对象是否可用，为true时sortable对象不能拖放排序等功能，为false时为可以进行排序，相当于一个开关；
            store: null,  // @see Store
            animation: 150,  // ms, number 单位：ms，定义排序动画的时间
            easing: "cubic-bezier(1, 0, 0, 1)", // Easing for animation. Defaults to null. See https://easings.net/ for examples.
            filter: ".big-item",  // 过滤器，不需要进行拖动的元素
            draggable: ".drag-item",  // 允许拖拽的项目类名
            ghostClass: "sortable-ghost",  // drop placeholder的css类名
            chosenClass: "sortable-chosen",  // 被选中项的css 类名
            dragClass: "sortable-drag",  // 正在被拖拽中的css类名
            direction: 'horizontal', // 拖拽方向 (默认情况下会自动判断方向)
            forceFallback: false,  // 忽略 HTML5拖拽行为，强制回调进行
          });
        })
      }
    },
    checkedSecondCopy(newValue) {
      if (!newValue) {
        return;
      }
      this.$nextTick(() => {
        const first = this.$refs.first
        const second = this.$refs.second
        new Sortable(first, {
          group: "shared",  // or { name: "...", pull: [true, false, 'clone', array], put: [true, false, array] }
          sort: true,  // boolean 定义是否列表单元是否可以在列表容器内进行拖拽排序
          delay: 0, // number 定义鼠标选中列表单元可以开始拖动的延迟时间；
          touchStartThreshold: 0, // px, how many pixels the point should move before cancelling a delayed drag event
          disabled: false, // boolean 定义是否此sortable对象是否可用，为true时sortable对象不能拖放排序等功能，为false时为可以进行排序，相当于一个开关；
          store: null,  // @see Store
          animation: 150,  // ms, number 单位：ms，定义排序动画的时间
          easing: "cubic-bezier(1, 0, 0, 1)", // Easing for animation. Defaults to null. See https://easings.net/ for examples.
          // filter: ".big-item",  // 过滤器，不需要进行拖动的元素
          draggable: ".drag",  // 允许拖拽的项目类名
          ghostClass: "sortable-ghost",  // drop placeholder的css类名
          chosenClass: "sortable-chosen",  // 被选中项的css 类名
          dragClass: "sortable-drag",  // 正在被拖拽中的css类名
          direction: 'horizontal', // 拖拽方向 (默认情况下会自动判断方向)
          forceFallback: false,  // 忽略 HTML5拖拽行为，强制回调进行
        });

        new Sortable(second, {
          group: "shared",  // or { name: "...", pull: [true, false, 'clone', array], put: [true, false, array] }
          sort: true,  // boolean 定义是否列表单元是否可以在列表容器内进行拖拽排序
          delay: 0, // number 定义鼠标选中列表单元可以开始拖动的延迟时间；
          touchStartThreshold: 0, // px, how many pixels the point should move before cancelling a delayed drag event
          disabled: false, // boolean 定义是否此sortable对象是否可用，为true时sortable对象不能拖放排序等功能，为false时为可以进行排序，相当于一个开关；
          store: null,  // @see Store
          animation: 150,  // ms, number 单位：ms，定义排序动画的时间
          easing: "cubic-bezier(1, 0, 0, 1)", // Easing for animation. Defaults to null. See https://easings.net/ for examples.
          // filter: ".big-item",  // 过滤器，不需要进行拖动的元素
          draggable: ".drag",  // 允许拖拽的项目类名
          ghostClass: "sortable-ghost",  // drop placeholder的css类名
          chosenClass: "sortable-chosen",  // 被选中项的css 类名
          dragClass: "sortable-drag",  // 正在被拖拽中的css类名
          direction: 'horizontal', // 拖拽方向 (默认情况下会自动判断方向)
          forceFallback: false,  // 忽略 HTML5拖拽行为，强制回调进行
        });
      })
    }
  },
}
</script>

<style scoped lang="less">
.work {
  display: flex;
  justify-content: space-between;
  align-content: space-between;
  flex-wrap: wrap;
  width: 750px;
  height: 500px;
  background: #DEE1E6;
  // 居中
  position: absolute;
  margin: auto;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  .content {
    width: 100px;
    height: 200px;
    position: relative;

    .img {
      width: 50px;
    }
  }

  .drag-item {
    border: 1px black dashed;
    width: 224px;
    height: 229px;
    cursor: pointer;
  }
}
.work-2 {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  align-items: flex-start;
  background: #DEE1E6;
}
.grid-6 {
  background: #DEE1E6;
  width: 600px;
  height: 531px;
  // 居中
  position: absolute;
  margin: auto;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
}

.work-4 {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 224px;
}
.drag {
  border: 1px black dashed;
  width: 176px;
  height: 150px;
  cursor: pointer;
}
.drag-1 {
  width: 387px;
  height: 339px;
}
.drag-2 {
  height: 340px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
}
</style>
