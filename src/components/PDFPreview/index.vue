<template>
  <div>
<!--    <h1>File</h1>-->
<!--    <vue-pdf-embed :source="source1" />-->

<!--    <h1>Base64</h1>-->
<!--    <vue-pdf-embed :source="source2" />-->
    <pdf src="http://wgms.dev.fpi-inc.site/file-base-server/api/v1/sys/download/d07455bbb96e4afead8744e79795c8c9"></pdf>
  </div>
</template>

<script>
// import VuePdfEmbed from 'vue-pdf-embed'
import VuePdfEmbed from 'vue-pdf-embed/dist/vue2-pdf-embed'
import pdf from 'vue-pdf'
export default {
  components: {
    pdf
  },
  async mounted() {
    // const data = await this.$api.apronTest.downloadFile('298460b26e17470cab0d1dc3edce9152')
  },
  data() {
    return {
    }
  },
}
</script>
