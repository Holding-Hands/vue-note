<template>
  <div>
    <div class="mainContainer">
      <video id="videoElement" crossOrigin class="centeredVideo" controls autoplay width="1024" height="576">
        Your browser is too old which doesn't support HTML5 video.
      </video>
    </div>
    <br>
    <div class="controls">
      <button onclick="flv_load()">加载</button>
      <button @click="flv_start()">开始</button>
      <button @click="flv_pause()">暂停</button>
      <button @click="flv_destroy()">停止</button>
      <input style="width:100px" type="text" name="seekpoint"/>
      <button @click="flv_seekto()">跳转</button>
    </div>
  </div>
</template>

<script>
  import flvjs from 'flv.js'
  import Vue from 'vue'
  Vue.use(flvjs)

  export default {
    name: "Flv",
    data() {
      return {
        player: null
      }
    },
    mounted() {
      this.player = document.getElementById('videoElement');
      if (flvjs.isSupported()) {
        const flvPlayer = flvjs.createPlayer({
          type: 'flv',
          isLive: true,
          url: 'http://192.168.163.220/live?port=1935&app=avms-video&stream=test3'
        });
        flvPlayer.attachMediaElement(videoElement);
        flvPlayer.load(); //加载
      }
    },
    methods: {
      flv_start() {
        this.player.play();
      },
      flv_pause() {
        this.player.pause();
      },
      flv_destroy() {
        this.player.pause();
        this.player.unload();
        this.player.detachMediaElement();
        this.player.destroy();
        this.player = null;
      },
      flv_seekto() {
        this.player.currentTime = parseFloat(document.getElementsByName('seekpoint')[0].value);
      }
    }
  }
</script>

<style scoped>
  .mainContainer {
    display: block;
    width: 1024px;
    margin-left: auto;
    margin-right: auto;
  }

  .urlInput {
    display: block;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 8px;
    margin-bottom: 8px;
  }

  .centeredVideo {
    display: block;
    width: 100%;
    height: 576px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: auto;
  }

  .controls {
    display: block;
    width: 100%;
    text-align: left;
    margin-left: auto;
    margin-right: auto;
  }
</style>
