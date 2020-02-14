<template>
  <div class="slider">
    <div class="banner">
      <div class="banner-prev" @click="prev"></div>
      <div class="banner-next" @click="next"></div>
      <transition-group tag="ul" name="banner-trans" class="banner-container">
        <li class="image-container"
        v-for="(item, index) in banners"
        v-show="index === imgIndex"
        :key="index">
          <a><img :src="item.src" /></a>
        </li>
      </transition-group>
      <div class="banner-points">
        <a class="banner-point" @click="jump(index)" :class="{'active': index === imgIndex}" v-for="(item, index) in banners.length" :key="index"></a>
      </div>
    </div>
    <div class="banner slide">
      <div class="banner-prev" @click="prev2"></div>
      <div class="banner-next" @click="next2"></div>
      <ul class="banner-container banner-slide"
      :style="transformStyle">
        <li class="image-container slide-item"
        v-for="(item, index) in banners"
        :key="index">
          <a><img :src="item.src" /></a>
        </li>
      </ul>
      <div class="banner-points">
        <a class="banner-point" @click="jump2(index)" :class="{'active': index === slideIndex}" v-for="(item, index) in banners.length" :key="index"></a>
      </div>
    </div>
    <div class="banner slide my-slide">
      <div class="banner-prev" @click="prev3"></div>
      <div class="banner-next" @click="next3"></div>
      <transition-group tag="ul" class="my-banner-container" :style="transformStyle2">
        <li class="image-container" style="width:14.2857%" :key="-1">
          <a><img :src="banners[4].src" /></a>
        </li>
        <li class="image-container" style="width:14.2857%"
        v-for="(item, index) in banners"
        :key="index">
          <a><img :src="item.src" /></a>
        </li>
        <li class="image-container" style="width:14.2857%" :key="5">
          <a><img :src="banners[0].src" /></a>
        </li>
      </transition-group>
      <div class="banner-points">
        <a class="banner-point" @click="jump3(index)" :class="{'active': index === mySlideIndex}" v-for="(item, index) in banners.length" :key="index"></a>
      </div>
    </div>
  </div>
</template>

<script>
import img1 from '../assets/1.jpg';
import img2 from '../assets/2.jpg';
import img3 from '../assets/3.jpg';
import img4 from '../assets/4.jpg';
import img5 from '../assets/5.jpg';

export default {
  name: 'Slider',
  data() {
    return {
      imgIndex: 0,
      timer: '',
      delayTimer: '',
      slideFlag: false,
      // 滑动轮播图
      slideIndex: 0,
      timer2: '',
      Xvalue: 0,
      delayTimer2: '',
      slideFlag2: false,
      banners: [
        {src: img1},
        {src: img2},
        {src: img3},
        {src: img4},
        {src: img5}
      ],
      // 无限滑动轮播图
      mySlideIndex: 0,
      duration: 0,
      Xvalue2: -1226
    }
  },
  methods: {
    next() {
      this.delay();
      const lastIndex = this.banners.length - 1;
      if (this.imgIndex < lastIndex) {
        this.imgIndex += 1;
      } else {
        this.imgIndex = 0;
      }
    },
    prev() {
      this.delay();
      const lastIndex = this.banners.length - 1;
      if (this.imgIndex > 0) {
        this.imgIndex -= 1;
      } else {
        this.imgIndex = lastIndex;
      }
    },
    play() {
      clearInterval(this.timer);
      this.timer = setInterval(() => {
        if (!this.slideFlag) {
          this.next();
        }
      }, 5000);
    },
    jump(index) {
      this.delay();
      this.imgIndex = index;
    },
    delay() {// 防止手动切换和自动切换同时进行出现的混乱
      this.slideFlag = true;
      clearInterval(this.delayTimer);
      this.delayTimer = setInterval(() => {
        this.slideFlag = false;
      }, 1000);
    },
    // 滑动轮播图
    next2() {
      this.delay2();
      const lastIndex = this.banners.length - 1;
      if (this.slideIndex < lastIndex) {
        this.slideIndex += 1;
        this.Xvalue = - (this.slideIndex * 1226);
      } else {
        this.slideIndex = 0;
        this.Xvalue = 0;
      }
    },
    prev2() {
      this.delay2();
      const lastIndex = this.banners.length - 1;
      if (this.slideIndex > 0) {
        this.slideIndex -= 1;
        this.Xvalue = - (this.slideIndex * 1226);
      } else {
        this.slideIndex = lastIndex;
        this.Xvalue =  - (lastIndex * 1226);
      }
    },
    play2() {
      clearInterval(this.timer2);
      this.timer2 = setInterval(() => {
        if (!this.slideFlag2) {
          this.next2();
        }
      }, 5000);
    },
    jump2(index) {
      this.delay2();
      this.slideIndex = index;
      this.Xvalue = - (index * 1226);
    },
    delay2() {
      this.slideFlag2 = true;
      clearInterval(this.delayTimer2);
      this.delayTimer2 = setInterval(() => {
        this.slideFlag2 = false;
      }, 1000);
    },
    // 无限滑动轮播图
    next3() {
      if(this.mySlideIndex == 0 && this.Xvalue2 != -1226){
        this.duration = 0;
        this.Xvalue2 = -1226;
        //console.log('next:'+this.Xvalue2)
      }
      setTimeout(()=>{
        this.duration = 300;
        this.Xvalue2 -= 1226;
        this.mySlideIndex++;
        if(this.mySlideIndex > this.banners.length - 1){
          this.mySlideIndex = 0;
        }
      },1);
    },
    prev3() {
      //console.log(1,this.Xvalue2)
      if(this.mySlideIndex == 4 && this.Xvalue2 != -1226*5){
        this.duration = 0;
        this.Xvalue2 = -1226*5;
        //console.log('prev:'+this.Xvalue2)
      }
      setTimeout(()=>{
        this.duration = 300;
        this.Xvalue2 += 1226;
        this.mySlideIndex--;
        if(this.mySlideIndex < 0){
          this.mySlideIndex = this.banners.length - 1;
        }
        //console.log(2,this.Xvalue2)
      },1);
    },
    jump3(index) {
      this.myBanner = 'banner-next';
      this.duration = 300;
      this.Xvalue2 = -1226 * (index+1);
      this.mySlideIndex = index;
    }
  },
  computed: {
    transformStyle () {
      return {
        'transform': `translate3d(${this.Xvalue}px, 0, 0)`
      }
    },
    transformStyle2 () {
      return {
        'width': '8582px',
        'transition-duration': `${this.duration}ms`,
        'transform': `translate3d(${this.Xvalue2}px, 0, 0)`
      }
    }
  },
  mounted() {
    this.play();
    this.play2();

    // 切换浏览器tab页进入
    window.onfocus = () => {
      this.timer = setInterval(() => {
        this.next();
      }, 5000);
      this.timer2 = setInterval(() => {
        this.next2();
      }, 5000);
    }

    // 切换浏览器tab页退出
    window.onblur = () => {
      clearInterval(this.timer);
      clearInterval(this.timer2);
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../scss/Slider.scss";
</style>