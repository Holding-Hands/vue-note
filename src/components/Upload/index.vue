<template>
  <div>
    <input name="file" type="file" @change="onChange"/>
    <img :src="base64Url" alt="">
    <!-- a标签 同源的地址 并且添加 download 属性实现下载功能 download值为下载文件名称  -->
    <a v-if="base64Url" :href="base64Url" :download="fileName">下载</a>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      base64Url: '', // 图片文件 地址
      fileName: '', // 文件名
    }
  },
  methods: {
    /**
     * @param e
     */
    onChange(e) {
      // file: 通过input 标签读取过来的的文件对象, 是Blob的子类，Blob有的方法file都有
      // blob： 不可变的二进制内容，包含很多操作方法
      // FileReader: 用于把文件读取为某种形式，如base64，text文本
      const file = e.target.files[0]
      console.log(file, 'file')

      // blob与file可互相转换
      // file对象转为Blob对象, 截取一部分
      const sliceBlob = new Blob([file]).slice(0 ,50000)
      const sliceFile = new File([sliceBlob], file.name)

      // 将 blob对象 转为 url
      this.base64Url = URL.createObjectURL(sliceBlob)

      const fr = new FileReader()
      fr.readAsDataURL(file) // 完整的图片
      // fr.readAsDataURL(sliceFile) // 截取的部分图片
      fr.onload = () => {
        this.base64Url = fr.result // 得到的是base64，可以直接赋值img url 实现文本预览，缩略图预览
        this.fileName = file.name
      }
    }
  }
}
</script>

<style scoped lang="scss">
img {
  width: 200px;
}
</style>
