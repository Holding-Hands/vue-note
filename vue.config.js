const webpack = require('webpack');
const path = require('path');

// get git info from command line
const commitHash = require('child_process')
  .execSync('git rev-parse --short HEAD')
  .toString().trim();

module.exports = {
  publicPath: './',
  // lintOnSave: "error",
  productionSourceMap: false,
  configureWebpack: {
    devtool: 'source-map',
    externals: {
      Cesium: 'Cesium',
      h337: 'h337'
    },
    module: {
      rules: [
        {
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          enforce: 'pre',
          include: [path.join(__dirname, 'src')],
          options: {
            fix: true
          }
        }
      ]
    },
    resolve: {
      alias: {
        // 为在 vue 文件中使用 Vue.extend()
        // vue$: "vue/dist/vue.esm.js"
        assets: path.join(__dirname, 'src/assets')
      }
    }
  },
  devServer: {
    compress: true,
    disableHostCheck: true,
    proxy: {
      // test本地视频
      '/test': {
        target: 'http://192.168.163.220/live?port=1935&app=avms-video&stream=test3',
        changeOrigin: true,
        pathRewrite: {
          '^/test': ''
        },
      },
      // video.js 测试视频连接
      '/hls': {
        target: 'http://avms.hx-test.tao.qdcares'
      },
      '/api': {
        target: 'http://192.168.163.93:9200',
        logLevel: 'debug',
        pathRewrite: {
          '/api': ''
        },
        changeOrigin: true
      },
      '/file': {
        target: 'http://wgms.dev.fpi-inc.site',
        logLevel: 'debug',
        pathRewrite: {
          '/file': ''
        },
        changeOrigin: true
      }
    }
  }
};
