<template>
  <div class="header bg">
    <div class="container">
      <router-link to="/">
        <p class="logo">zhaoyangkanshijie</p>
        <p class="line">|</p>
        <p class="title">vue3Example</p>
      </router-link>
      <div class="nav" v-if="hasNav">
        <router-link class="item" :class="whichNav == 1 ? 'active' : ''" to="/">首页</router-link>
        <router-link class="item" :class="whichNav == 2 ? 'active' : ''" to="/MyComponent">组件</router-link>
        <router-link class="item" :class="whichNav == 3 ? 'active' : ''" to="/Page">页面</router-link>
        <router-link class="item" :class="whichNav == 4 ? 'active' : ''" to="/Other">其它功能</router-link>
      </div>
      <div class="user" v-if="hasLoginInfo">
        <router-link class="hello" to="/UserHome/information" v-if="name">你好，{{this.name}}</router-link>
        <p class="log" v-if="name" @click="logout">退出</p>
        <router-link class="log" v-else to="/login">登录</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import store from '../store.js'
export default {
  name: 'Header',
  data () {
    return {
      name: ''
    }
  },
  props: {
    hasNav: Boolean,
    whichNav: Number,
    hasLoginInfo: Boolean
  },
  computed: {

  },
  methods: {
    logout: function() {
      this.$cookies.remove("zhaoyangkanshijieAccount");
      this.$cookies.remove("zhaoyangkanshijieName");
      this.$cookies.remove("zhaoyangkanshijieToken");
      this.name = '';
      this.$router.push({path:'/'});
    }
  },
  mounted() {
    if(this.$cookies.get("zhaoyangkanshijieName")){
      this.name = this.$cookies.get("zhaoyangkanshijieName");
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import "../scss/Header.scss";
</style>
