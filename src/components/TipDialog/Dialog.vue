<!--插件形式的封装-->
<template>
  <div id="check-in-dialog" v-show="toggle">
    <div class="title">
      <div>
        <slot name="title">{{title}}</slot>
      </div>
    </div>
    <div class="content">
      <div>
        <slot name="content">{{content}}</slot>
      </div>
    </div>
    <div class="footer" @click="onClickIsShowDialog">
      <el-button type="small" class="cancel" @click="fCancel()">返回</el-button>
      <el-button type="small" class="confirm" @click="fConfirm()">确定</el-button>
    </div>
  </div>
</template>

<script>
  export default {

    name: "CheckInDialog",
    data() {
      return {
        toggle: false,
        title:'请自定义标题',
        content: '',
        fCancel:() => {},
        fConfirm:() => {}
      }
    },
    methods: {
      /**
       * 点击取消或确定按钮关闭弹框,并同步父组件的isShowDialog值
       * @author zcy
       */
      onClickIsShowDialog(title,content,fCancel,fConfirm) {
        this.title = title;
        this.content = content;
        this.fCancel = fCancel;
        this.fConfirm = fConfirm;
        this.toggle = !this.toggle;
        this.$emit('update:isShowDialog', this.toggle)
      }
    }
  }
</script>

<style scoped>
  #check-in-dialog {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;
    background: #f3f3f3;
    width: 420px;
    height: 200px;
    border-radius: 6px;
  }
  .title {
    background: #383838;
    padding: 15px 0 15px 10px;
    color: #FFFFFF;
  }
  .content {
    padding: 10px 0 0 10px;
    word-break:break-all;
  }
  .footer {
    position: absolute;
    bottom: 10px;
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }
  .confirm {
    background: #3E8BFC;
    border-color: #3E8BFC;
    color: #FFFFFF;
    margin-right: 10px;
  }
</style>

