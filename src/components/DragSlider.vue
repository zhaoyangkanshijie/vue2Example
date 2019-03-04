<template>
  <div class="dragSlider">
    <div class="drag">
      <div class="dragBg"></div>
      <div class="dragText">{{confirmWords}}</div>
      <div @mousedown="dragSlider($event)" class="handler handlerBg"></div>
    </div>
    <p class="dragInfo" v-if="showHint">请按上方提示完成验证</p>
  </div>
</template>

<script>
import $ from 'jquery'

export default {
  name: 'DragSlider',
  data() {
    return {
      // 距离屏幕左端距离
      beginClientX: 0,
      // 触发拖动状态 判断
      mouseMoveState: false,
      // 拖动最大宽度，依据滑块宽度算出来
      maxWidth: 400-48,
      // 滑块文字
      confirmWords: '请按住滑块，拖动到最右边',
      // 验证成功判断
      confirmSuccess: false, 
      // 是否显示提示文字
      showHint: false
    }
  },
  methods: {
    //按下滑块函数 
    dragSlider: function(e) {
      this.mouseMoveState = true;
      this.beginClientX = e.clientX;
    }, 
    //验证成功函数 
    moveComplete() {
      $(".handler").removeClass('handlerBg').addClass('handlerOKBg');
      this.confirmWords = '验证通过'
      $(".drag").css({
        'color': '#fff'
      });
      $(".drag").css({
        'background-color': '#13CE66'
      });
      $(".handler").css({
        'left': this.maxWidth
      });
      $(".dragBg").css({
        'width': this.maxWidth
      });
      $('body').unbind('mousemove');
      $('body').unbind('mouseup');
      this.confirmSuccess = true;
      this.showHint = false;
    }, 
    // 滑动是否成功
    slideOK: function() {
      return this.confirmSuccess;
    },
    // 是否显示提示信息
    showDragInfo: function(show) {
      this.showHint = show;
    },
    // 拖动
    move: function() {
      $('body').on('mousemove', (e) => {
        //拖动，这里需要用箭头函数，不然this的指向不会是vue对象 
        if(this.mouseMoveState) {
          var width = e.clientX - this.beginClientX;
          if(width > 0 && width <= this.maxWidth) {
            $(".handler").css({
              'left': width
            });
            $(".dragBg").css({
              'width': width
            });
          }
          else if(width > this.maxWidth) {
            this.moveComplete();
          }
        }
      });
    },
    // 放开
    up: function() {
      $('body').on('mouseup', (e) => {
        //鼠标放开 
        this.mouseMoveState = false;
        var width = e.clientX - this.beginClientX;
        if(width < this.maxWidth) {
          $(".handler").css({
            'left': 0
          });
          $(".dragBg").css({
            'width': 0
          });
        }
      });
    },
    // 重置
    reset: function() {
      this.beginClientX = 0;
      this.mouseMoveState = false;
      this.confirmWords = '请按住滑块，拖动到最右边';
      this.confirmSuccess = false; 
      this.showHint = false;
      $(".handler").css({
        'left': 0
      });
      $(".dragBg").css({
        'width': 0
      });
      $(".handler").addClass('handlerBg').removeClass('handlerOKBg');
      $(".drag").css({
        'color': '#000'
      });
      $(".drag").css({
        'background-color': '#E6E6E6'
      });
      this.move();
      this.up();
    }
  },
  mounted() {
    this.move();
    this.up();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import "../scss/DragSlider.scss";
</style>