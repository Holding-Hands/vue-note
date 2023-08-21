<!--插件形式的返回promise，通过点击confirm和cancel调用catch和then的方法进行封装-->
<template>
  <div>
    <div id="check-dialog" v-show="toggle">
      <div class="title">
        <div>
          <slot name="title">{{title}}</slot>
        </div>
      </div>
      <div class="content">
        <div>
          <div class="header-content" v-show="isShowHeaderContent">
            <span>{{headerContent}}</span>
          </div>
          <div class="footer-content" v-show="isShowFooterContent">
            <i class="iconfont icontishi"></i>
            <span>{{footerContent}}</span>
          </div>
        </div>
      </div>
      <div class="footer" @click="onClickIsShowDialog">
        <el-button class="cancel" @click="onHandle('reject')">返回</el-button>
        <el-button class="confirm" @click="onHandle('resolve')">确定</el-button>
      </div>
    </div>
    <button @click="onClick">点击开启弹框</button>
  </div>
</template>

<script>
  export default {

    name: "CheckInDialog",
    data() {
      return {
        toggle: false,
        title:'请自定义标题',
        headerContent: '暂无内容',
        footerContent: '暂无内容',
        isShowHeaderContent:true,
        isShowFooterContent:true,
      }
    },
    methods: {
      /**
       * @param {String}
       */
      onHandle(fn) {
        this[fn]();
      },
      /**
       * 点击取消或确定按钮关闭弹框,并同步父组件的isShowDialog值
       * @author zcy
       */
      onClickIsShowDialog(ops) {
        this.title = ops.title;
        this.headerContent = ops.headerContent;
        // 判断是否传入headerContent
        if (this.headerContent === undefined || this.headerContent ==='') {
          this.isShowHeaderContent = false;
        }
        // 判断是否传入footerContent
        this.footerContent = ops.footerContent;
        if (this.footerContent === undefined || this.headerContent ==='') {
          this.isShowFooterContent = false
        }
        this.toggle = !this.toggle;
        return new Promise((resolve, reject) => {
          this.resolve = resolve;
          this.reject = reject;
        })
      },
      onClick() {
        this.$dialog({
          title: 'zcy',
          footerContent: '我是footerContent'
        })
          .then(() => {
            this.onConfirm();
          })
          .catch(() => {
            this.onCancel();
          })
      },

      onConfirm() {
        console.log('confirm')
      },
      onCancel() {
        console.log(1);
      },
    }
  }
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
  .header-content {
    font-weight: 900;
    font-size: 22px;
    margin: 0 auto;
  }
  .header-content,
  .footer-content {
    text-align: center;
  }
  .header-content > span ,
  .footer-content > span {
    display: inline-block;
    text-align: left;
  }
  .content {
    padding: 30px 50px 50px 50px;
    word-break: break-all;
    font-size: 20px;
    line-height: 43px;
    font-weight: 500;
    color: #606266;
    text-align: center;
  }

  .content > div {
    display: inline-block;
    text-align: left;
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
  .isShow {
    display: none;
  }
</style>
