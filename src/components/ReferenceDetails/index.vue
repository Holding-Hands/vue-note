<template>
  <div id="reference-detail">
    <!-- 顶部slidebar -->
    <div class="slide-bar">
      <div
        :class="[{ active: currentIndex===index }, 'slide-bar-'+(index+1)]"
        @click="onChangeCurrentIndex(index)"
        v-for="(item,index) in aSlideBar"
        :key="index"
      >
        <div>{{item.flight_type}}</div>
      </div>
    </div>
    <div class="content">
      <div class="content__left">
        <!-- 左侧内容的顶部标题 -->
        <div class="content__flight-title">
          <div class="flight-title__left">
            <div>MU8488</div>
            <div>快速过站</div>
          </div>
          <div class="flight-title__center">
            <div>国际</div>
            <div>正班</div>
          </div>
          <div class="flight-title__right">
            <div>提前十分钟</div>
            <div>到达</div>
          </div>
        </div>
        <div class="content__flight-position">
          <div>北京</div>
          <div></div>
          <div>青岛</div>
        </div>
        <div class="content__flight-time">
          <div v-for="(item, index) in aFlightTime" :key="index">
            <div class="flight-time">{{item.time}}</div>
            <div class="flight-plan">{{item.title}}</div>
          </div>
        </div>
        <div class="content__flight-detail">
          <div class="flight-detail__item" v-for="(item, index) in aFlightDetail" :key="index">
            <div>{{item.boardingPort}}</div>
            <div>{{item.title}}</div>
          </div>
        </div>
        <div class="content__flight-detail">
          <div class="flight-detail__item" v-for="(item, index) in aFlightDetail" :key="index">
            <div>{{item.boardingPort}}</div>
            <div>{{item.title}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        currentIndex: 0, // 当前活跃的下标值
        isShowMessage: true,
        isLoading: true,
        isShowFlightDetails: false,
        aSlideBar: [
          { flight_type: '本站进港', isShow: true, num: 0 },
          { flight_type: '前序航班', isShow: true, num: 0 },
          { flight_type: '本站出港', isShow: true, num: 0 }
        ],
        aFlightTime: [
          { time: '10:00',title: '计划起飞' },
          { time: '11:00',title: '计划到达' },
          { time: '9:50',title: '实际起飞' },
          { time: '11:50',title: '实际到达' },
        ],
        aFlightDetail: [
          { boardingPort: 2, title: '登机口' },
          { boardingPort: 12, title: '停车位/桥' },
          { boardingPort: 21, title: '跑道' },
          { boardingPort: 20, title: '变更历史' },
          { boardingPort: 23, title: '变更历史' },
        ],
      }
    },
    methods: {
      onChangeCurrentIndex(index) {
        /**
         * 点击隐藏红色消息框
         * @param index
         */
        this.currentIndex = index;
      }
    }
  }
</script>

<style scoped lang="less">
  #reference-detail {
    /*侧边栏样式*/

    .slide-bar {
      & > div {
        display: inline-block;
      }
    }

    .slide-bar-2 {
      font-size: 12px;
      width: 28.5px;
      height: 69px;
      display: flex;
      background: #292929;
      color: #868686;
      margin-top: 2px;
      transform: translate(27px, -2px) rotate(92deg) skewY(-27deg);
      cursor: pointer;
      position: relative;
      z-index: 1;

      div {
        width: 52px;
        transform: translate(-12px, 22px) rotate(-66deg) skewY(334deg);
      }
    }

    .slide-bar-3 {
      height: 0;
      width: 66px;
      font-size: 12px;
      border-bottom: 29px solid #292929;
      border-right: 14px solid #14161A;
      transform: translate(44px, 19px) rotate(180deg);
      border-radius: 0 0 0 12px;
      color: #868686;
      cursor: pointer;
      z-index: 1;
      margin-bottom: 16px;

      div {
        transform: translate(-6px, 6px) rotate(180deg);
      }
    }

    .slide-bar-1 {
      height: 0;
      width: 66px;
      font-size: 12px;
      border-bottom: 29px solid #292929;
      border-right: 14px solid #14161A;
      border-radius: 12px 0 0 0;
      transform: translate(0px, 17px);
      color: #868686;
      cursor: pointer;

      div {
        display: inline-block;
        transform: translate(18px, 6px);
      }
    }

    .content {
      height: 489px;
      width: 98%;
      margin: 50px auto 0;
      background: #2D2D2D;
      padding: 27.5px 0 0 20px;
      box-sizing: border-box;

      .content__left {
        width: 370px;
        height: 434px;
        background: #252525;

        .content__flight-title {
          color: #fff;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 12px;
          padding-top: 15px;

          .flight-title__left,
          .flight-title__center,
          .flight-title__right {
            display: flex;

            & > div {
              margin-right: 10px;
            }
          }

          .flight-title__left {
            & > div {
              width: 62px;
              padding: 7px 5px;
              margin-right: 0;
              font-weight: 400;
              box-sizing: border-box;
            }

            div:first-child {
              background: #3B85FF;
              border-radius: 6px 0 0 6px;
            }

            div:last-child {
              background: #09B39D;
              border-radius: 0 6px 6px 0;
            }
          }

          .flight-title__right {
            & > div {
              font-size: 14px;
            }

            div:first-child {
              color: #7A7A7A;
            }

            div:last-child {
              color: #09B39D;
            }
          }
        }
        .content__flight-position {
          padding: 15px 0;
          display: flex;
          justify-content: space-around;
          &>div {
            font-size:22px;
            color: white;
          }
        }
        .content__flight-time {
          display: flex;
          justify-content: space-around;
          text-align: center;
          font-size: 14px;
          .flight-time {
            color: #DEDEDE;
          }
          .flight-plan {
            color: #696969;
          }
        }
        .content__flight-detail {
          margin-top: 20px;
          border-top: 1px solid #2D2D2D;
          display: flex;
          justify-content: flex-start;
          flex-wrap: wrap;
          text-align: center;
          &>div {
            width: 33%;
            margin-top: 15px;
            font-size: 12px;
            div:last-child {
              color: #868686;
              margin-top: 5px;
            }
            div:first-child {
              color: #DFDFDF;
            }
          }
        }
      }
    }
  }
</style>
