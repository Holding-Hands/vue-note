<template>
  <div>
    <input name="file" type="file" class="file" @change="onChange" style="display: none"/>
    <el-button type="primary" @click="onClickUploadFile">文件上传</el-button>
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

      pictures: [{
        fileId: "e5825d0631f04fe3a7a482e2d992905b",
        name: "black-odorous-water.png",
        url: "http://wgms.dev.fpi-inc.site/file-base-server/api/v1/sys/download/e5825d0631f04fe3a7a482e2d992905b"
      },
        [{
          fileId: "830b520657434414aa28472d83b4a163",
          name: "a.mp4",
          url: "http://wgms.dev.fpi-inc.site/file-base-server/api/v1/sys/download/830b520657434414aa28472d83b4a163"
        }]
      ]
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
      const sliceBlob = new Blob([file])
      // const sliceBlob = new Blob([file]).slice(0 ,50000)
      const sliceFile = new File([sliceBlob], file.name)

      // 将 blob对象 转为 url
      this.base64Url = URL.createObjectURL(sliceBlob)

      setTimeout(() => {
        URL.revokeObjectURL(this.base64Url)
      }, 1000)
      // const fr = new FileReader()
      // fr.readAsDataURL(file) // 完整的图片
      // // fr.readAsDataURL(sliceFile) // 截取的部分图片
      // fr.onload = () => {
      //   this.base64Url = fr.result // 得到的是base64，可以直接赋值img url 实现文本预览，缩略图预览
      //   this.fileName = file.name
      //   console.log(this.base64Url, 'this.base64Url')
      // }
    },
    /**
     * 自定义文件上传
     */
    onClickUploadFile(e) {
      const fileEl = document.querySelector('.file')
      fileEl.click()
    }
  }
}
</script>

<style scoped lang="scss">
img {
  width: 200px;
}
</style>
