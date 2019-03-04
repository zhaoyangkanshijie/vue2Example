<template>
  <div class="errorCode bg">
    <div class="box">
      <div class="error" :class="'error'+code"></div>
      <h3 class="code">{{code}}</h3>
      <p class="info">{{info}}</p>
    </div>
  </div>
</template>

<script>

export default {
  name: 'ErrorCode',
  props: {
    code: Number
  },
  computed: {
    info: function(){
      if(this.code == 403){
        return '抱歉，您无法访问该页面';
      }
      else if(this.code == 404){
        return '抱歉，您访问的页面不存在';
      }
      else{
        return '抱歉，服务器出错了';
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../scss/ErrorCode.scss";
</style>