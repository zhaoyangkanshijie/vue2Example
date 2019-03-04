<template>
  <div class="page">
    <Header :hasNav="true" :whichNav="3" :hasLoginInfo="true" />
    <div class="main">
      <div class="container">
        <h1 class="welcome">页面样例</h1>
        <router-link to="/material">单个文件下载和文件批量下载</router-link>
        <router-link to="/exception?code=403">页面403</router-link>
        <router-link to="/exception?code=404">页面404</router-link>
        <router-link to="/exception?code=500">页面500</router-link>
        <router-link to="/coursevideo/2">自定义视频</router-link>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'Page',
  components: {
    Header,Footer
  }
}
</script>

<style lang="scss" scoped>
  @import "../scss/Page.scss";
</style>