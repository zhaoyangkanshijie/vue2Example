<template>
  <div class="Exception">
    <Header />
    <ErrorCode :code="code" />
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import ErrorCode from '@/components/ErrorCode.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'Exception',
  data() {
    return {
      code: 500
    }
  },
  components: {
    Header,ErrorCode,Footer
  },
  created() {
    if(this.$route.query.code){
      this.code = parseInt(this.$route.query.code);
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../scss/Exception.scss";
</style>