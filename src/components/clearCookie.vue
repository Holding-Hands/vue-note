<template>

</template>

<script>
    export default {
        name: "clearCookie",
      methods: {
        /**
         * 退出清除cookie
         */
        clearCookie() {
          const keys = document.cookie.match(/[^ =;]+(?=\\=)/g);
          if (keys) {
            for (let i = keys.length; i--;) { document.cookie = `${keys[i]}=0;expires=${new Date(0).toUTCString()}`; }
          }
        }
      }
    }
</script>

<style scoped>

</style>
