<template>
  <div class="other">
    <Header :hasNav="true" :whichNav="4" :hasLoginInfo="true" />
    <div class="main">
      <div class="container">
        <h1>跨域配置vue.config.js</h1>
        <pre>
          module.exports = {
              publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
              // outputDir: 在npm run build时 生成文件的目录 type:string, default:'dist'
              // outputDir: 'dist',
            outputDir: 'wwwroot',
              // pages:{ type:Object,Default:undfind } 
              devServer: {
                  port: 8080, // 端口号
                  host: 'localhost',
                  https: false, // https:{type:Boolean}
                  open: true, //配置自动启动浏览器
                  //proxy: '' // 配置跨域处理,只有一个代理
                  proxy: {
                      '/api': {
                          target: 'http://localhost:7675/api',
                          ws: true,
                          changeOrigin: true,
                          pathRewrite:{
                              '^/api':'' // 需要rewrite重写的
                          }
                      }
                  },  // 配置多个代理
              }
          }
        </pre>
        <h1>全局引入组件axios cookie</h1>
        <pre>
          import cookie from 'vue-cookies'
          import axios from 'axios'
          import VueAxios from 'vue-axios'

          Vue.use(cookie);
          Vue.use(VueAxios,axios);
        </pre>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'Other',
  components: {
    Header,Footer
  }
}
</script>

<style lang="scss" scoped>
  @import "../scss/Other.scss";
</style>