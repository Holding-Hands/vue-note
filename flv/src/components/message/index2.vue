<template>
  <div id="message">
    <el-badge :is-dot="haveNewMessage" class="item">
      <div class="message" @click="show = true">
        <button>点击我开启弹性弹框</button>
        <!--        <img src="assets/images/icon_news.png" alt />-->
      </div>
    </el-badge>
    <v-window v-show="show" :top="windowTop" :left="windowLeft" :z-index="100" :height="380" :width="600" @close="close">
      <template v-if="show">
        <div class="message_title" slot="title">
          <div class="title_single" @click="setActiveName(0, 'first')">{{ changeMessageWord }}</div>
          <div class="title_single" @click="setActiveName(1, 'second')">{{ warnMessageWord }}</div>
          <div class="title_single" @click="setActiveName(2, 'third')">{{ deptMessageWord }}</div>
          <div class="title_single" @click="setActiveName(3, 'fourth')">{{ nonMessageWord }}</div>
          <!-- <div class="title_single" @click="setActiveName(4, 'fifth')">应急保障</div> -->
          <div class="active_border" :style="{ left }"></div>
          <el-select class="filter-change" v-model="filterChange" v-if="activeName === 'first'">
            <el-option :value="0" label="所有" />
            <el-option :value="1" label="保障环节变更" />
            <el-option :value="2" label="基础信息变更" />
          </el-select>
        </div>
        <template>
          <div class="messageNone" v-if="!currentMessage.length">无数据</div>
          <cares-tab v-else :readNum="currentReadNum" :message="activeName !== 'second'" :list="currentMessage" />
        </template>
      </template>
    </v-window>
  </div>
</template>

<script>
  // import { mapState, mapMutations } from "vuex";

  import vWindow from './window/index.vue';

  const listMap = {
    first: 'changeList',
    second: 'warList',
    third: 'deptList',
    fourth: 'nonroutineList'
  };

  const numMap = {
    first: 'readNum',
    second: 'warReadNum',
    third: 'deptReadNum',
    fourth: 'nonroutineReadNum'
  };

  export default {
    components: {
      vWindow,
    },
    data() {
      return {
        // 消息弹窗展示标志
        show: false,
        // 消息弹框当前展示的tab标识
        activeName: "first",
        // 变更消息列表
        changeList: [],
        // 变更消息已读数量
        readNum: 0,
        // 车辆预警信息列表
        warList: [],
        // 报警消息已读数量
        warReadNum: 0,
        // 部门消息列表
        deptList: [],
        // 部门消息已读数量
        deptReadNum: 0,
        // 非例行消息
        nonroutineList: [],
        // 非例行任务已读数量
        nonroutineReadNum: 0,
        // active距离left的距离
        left: 0,
        // 窗口的初始top值
        windowTop: 0,
        // 窗口的初始left值
        windowLeft: 0,
        // 变更消息筛选框
        filterChange: 0,
        // 变更消息筛选后列表
        filterList: []
      };
    },
    computed: {
      // ...mapState("schedule", ["focusFlightIdList", "focusCraftAndBoard"]),
      // 变更消息描述
      changeMessageWord() {
        if (this.activeName === "first") return "变更消息";
        return this.changeList.length - this.readNum > 0
          ? `变更消息(${this.changeList.length - this.readNum})`
          : "变更消息";
      },
      // 违章消息描述
      warnMessageWord() {
        if (this.activeName === "second") return "违章消息";
        return this.warList.length - this.warReadNum > 0
          ? `违章消息(${this.warList.length - this.warReadNum})`
          : "违章消息";
      },
      // 部门消息描述
      deptMessageWord() {
        if (this.activeName === "third") return "部门消息";
        return this.deptList.length - this.deptReadNum > 0
          ? `部门消息(${this.deptList.length - this.deptReadNum})`
          : "部门消息";
      },
      // 非例行任务消息描述
      nonMessageWord() {
        const num = this.nonroutineList.length - this.nonroutineReadNum;
        return num && this.activeName !== "fourth"
          ? `非例行(${num})`
          : "非例行任务";
      },
      // 含有新消息的标志
      haveNewMessage() {
        return (
          (this.readNum < this.changeList.length ||
            this.warReadNum < this.warList.length ||
            this.deptReadNum < this.deptList.length ||
            this.nonroutineReadNum < this.nonroutineList.length) &&
          !this.show
        );
      },
      // 当前看板展示的消息
      currentMessage() {
        if (this.activeName === 'first') {
          return this.filterList || [];
        } else {
          return this[listMap[this.activeName]] || [];
        }
      },
      // 当前看板已读数量
      currentReadNum() {
        return this[numMap[this.activeName]] || 0;
      }
    },
    mounted() {
      this.getMessageList();
      this.getTopAndLeft();
    },
    methods: {
      // ...mapMutations("schedule", ["setChangeFlightIdList"]),
      // 关闭消息弹窗
      close() {
        this.show = false;
        switch (this.activeName) {
          case "first":
            this.readNum = this.changeList.length;
            break;
          case "second":
            this.warReadNum = this.warList.length;
            break;
          case "third":
            this.deptReadNum = this.deptList.length;
            break;
          case "fourth":
            this.nonroutineReadNum = this.nonroutineList.length;
            break;
          default:
            break;
        }
        sessionStorage.setItem("readNum", this.readNum);
        sessionStorage.setItem("warReadNum", this.warReadNum);
        sessionStorage.setItem("deptReadNum", this.deptReadNum);
        sessionStorage.setItem("nonroutineReadNum", this.nonroutineReadNum);
        this.$emit("messageClose", this.show);
      },
      // 计算获得窗口的top和left
      getTopAndLeft() {
        const top = document.body.offsetHeight - 380;
        const left = document.body.offsetWidth - 600;
        this.windowTop = top;
        this.windowLeft = left;
      },
      // 获取消息列表
      getMessageList() {
        if (sessionStorage.getItem("changeList")) {
          this.changeList = JSON.parse(sessionStorage.getItem("changeList"));
          this.filterList = this.changeList;
        }
        if (sessionStorage.getItem("readNum")) {
          this.readNum = parseInt(sessionStorage.getItem("readNum"));
        }
        if (sessionStorage.getItem("warList")) {
          this.warList = JSON.parse(sessionStorage.getItem("warList"));
        }
        if (sessionStorage.getItem("warReadNum")) {
          this.warReadNum = parseInt(sessionStorage.getItem("warReadNum"));
        }
        if (sessionStorage.getItem("deptList")) {
          this.deptList = JSON.parse(sessionStorage.getItem("deptList"));
        }
        if (sessionStorage.getItem("deptReadNum")) {
          this.deptReadNum = parseInt(sessionStorage.getItem("deptReadNum"));
        }
        if (sessionStorage.getItem("nonroutineList")) {
          this.nonroutineList = JSON.parse(
            sessionStorage.getItem("nonroutineList")
          );
        }
        if (sessionStorage.getItem("nonroutineReadNum")) {
          this.nonroutineReadNum = parseInt(
            sessionStorage.getItem("nonroutineReadNum")
          );
        }
      },
      setActiveName(index, activeName) {
        this.left = index * 90 + 'px';
        this.activeName = activeName;
      },
      // 过滤变更消息
      filterChangeMsg(){
        if (this.filterChange === 0) {
          this.filterList = this.changeList;
        } else if (this.filterChange === 1) {
          this.filterList = this.changeList.filter(item => item.isDispatchFlight && item.isDispatchFlight === 1);
        } else {
          this.filterList = this.changeList.filter(item => !(item.isDispatchFlight && item.isDispatchFlight === 1));
        }
      }
    },
    watch: {
      message(val) {
        this.show = val;
      },
      activeName(val, oval) {
        if (!this.show) return;
        switch (oval) {
          case "first":
            this.readNum = this.changeList.length;
            break;
          case "second":
            this.warReadNum = this.warList.length;
            break;
          case "third":
            this.deptReadNum = this.deptList.length;
            break;
          case "fourth":
            this.nonroutineReadNum = this.nonroutineList.length;
            break;
          default:
            break;
        }
      },
      // 变更消息筛选
      filterChange() {
        this.filterChangeMsg();
      }
    }
  };
</script>

<style lang="less" scoped>
  #message {
    .ui-window-header {
      background: #3e4353;
      color: #d5ddff;
      .filter-change{
        width: 135px;
        margin-left: 10px;
        .el-input__inner{
          height: 30px;
          border-radius: 20px;
        }
      }
    }
    .ui-window-header .header-actions .maximize {
      border-color: #d5ddff;
    }
    .ui-window-header .header-actions .minimize span {
      border-color: #d5ddff;
    }
    .ui-window[data-v-d3e343b0] {
      box-shadow: 0 0 5px #3e4353;
    }
    .message_title {
      display: flex;
      position: relative;
      .title_single {
        width: 90px;
        text-align: center;
        color: #d5ddff;
      }
      .active_border {
        position: absolute;
        bottom: 0;
        width: 90px;
        height: 4px;
        background: #409eff;
        transition: left 0.2s linear;
      }
    }

    .cares-tab {
      width: 100%;
      padding: 20px;
      box-sizing: border-box;
      height: 100%;
    }
    .messageNone {
      height: 100%;
      display: flex;
      align-items: center;
      width: 100%;
      box-sizing: border-box;
      justify-content: center;
    }
  }
</style>
