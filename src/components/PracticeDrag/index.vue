<template>
  <div>
    <!--  模板弹框  -->
    <el-dialog
      title="选择模板"
      :visible.sync="isShowTemplateDialog"
      width="37%"
    >
      <div class="content">
        <el-form inline>
          <el-form-item label-width="400px">
            <img style="width: 100px; vertical-align: middle;" class="img" src="./img/6布局.png" alt="">
            <el-checkbox v-model="firstGrid"/>
            <img style="width: 84px; vertical-align: middle;" class="img" src="./img/5.png" alt="">
            <el-checkbox v-model="secondGrid"/>
            <img style="width: 74px; vertical-align: middle;" class="img" src="./img/4.png" alt="">
            <el-checkbox v-model="thirdGrid"/>
            <img style="width: 68px; vertical-align: middle;" class="img" src="./img/9.png" alt="">
            <el-checkbox v-model="fourGrid"/>
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
      :visible.sync="isShowTargetDialog"
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
        <el-button @click="isShowTargetDialog = false">取 消</el-button>
        <el-button type="primary" @click="onConfirmTarget">确 定</el-button>
      </span>
    </el-dialog>
    <div class="work" ref="work" v-if="isShowFirstTemplate">
      <div :class="['drag-item', { 'background': !item.message }]" v-for="(item, index) in dataList" :key="index"
           @click="onClickFirstTemplateItem(index)">
        {{ item.message }}
      </div>
    </div>

    <div class="grid-6" v-if="isShowSecondTemplate">
      <div class="work-2">
        <div class="drag drag-1 background" @click="onClickSecondTemplateItem"></div>
        <div ref="first" class="work-3 drag-2">
          <div class="drag background"  @click="onClickSecondTemplateItem"></div>
          <div class="drag background"  @click="onClickSecondTemplateItem"></div>
        </div>
      </div>
      <div ref="second" class="work-4">
        <div class="drag background" @click="onClickSecondTemplateItem"></div>
        <div class="drag background" @click="onClickSecondTemplateItem"></div>
        <div class="drag background" @click="onClickSecondTemplateItem"></div>
      </div>
    </div>

    <div ref="grid-4" class="grid-4" v-if="isShowThirdTemplate">
      <div :class="['grid-4-item', { 'background': !item.message }]" v-for="(item, index) in grid4DataList" :key="index"
           @click="onClickGrid4Item(index)">
        {{ item.message }}
      </div>
    </div>
    <div class="btn">
      <el-button type="primary" @click="onClickTemplate">选择模板</el-button>
      <el-button type="primary" @click="onClickEdit">编辑</el-button>
      <el-button type="primary" @click="onClickSave">保存</el-button>
    </div>
  </div>
</template>

<script>
import Sortable from 'sortablejs'

export default {
  name: "index",
  data() {
    return {
      isShowTemplateDialog: false, // 是否显示选择模板弹框

      firstGrid: false, // 是否选择第一个布局
      secondGrid: false, // 是否选择第二个布局
      thirdGrid: false, // 是否选择第三个布局
      fourGrid: false, // 是否选择第四个布局

      isShowFirstTemplate: false, // 是否显示第一个模板布局
      isShowSecondTemplate: false, // 是否显示第二个模板布局
      isShowThirdTemplate: false, // 是否显示第二个模板布局

      checkList: [], // 选择指标列表
      isShowTargetDialog: false, // 是否显示指标弹框

      dataList: [
        {message: '', id: 1},
        {message: '', id: 2},
        {message: '', id: 3},
        {message: '', id: 4},
        {message: '', id: 5},
        {message: '', id: 6}
      ],
      grid4DataList: [
        {message: '', id: 1},
        {message: '', id: 2},
        {message: '', id: 3},
        {message: '', id: 4},
      ], // 4宫格布局数据

      checkedFirst: false, // 选择第一个布局
      checkedSecond: false, // 选择第二个布局

      currentIndex: 0, // 当前点击六宫格的下标
      isEditable: false
    }
  },
  methods: {
    /**
     * 点击每个指标 空盒子 触发的事件
     * @param index
     */
    onClickFirstTemplateItem(index) {
      if (!this.isEditable) {
        return this.$message.warning('请点击编辑按钮')
      }
      this.isShowTargetDialog = true;
      this.currentIndex = index;
    },
    onClickGrid4Item (index) {
      if (!this.isEditable) {
        return this.$message.warning('请点击编辑按钮')
      }
      this.isShowTargetDialog = true;
      this.currentIndex = index;
    },
    onClickSecondTemplateItem () {
      if (!this.isEditable) {
        return this.$message.warning('请点击编辑按钮')
      }
    },
    /**
     * 点击选择模板按钮 打开模板弹框
     */
    onClickTemplate() {
      this.isShowTemplateDialog = true;
    },
    /**
     * 点击 【编辑】触发的事件
     */
    onClickEdit() {
      this.$message.success('编辑成功，快去点击指标进行编辑吧');
      this.isEditable = true;
    },
    /**
     * 点击 【保存】触发的事件
     */
    onClickSave() {
      this.$message.success('保存成功');
      this.isEditable = false;
    },
    /**
     * 点击选择模板中确定按钮
     */
    onConfirm() {
      const arr = [this.firstGrid, this.secondGrid, this.thirdGrid]
      if (arr.filter(item => item === true).length !== 1) {
        return this.$message.warning('请选择一个模板')
      }
      if (this.firstGrid) {
        this.isShowTemplateDialog = false;
        this.isShowFirstTemplate = true;
        this.isShowSecondTemplate = false;
        this.isShowThirdTemplate = false;
        return;
      }
      if (this.secondGrid) {
        this.isShowTemplateDialog = false;
        this.isShowFirstTemplate = false;
        this.isShowSecondTemplate = true;
        this.isShowThirdTemplate = false;
        return;
      }

      if (this.thirdGrid) {
        this.isShowTemplateDialog = false;
        this.isShowFirstTemplate = false;
        this.isShowSecondTemplate = false;
        this.isShowThirdTemplate = true;
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
      if (this.isShowFirstTemplate) {
        this.dataList[this.currentIndex].message = this.checkList[0]
      }

      if (this.isShowThirdTemplate) {
        this.grid4DataList[this.currentIndex].message = this.checkList[0]
      }
      this.isShowTargetDialog = false;

    },
    /**
     * 创建六宫格实例
     */
    createSixGrid() {
      const el = this.$refs.work;
      this.sixGridInstance = new Sortable(el, {
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
    },
    /**
     * @description 创建四宫格实例
     */
    createFourGrid() {
      this.$nextTick(() => {
        const el = this.$refs['grid-4'];
        this.fourGridInstance =new Sortable(el, {
          group: "draggable",  // or { name: "...", pull: [true, false, 'clone', array], put: [true, false, array] }
          sort: true,  // boolean 定义是否列表单元是否可以在列表容器内进行拖拽排序
          delay: 0, // number 定义鼠标选中列表单元可以开始拖动的延迟时间；
          touchStartThreshold: 0, // px, how many pixels the point should move before cancelling a delayed drag event
          disabled: false, // boolean 定义是否此sortable对象是否可用，为true时sortable对象不能拖放排序等功能，为false时为可以进行排序，相当于一个开关；
          store: null,  // @see Store
          animation: 150,  // ms, number 单位：ms，定义排序动画的时间
          easing: "cubic-bezier(1, 0, 0, 1)", // Easing for animation. Defaults to null. See https://easings.net/ for examples.
          filter: ".big-item",  // 过滤器，不需要进行拖动的元素
          draggable: ".grid-4-item",  // 允许拖拽的项目类名
          ghostClass: "sortable-ghost",  // drop placeholder的css类名
          chosenClass: "sortable-chosen",  // 被选中项的css 类名
          dragClass: "sortable-drag",  // 正在被拖拽中的css类名
          direction: 'horizontal', // 拖拽方向 (默认情况下会自动判断方向)
          forceFallback: false,  // 忽略 HTML5拖拽行为，强制回调进行
        });
      })
    },
    createSixBigGrid() {
      this.$nextTick(() => {
        const first = this.$refs.first
        const second = this.$refs.second
        this.sixBigGridInstanceOne = new Sortable(first, {
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

        this.sixBigGridInstanceTwo = new Sortable(second, {
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
  watch: {
    isShowFirstTemplate(newValue) {
      if (newValue && this.isEditable) {
        // 实例名称用来销毁
        this.createSixGrid();
      }

      // 如果不可编辑销毁实例
      if (this.isEditable) {
        this.sixGridInstance.destroy()
      }
    },
    /**
     * 监听是否可编辑
     * @param newValue
     */
    isEditable(newValue) {
      // 可编辑 状态下 并且 展示了第一个模板
      if (newValue && this.isShowFirstTemplate) {
        this.createSixGrid();
      }

      // 可编辑 状态下 并且 展示了第二个模板
      if (newValue && this.isShowSecondTemplate) {
        this.createSixBigGrid();
      }

      // 可编辑 状态下 并且 展示了第二个模板
      if (newValue && this.isShowThirdTemplate) {
        this.createFourGrid();
      }

      // 如果不可编辑销毁实例
      if (!newValue) {
        if (this.sixBigGridInstanceOne) {
          this.sixBigGridInstanceOne.destroy()
          this.sixBigGridInstanceTwo.destroy()
        }
        if (this.sixGridInstance) {
          this.sixGridInstance.destroy()
        }
        if (this.fourGridInstance) {
          this.sixGridInstance.destroy();
        }
      }
    },
    isShowSecondTemplate(newValue) {
      if (this.isEditable) {
        this.sixGridInstance.destroy()
      }
      // 可编辑 状态下 并且 展示了第一个模板
      if (newValue && this.isEditable) {
        this.createSixBigGrid()
      }
    },
    isShowThirdTemplate(newValue) {
      if (newValue && this.isEditable) {
        // 实例名称用来销毁
        this.createFourGrid();
      }

      // 如果不可编辑销毁实例
      if (this.isEditable) {
        this.fourGridInstance.destroy()
      }
    }
  },
}
</script>

<style scoped lang="less">
.btn {
  display: flex;
  justify-content: center;
}

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

.grid-4 {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  top: 0;
  margin: auto;
  align-content: space-between;

  background: #DEE1E6;
  display: flex;
  width: 500px;
  height: 500px;
  flex-wrap: wrap;
  justify-content: space-between;
  text-align: center;

  .grid-4-item {
    width: 231px;
    height: 231px;
    border: 1px black dashed;
  }
}

// 背景
.background {
  background-image: url("./img/加号.png");
  background-size: 40px;
  background-repeat: no-repeat;
  background-position: center;
}
</style>
