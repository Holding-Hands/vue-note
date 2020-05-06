<template>
  <div id="check-dialog" v-if="isShowCheckDialog" class="round-6">
    <div class="title">
      <div class="title-slot">
        <slot name="title">{{title}}</slot>
        <div @click="onClickShowCheckDialog" class="icon">
          <slot name="icon"><i class="iconfont icontianjiaguzhang"/></slot>
        </div>
      </div>
    </div>
    <div class="content">
      <div>
        <slot name="content">{{content}}</slot>
      </div>
    </div>
    <div class="footer" @click="onClickShowCheckDialog">
      <el-button type="small" class="cancel" @click="fCancel">返 回</el-button>
      <el-button type="small" class="confirm" @click="fConfirm">确 定</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'CheckDialog',
    data() {
      return {
        toggle: false
      };
    },
    props: {
      /**
       * 父组件传过来的标题，默认内容【请自定义标题】
       * @author zcy
       */
      title: {
        type: String,
        default() {
          return '请自定义标题';
        }
      },
      /**
       * 父组件传过来的内容，默认内容【暂无内容】
       * @author zcy
       */
      content: {
        type: String,
        default() {
          return '暂无内容';
        }
      },
      isShowCheckDialog: {
        type: Boolean,
        required: true
      },
      /**
       * 点击【取消】执行的函数 (默认空函数函数防止首次绑定出现函数为undefined)
       * @author zcy
       */
      fCancel: {
        type: Function,
        default() {
          return () => {
          };
        }
      },
      /**
       * 点击【确定】执行的函数
       * @author zcy
       */
      fConfirm: {
        type: Function,
        default() {
          return () => {
          };
        }
      }
    },
    // watch: {
    //   /**
    //      * isShowCheckDialog，如有新值赋给toggle
    //      */
    //   isShowCheckDialog(val) {
    //     this.toggle = val;
    //   }
    // },
    methods: {
      /**
       * 点击取消或确定按钮关闭弹框,并同步父组件的isShowDialog值
       * @author zcy
       */
      onClickShowCheckDialog() {
        // this.toggle = !this.toggle;
        this.$emit('update:isShowCheckDialog', !this.isShowCheckDialog);
      }
    }
  };
</script>

<style scoped>
  #check-dialog {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;
    background: #FFFFFF;
    width: 470px;
    height: 300px;
  }

  .title {
    background: #383838;
    padding: 18px 0 18px 25px;
    color: #FFFFFF;
    font-size: 16px;
  }

  .content {
    padding: 30px 50px 50px 50px;
    word-break: break-all;
    font-size: 20px;
    line-height: 43px;
    font-weight: 500;
    color: #606266;
    text-align: center;
    /*&>div {*/
    /*  display: inline-block;*/
    /*  text-align: left;*/
    /*}*/
  }

  .footer {
    position: absolute;
    bottom: 20px;
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }

  .confirm {
    background: #3E8BFC;
    border-color: #3E8BFC;
    color: #FFFFFF;
    margin-right: 20px;
    padding: 9px 25px;
  }

  .cancel {
    padding: 9px 25px;
  }

  .title-slot {
    display: flex;
    justify-content: space-between;
  }

  .icon {
    transform: translateY(5px) rotate(45deg);
    padding-top: 5px;
  }

  .icontianjiaguzhang {
    line-height: 21px;
    margin-right: 20px;
    color: #3b85ff;
    cursor: pointer;
    font-size: 16px;
  }
</style>

