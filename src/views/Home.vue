<template>
  <div class="home">
    <Header :hasNav="true" :whichNav="1" :hasLoginInfo="true" />
    <div class="main">
      <div class="container">
        <h1>welcome</h1>
        <p>不登录也可访问所有页面（去掉了路由守卫或后端鉴权）</p>
        <p>账号：zhaoyangkanshijie</p>
        <p>密码：zhaoyangkanshijie</p>
        <p>身份证号：1234567890</p>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'home',
  components: {
    Header,Footer
  }
}
</script>

<style lang="scss" scoped>
  @import "../scss/Home.scss";
</style>