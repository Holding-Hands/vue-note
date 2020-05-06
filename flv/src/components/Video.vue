<template>
  <div class="popup-video-wrap" v-if="toggle" :style="posStyles">
    <header class="content-space-between">
      <div class="title">{{title}}</div>
      <div class="button-list">
        <!-- @TODO 截屏与录像功能，未开发 -->
        <span><i class="iconfont iconjieping"/></span>
        <span><i class="iconfont iconluxiang"/></span>

        <span @click="handleClose"><i class="iconfont iconguanbi"/></span>
      </div>
    </header>

    <div class="body">
      <video ref="myvideo" :width="width" :height="height" class="video-js vjs-default-skin" controls>
        <source :src="url" type="application/vnd.apple.mpegurl">
      </video>
    </div>
  </div>
</template>
<script>
import videojs from 'video.js';
import { cnLanguage } from '@/components/videojs/utils/cnLanguage';

cnLanguage(videojs); // videojs 语言 设为 中文

export default {
  name: 'PopupVideo',
  data() {
    return {
      player: null
    };
  },
  computed: {
    posStyles() {
      if (this.x && this.y) {
        // 指定 窗口位置
        return { left: `${Number.parseFloat(this.x)}px`, top: `${Number.parseFloat(this.y)}px` };
      }

      // 垂直 水平居中
      return { left: '50%', top: '50%', transform: 'translate(-50%, -50%)' };
    }
  },
  props: {
    x: [String, Number], // 弹出框的 position - x
    y: [String, Number], // 弹出框的 position - y
    toggle: { type: Boolean, required: true }, // 开、关
    width: { type: Number, default: _ => 430 }, // 默认宽
    height: { type: Number, default: _ => 280 }, // 默认高
    title: { type: String, default: _ => '' }, // 视频窗口的 title
    url: { type: String, default: _ => '/hls/mystream.m3u8' } // 视频的 src 地址
  },
  methods: {
    /**
     * 关闭视频窗口
     */
    handleClose() {
      this.$emit('update:toggle', false);
    }
  },
  watch: {
    // 打开 或 关闭 - 视频窗口：
    // 注册 或 销毁 - videojs
    toggle() {
      if (this.toggle) {
        this.$nextTick(() => {
          // 初始化 播放器
          this.player = videojs(this.$refs.myvideo, {
            liveui: true,
            autoplay: 'any',
            language: 'zh-CN'
          });
        });
      } else {
        // 销毁播放器
        this.player.dispose();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/vars.scss";

.popup-video-wrap {
  position: fixed;
  z-index: 99;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  overflow: hidden;
  line-height: 50px;

  header {
    height: 54px;
    background: $--color-bg-light;
    padding: 0 16px;

    .title {
      color: white;
      font-size: $--font-size-large;
    }

    .button-list > span {
      margin-left: 20px;
      color: #4d84ff;
      cursor: pointer;
    }
  }

  .body {
    background: #f0f0f0;
    padding: 10px;
  }
}
</style>
