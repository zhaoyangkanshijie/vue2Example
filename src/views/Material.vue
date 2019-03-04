<template>
  <div class="material">
    <Header />
    <div class="main">
      <div class="container">
        <h3 class="title">教辅资料</h3>
        <div class="downloadAll" v-show="material.length > 0" @click="downloadAll">
          <img class="downloadImg" src="../assets/download.png" alt="d" />
          <p class="downloadWord">全部下载</p>
        </div>
        <div class="clear"></div>
        <table class="materialTable" v-if="material.length > 0">
          <thead>
            <tr>
              <td>名称</td>
              <td>文件大小</td>
              <td>更新时间</td>
              <td>操作</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in material" :key="item.name">
              <td>{{item.name}}</td>
              <td>{{item.size}}</td>
              <td>{{item.updateTime}}</td>
              <td><a :href="$store.state.fileURL + item.url" :download="item.name+'.pdf'" class="downloadOne" ref="downloadOne">下载</a></td>
            </tr>
          </tbody>
        </table>
        <div class="hint" v-else>
          <h3 class="up">暂无教辅资料</h3>
          <p class="down">申请培训后将显示课程相关的教辅资料</p>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'Material',
  data () {
    return {
      material: [
        {
          name: 'hello',
          size: '2.3MB',
          updateTime: '2019-01-21',
          url: 'https://www.baidu.com/a.pdf'
        },
        {
          name: 'hi',
          size: '2.3MB',
          updateTime: '2019-01-21',
          url: 'https://www.baidu.com/b.pdf'
        }
      ]
    }
  },
  computed: {
    hasTrainingHint: function(){
      if(this.material.length == 0){
        return true;
      }
      else{
        return false;
      }
    }
  },
  methods: {
    downloadAll: function() {
      for(let i = 0;i < this.$refs.downloadOne.length;i++){
        this.$refs.downloadOne[i].click();
      }
    }
  },
  components: {
    Header,Footer
  }
}
</script>

<style lang="scss" scoped>
  @import "../scss/Material.scss";
</style>