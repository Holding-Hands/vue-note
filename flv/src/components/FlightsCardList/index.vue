<template>
  <div id="aoc__flight-card-list">
    <div class="first-slide-bar">
      <div>进<br/>港</div>
    </div>
    <div class="slide-bar">
      <div>进<br/>港</div>
    </div>
    <div class="slide-bar">
      <div>进<br/>港</div>
    </div>
    <div class="slide-bar">
      <div>进<br/>港</div>
    </div>
    <div class="slide-bar">
      <div>进<br/>港</div>
    </div>
    <div class="last-slide-bar">
      <div>出<br/>港</div>
    </div>
    <div class="main">
      <div class="main__title">
        重点航班6架次
      </div>
      <div class="main__flight-title">进港航班</div>
      <div class="main__flight-content">
        <el-row class="main__flight-content_item" :style="{'margin-top':0}" :gutter="10">
          <el-col :span="7">
            c72718
          </el-col>
          <el-col :span="10">
            <el-row>
              <el-col :span="16">B1234</el-col>
              <el-col :span="8">深圳</el-col>
            </el-row>
          </el-col>
          <el-col :span="7" :style="{'padding-left': '21px'}">快速过站</el-col>
        </el-row>
        <el-row class="main__flight-content_item" :gutter="10">
          <el-col :span="7">
            c72718
          </el-col>
          <el-col :span="10">
            <el-row>
              <el-col :span="16">B1234</el-col>
              <el-col :span="8">深圳</el-col>
            </el-row>
          </el-col>
          <el-col :span="7" :style="{'padding-left': '21px'}">快速过站</el-col>
        </el-row>
        <el-row class="main__flight-content_item" :gutter="10">
          <el-col :span="7">
            c72718
          </el-col>
          <el-col :span="10">
            <el-row>
              <el-col :span="16">B1234</el-col>
              <el-col :span="8">深圳</el-col>
            </el-row>
          </el-col>
          <el-col :span="7" :style="{'padding-left': '21px'}">快速过站</el-col>
        </el-row>
      </div>
      <div class="main__flight-content">
        <el-row class="main__flight-content_item" :style="{'margin-top':0}" :gutter="10">
          <el-col :span="7">
            c72718
          </el-col>
          <el-col :span="10">
            <el-row>
              <el-col :span="16">B1234</el-col>
              <el-col :span="8">深圳</el-col>
            </el-row>
          </el-col>
          <el-col :span="7" :style="{'padding-left': '21px'}">快速过站</el-col>
        </el-row>
        <el-row class="main__flight-content_item" :gutter="10">
          <el-col :span="7">
            c72718
          </el-col>
          <el-col :span="10">
            <el-row>
              <el-col :span="16">B1234</el-col>
              <el-col :span="8">深圳</el-col>
            </el-row>
          </el-col>
          <el-col :span="7" :style="{'padding-left': '21px'}">快速过站</el-col>
        </el-row>
        <el-row class="main__flight-content_item" :gutter="10">
          <el-col :span="7">
            c72718
          </el-col>
          <el-col :span="10">
            <el-row>
              <el-col :span="16">B1234</el-col>
              <el-col :span="8">深圳</el-col>
            </el-row>
          </el-col>
          <el-col :span="7" :style="{'padding-left': '21px'}">快速过站</el-col>
        </el-row>
      </div>
      <div class="main__flight-content">
        <el-row class="main__flight-content_item" :style="{'margin-top':0}" :gutter="10">
          <el-col :span="7">
            c72718
          </el-col>
          <el-col :span="10">
            <el-row>
              <el-col :span="16">B1234</el-col>
              <el-col :span="8">深圳</el-col>
            </el-row>
          </el-col>
          <el-col :span="7" :style="{'padding-left': '21px'}">快速过站</el-col>
        </el-row>
        <el-row class="main__flight-content_item" :gutter="10">
          <el-col :span="7">
            c72718
          </el-col>
          <el-col :span="10">
            <el-row>
              <el-col :span="16">B1234</el-col>
              <el-col :span="8">深圳</el-col>
            </el-row>
          </el-col>
          <el-col :span="7" :style="{'padding-left': '21px'}">快速过站</el-col>
        </el-row>
        <el-row class="main__flight-content_item" :gutter="10">
          <el-col :span="7">
            c72718
          </el-col>
          <el-col :span="10">
            <el-row>
              <el-col :span="16">B1234</el-col>
              <el-col :span="8">深圳</el-col>
            </el-row>
          </el-col>
          <el-col :span="7" :style="{'padding-left': '21px'}">快速过站</el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "index"
  }
</script>

<style scoped lang="less">
  #aoc__flight-card-list {
    border-radius: 10px 0 0 10px;
    height: 300px;
    width: 50px;
    padding-top: 30px;
    position: relative;
    .slide-bar {
      width: 30px;
      height: 60px;
      display: flex;
      background: #2D2D2D;
      color: #868686;
      transform: skewY(25deg);
      cursor: pointer;
      div {
        transform: translate(8px,6px ) skewY(-25deg);
      }
    }
    .first-slide-bar {
      height: 0;
      width: 44px;
      border-top: 30px solid #2D2D2D;
      border-right: 14px solid transparent;
      transform: translate(-14px,-7px) rotate(90deg);
      border-radius: 0 0 0 12px;
      color: #868686;
      cursor: pointer;
      div {
        transform: translate(1px, -51px) rotate(-90deg);
      }
    }
    .last-slide-bar {
      height: 0;
      width: 44px;
      border-top: 30px solid #2D2D2D;
      border-right: 14px solid transparent;
      transform: translate(-14px,-7px) rotate(90deg);
      border-radius: 0 0 0 12px;
      color: #868686;
      cursor: pointer;
      div {
        transform: translate(1px, -51px) rotate(-90deg);
      }
    }
    /*.last-slide-bar {*/
    /*  height: 0;*/
    /*  width: 44px;*/
    /*  border-top: 30px solid #2D2D2D;*/
    /*  border-right: 14px solid transparent;*/
    /*  transform: translate(-14px, 7px) rotate(270deg);*/
    /*  border-radius: 0 0 0 12px;*/
    /*  color: #868686;*/
    /*  cursor: pointer;*/
    /*  div {*/
    /*    display: inline-block;*/
    /*    transform: translate(18px, -35px) rotate(90deg);*/
    /*  }*/
    /*}*/
    // 主要内容样式
    .main {
      width: 320px;
      /*height: 400px;*/
      background: #2D2D2D;
      padding: 10px 10px 0 10px;
      margin-top: 25px;
      position: absolute;
      left: 31px;
      top: -16px;
      border-radius: 12px;
      .main__title {
        /*width:28px;*/
        height:16px;
        font-size:14px;
        font-weight:400;
        color:rgba(255,255,255,1);
        line-height:14px;
      }
      .main__flight-title {
        margin-top: 20px;
        height:20px;
        font-size:14px;
        font-weight:400;
        color: #3B85FF;
        line-height:20px;
      }
      .main__flight-content {
        margin-top: 20px;
        margin-bottom: 20px;
        padding: 5px 5px 6px 5px;
        border-radius: 6px;
        background: #2D64B6;
        .main__flight-content_item {
          margin-top: 10px;
        }
      }
    }
  }
</style>
<style lang="less">
  .el-row {
    color: #FEFEFE;
    margin-right: -22px;
  }
</style>
