<template>
  <div>
    <div class="a">
      <div class="a-a"></div>
    </div>
    <div class="b">
      <div class="b-b"></div>
    </div>
  </div>
</template>

<script></script>

<style scoped>
  .a {
    background: #0aff66;
    width: 200px;
    height: 200px;
    z-index: 2;
    position: absolute;
    top: 400px;
    left: 400px;
  }
  .a-a {
    background: antiquewhite;
    width: 150px;
    height: 150px;
    z-index: 6;
    position: absolute;
    top: 10px;
    left: 10px;
  }

  .b {
    background: cyan;
    height: 200px;
    width: 200px;
    position: absolute;
    top: 600px;
    left: 600px;
    z-index: 2;
  }
  .b-b {
    background: salmon;
    width: 300px;
    height: 150px;
    z-index: 5;
    transform: translate(-100px, -100px);
    position: absolute;
    top: 10px;
    left: 10px;
  }
</style>
