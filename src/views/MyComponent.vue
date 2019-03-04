<template>
  <div class="myComponent">
    <Header :hasNav="true" :whichNav="2" :hasLoginInfo="true" />
    <div class="main">
      <div class="container">
        <h1 class="welcome">组件样例</h1>
        <router-link to="/login">普通inputBox</router-link>
        <router-link to="/forgetAccount">dragSlider</router-link>
        <router-link to="/UserHome/information">inputBox disabled</router-link>
        <router-link to="/UserHome/password">inputBox patternInfo 比较其它组件的值</router-link>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'MyComponent',
  components: {
    Header,Footer
  }
}
</script>

<style lang="scss" scoped>
  @import "../scss/MyComponent.scss";
</style>