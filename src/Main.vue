<template>
  <div id="main">
    <transition :name="transitionName">
      <router-view/>
    </transition>
  </div>
</template>

<script>

export default {
  name: 'Main',
  data() {
    return {
      transitionName:''
    }
  },
  watch: {
    // 使用watch 监听$router的变化
    $route (to, from) {
      // 如果to索引大于from索引,判断为前进状态,反之则为后退状态 
      let ramdom = Math.random();
      if (ramdom > 0.75){
        // 设置动画名称
        this.transitionName = 'slide-left';
      }
      else if(ramdom > 0.5){
        this.transitionName = 'slide-right';
      }
      else if(ramdom > 0.25){
        this.transitionName = 'slide-fade';
      }
      else{
        this.transitionName = 'bounce';
      }
    }
  }
}
</script>

<style lang="scss">
  @import "./scss/Common.scss";
</style>
