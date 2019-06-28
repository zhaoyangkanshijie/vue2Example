<template>
  <div class="course">
    <Header />
    <div class="lesson-video-main" ref="lvm">
      <video id="vdo" width="960" @mouseenter="controlsShow(true)" @mouseleave="controlsShow(false)" class="video" :src="videoOption.url" ref="vdo"></video>
      <div class="videoEnd" v-show="isEnded">
        <p class="learned">恭喜你，已学完本节课程</p>
        <div class="rePlay" @click="videoReplay(0)"><p>重学一遍</p></div>
        <div class="next" @click="videoTurn(nextVideoId)"><p>下一节课</p></div>
      </div>
      <div class="lesson-video-aside">
        <p class="catalog">目录</p>
        <ul class="lesson-video-section-list">
          <li class="lesson-video-section-item" v-for="(item,index) in courseList" :key="item.id" @click="videoTurn(item.id)">
            <p>
              第{{index+1}}课 
            </p>
            <p>
              {{item.title.replace(/^第[^a]*[:|：|\s]/g,'')}}
            </p>
            <span class="state1 state" v-if="item.state == 0 && item.id != $route.params.id">未观看</span>
            <span class="state2 state" v-if="item.state == 1 && item.id != $route.params.id">已观看{{item.watched}}%</span>
            <span class="state3 state" v-if="item.state == 2 && item.id != $route.params.id">已看完</span>
            <span class="playing" v-if="item.id == $route.params.id"></span>
          </li>
        </ul>
        <div class="scrollbar"></div>
      </div>
      <div class="video-controls" v-show="(isControl || !videoOption.isPlay) && !isEnded" @mouseenter="controlsShow(true)" @mouseleave="controlsShow(false)">
        <div :class="videoOption.isPlay ? 'pause' : 'play'" @click="playVideo"></div>
        <div class="next" @click="videoTurn(nextVideoId)"></div>
        <div class="progressNum">{{videoOption.currentTime}}</div>
        <div class="progressBar" @click="progressBarClick">
          <div class="progressWhiteBar" :style="{width:videoOption.progress +'%'}">
            <div class="progressBtn" @mousedown="move"></div>
          </div>
          <div class="chapterSpot" v-for="(spot,index) in spotList" :key="spot" :style="{left: spot/videoDuration * 100 +'%'}">
            <div class="catalog">
              <p v-for="(cp,index2) in chapter" :key="cp" :class="index == index2 ? 'active': ''">{{index2+1}}.{{cp}}</p>
            </div>
          </div>
        </div>
        <div class="progressNum2">{{videoOption.duration}}</div>
        <div :class="videoOption.isMuted ? 'muted' : 'sound'" @click="muteVideo"></div>
        <div class="fullScreen" @click="fullScreen"></div>
      </div>
      <div class="tip" v-show="(!videoOption.isPlay && isTip)||isTip && isControl && !isEnded" @mouseenter="controlsShow(true)">
        <p class="catalog">小节目录</p>
        <p class="chapter" v-for="(cp,index) in chapter" :key="cp" @mousedown="videoMove(spotList[index])">{{index+1}}.{{cp}}</p>
        <span class="close" @mousedown="isTip = false"></span>
      </div>
      <div class="continue" v-show="(!videoOption.isPlay && isContinue)|| isContinue && isControl && !isEnded" @mouseenter="controlsShow(true)">
        <div class="close" @click="isContinue = false"></div>
        <p>上次观看到 <font style="color:#00AAFF">{{calDuration(videoOption.watched/100 * videoDuration)}}</font>，为您自动续播<span @click="videoReplay(0)">从头播放</span></p>
      </div>
    </div>
    <p class="title">{{title}}</p>
    <div class="detail" v-html="detail"></div>
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'CourseVideo',
  components: {
    Header,Footer
  },
  data () {
    return {
      courseItemArray:[[],[],[]],
      videoOption:{
        isPlay: false,
        duration: '00:00:00',
        currentTime: '00:00:00',
        progress: 0,
        isMuted: false,
        url: '',
        watched: 0
      },
      nextVideoId:this.$route.params.id,
      isControl: true,
      isTip: true,
      isEnded: false,
      isContinue: false,
      spotList:[],
      chapter:[],
      videoDuration: 0,
      title: '第4课：45645645',
      detail: '<div class="detail"><p>qqqqqqqqq</p><p style="margin-top: 8px;">（1）sssss</p><p style="margin-top: 8px;">（2）dddd</p><p style="margin-top: 8px;">（3）fffff<p style="margin-top: 8px;">（4）ggggg</p></div>',
      courseList:[
        {
          title: 'dfgdfgdf',
          state: 2,
          id: 1,
          watched: 0
        }
      ]
    }
  },
  methods: {
    log: function(){
      console.log(true);
    },
    //播放视频
    playVideo: function(){
      let video = this.$refs.vdo;
      if(this.videoOption.isPlay){
        video.pause()
        this.videoOption.isPlay = false
      }else{
        video.play()
        this.videoOption.isPlay = true
      }
    },
    //静音
    muteVideo: function(){
      let video = this.$refs.vdo;
      if(this.videoOption.isMuted){
        video.muted = false
        this.videoOption.isMuted = false
      }else{
        video.muted = true
        this.videoOption.isMuted = true
      }
    },
    //视频进度跳转
    videoMove: function(num){
      let videoMoveInter = setInterval(()=>{
        let video = this.$refs.vdo;
        if(video != null && !isNaN(video.duration)){
          if(num/video.duration > 1){
            return
          } 
          this.videoOption.progress = num / video.duration * 100
          video.currentTime = num
          clearInterval(videoMoveInter)
        }
      },100)
      
    },
    //全屏
    fullScreen: function(){
      let ele = this.$refs.vdo;
      if (ele.requestFullscreen) {
          ele.requestFullscreen();
      } else if (ele.mozRequestFullScreen) {
          ele.mozRequestFullScreen();
      } else if (ele.webkitRequestFullScreen) {
          ele.webkitRequestFullScreen();
      }
    },
    //播放进度动态
    videoCurruntTime: function(){
      let video = this.$refs.vdo;
      let videoTime = video.duration
      let $this = this;
      setInterval(() => {
        $this.videoOption.currentTime = $this.calDuration(video.currentTime)
        $this.videoOption.progress = video.currentTime / videoTime * 100
      }, 1000);
    },
    //拖拽进度条
    move: function(e){
      let odiv = e.target;        //获取目标元素
      let video = this.$refs.vdo;
      let videoDuration = video.duration
      //算出鼠标相对元素的位置
      let disX = e.clientX - odiv.offsetLeft;
      let disY = e.clientY - odiv.offsetTop;
      document.onmousemove = (e)=>{       //鼠标按下并移动的事件
          //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
          let left = e.clientX - disX;    
          //绑定元素位置到positionX和positionY上面
          this.positionY = left;
          //移动当前元素
          let $width = left / 632 ;
          $width = $width > 0.999 ? 0.999 : $width;
          this.videoOption.progress = $width * 100;
          video.currentTime = video.duration * $width
      };
      document.onmouseup = (e) => {
          document.onmousemove = null;
          document.onmouseup = null;
      };
    },
    //进度条点击
    progressBarClick: function(e){
      let odiv = this.$refs.lvm;        //获取目标元素
      //算出鼠标相对元素的位置
      let disX = e.clientX - odiv.offsetLeft - 164;
      let turnTim = disX / 632 * this.videoDuration
      this.videoMove(turnTim)
      //console.log(turnTim)
    },
    //是否展示controls
    controlsShow: function(isShow){
      this.isControl = isShow
    },
    //判断视频是否播完
    videoEnded: function(video){
      let $this = this;
      video.onended = function(){
        //console.log('end')
        $this.isEnded = true
      }
    },
    //播放下一个视频
    videoTurn: function(id){
      this.$router.push({ path: '/courseVideo/'+id})
      this.setVideoData(this.$store.state.courseItem)
      this.isEnded = false;
      window.location.reload();
      let videoMoveInter = setInterval(()=>{
        let video = this.$refs.vdo;
        if(video != null && !isNaN(video.duration)){
          video.play()
          this.loading=false;
        }
      },100);
    },
    //重新播放
    videoReplay: function(time){
      this.isEnded = false
      let video = this.$refs.vdo;
      let duration = video.duration;
      video.currentTime = time;
      this.videoOption.progress = time / duration * 100;
      video.play()
      this.isContinue = true
      this.isTip = false
      this.videoOption.isPlay=true
    },
    //重设数据
    setVideoData: function(arr){
      //console.log(this.$route.params.id)
      let classId = this.$route.params.id
      for(let i=0;i<arr.length;i++){
        for(let j=0;j<arr[i].length;j++){
          if(arr[i][j].id == classId){
            this.courseList = arr[i]
            this.videoOption.url = arr[i][j].url
            //是否跳转章节
            if(this.$route.params.time > 0){
              this.videoMove(this.$route.params.time)
            }else{
              //是否看过
              if(arr[i][j].watched != 0 && arr[i][j].watched != 100){
                this.videoOption.watched = arr[i][j].watched
                this.isTip = false,
                this.isContinue = true
                this.videoMove(arr[i][j].watched/100 * arr[i][j].time)
              }else{
                this.isTip = true,
                this.isContinue = false
              }
            }
            this.title = arr[i][j].title
            this.detail = arr[i][j].detail
            this.spotList = arr[i][j].spotList
            this.chapter = arr[i][j].chapter.join().split(',')

            if(arr[i][j+1] != undefined){
              this.nextVideoId = arr[i][j+1].id
            }
          }
        }
      }
    },
    //提交观看进度数据
    postCurrentTime: function(){
      let video = this.$refs.vdo;
      console.log("提交观看进度数据:账户名zhaoynagkanshijie,视频id:"+this.$route.params.id+"视频当前时间:"+parseInt(video.currentTime));
    }
  },
  computed: {
    calDuration: () => times => new Date(times * 1000 - 28800000).toTimeString().slice(0, 8),
    //筛选分类
    tagSelect: function () {
      return function(arr,value) {
        let course = [];
        arr.map(function(ele){
          if(ele.type == value){
            course.push(ele)
          }
        })
        return course
      }
    },
    resetChapter: function(){
      //章节分割
      let $courseItemArray = this.courseItemArray;
      //console.log($courseItemArray)
      
      for(let i=0;i<$courseItemArray.length;i++){
        for(let k=0;k<$courseItemArray[i].length;k++){
          let allData = []; //用来装处理完的数组
          let currData = []; //子数组用来存分割完的数据
          for(let j=0;j<$courseItemArray[i][k].chapter.length;j++){
            //console.log($courseItemArray[i][k].chapter[j])
            currData.push($courseItemArray[i][k].chapter[j])
            //在这里求4的余数,如果i不等于0,且可以整除 或者考虑到不满4个或等于4个的情况就要加上  i等于当前数组长度-1的时候
            if((j != 0 && (j + 1) % 4 == 0) || j == $courseItemArray[i][k].chapter.length - 1) {
              //把currData加到allData里
              allData.push(currData);
              //在这里清空currData
              currData = [];
            }
          }
          $courseItemArray[i][k].chapter = allData;
        }
      }
      
      return $courseItemArray;
    }
  },
  created: function(){
    //获取视频时长
    let getTime = setInterval(() => {
      let video = this.$refs.vdo;
      if(video != null && !isNaN(video.duration)){
        this.videoDuration = video.duration;
        this.videoOption.duration = this.calDuration(video.duration)
        this.videoCurruntTime()
        this.videoEnded(video)
        this.postCurrentTime()
        clearInterval(getTime)
      }
    }, 100);
    //判断是否已经获取数据
    if(this.$store.state.courseItem === null){
      let data = [{
        "state": 1,
        "watched": 10,
        "time": 6937,
        "title": "第1课：45645747",
        "url": "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/9372971ba76adb3f5b9b9443beff465e.mp4",
        "id": 2,
        "spotList": ["2", "4", "6", "8", "10"],
        "detail": '<div class="detail"><p>qqqqqqqqq</p><p style="margin-top: 8px;">（1）sssss</p><p style="margin-top: 8px;">（2）dddd</p><p style="margin-top: 8px;">（3）fffff<p style="margin-top: 8px;">（4）ggggg</p></div>',
        "img": "/Images/videoCourse/2.jpg",
        "chapter": ["章节1", "章节2", "章节3", "章节4", "章节5"],
        "type": "分类1",
        "identification": ["类型1"]
      }, {
        "state": 1,
        "watched": 9,
        "time": 1004,
        "title": "第2课：ertergd",
        "url": "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/9372971ba76adb3f5b9b9443beff465e.mp4",
        "id": 3,
        "spotList": ["5"],
        "detail": '<div class="detail"><p>qqqqqqqqq</p><p style="margin-top: 8px;">（1）sssss</p><p style="margin-top: 8px;">（2）dddd</p><p style="margin-top: 8px;">（3）fffff<p style="margin-top: 8px;">（4）ggggg</p></div>',
        "img": "/Images/videoCourse/3.jpg",
        "chapter": ["FDSF"],
        "type": "分类1",
        "identification": ["类型1", "类型2"]
      }, {
        "state": 1,
        "watched": 84,
        "time": 1004,
        "title": "第3课：ytjtktyjtyjty",
        "url": "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/9372971ba76adb3f5b9b9443beff465e.mp4",
        "id": 4,
        "spotList": ["8"],
        "detail": "<p>rewrwer</p>",
        "img": "/Images/videoCourse/4.jpg",
        "chapter": ["3423432"],
        "type": "分类1",
        "identification": ["类型1", "类型2", "类型3"]
      }, {
        "state": 0,
        "step": 1,
        "watched": 0,
        "time": 1004,
        "title": "测试2",
        "url": "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/9372971ba76adb3f5b9b9443beff465e.mp4",
        "id": 5,
        "spotList": [],
        "detail": "<p>vcmx,vmcx.1</p>",
        "img": "/Images/videoCourse/1.jpg",
        "chapter": ["dsadsa"],
        "type": "分类1",
        "identification": ["类型4"]
      }, {
        "state": 0,
        "step": 1,
        "watched": 0,
        "time": 1004,
        "title": "张三",
        "url": "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/9372971ba76adb3f5b9b9443beff465e.mp4",
        "id": 7,
        "spotList": ["2", "4", "7"],
        "detail": "<p>REWRWER</p>",
        "img": "/Images/videoCourse/7.jpg",
        "chapter": ["测试测试1", "测试测试", "rwrrr"],
        "type": "分类3",
        "identification": ["类型4"]
      }, {
        "state": 0,
        "step": 1,
        "watched": 0,
        "time": 1004,
        "title": "dfsgf",
        "url": "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/9372971ba76adb3f5b9b9443beff465e.mp4",
        "id": 8,
        "spotList": [],
        "detail": "<p>fdsfds</p>",
        "img": "/Images/videoCourse/8.jpg",
        "chapter": ["dsffdsf"],
        "type": "分类3",
        "identification": ["类型4"]
      }, {
        "state": 0,
        "step": 1,
        "watched": 0,
        "time": 1004,
        "title": "fdsf",
        "url": "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/9372971ba76adb3f5b9b9443beff465e.mp4",
        "id": 9,
        "spotList": [],
        "detail": "<p>43245435</p>",
        "img": "/Images/videoCourse/9.jpg",
        "chapter": ["fdsfdsf"],
        "type": "分类3",
        "identification": ["类型4"]
      }, {
        "state": 0,
        "step": 1,
        "watched": 0,
        "time": 1004,
        "title": "dfdfsdfskdfskl东方斯卡拉",
        "url": "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/9372971ba76adb3f5b9b9443beff465e.mp4",
        "id": 10,
        "spotList": [],
        "detail": "<p>11111</p>",
        "img": "/Images/videoCourse/10.jpg",
        "chapter": ["章节1"],
        "type": "分类3",
        "identification": ["类型4"]
      }, {
        "state": 0,
        "step": 1,
        "watched": 0,
        "time": 1004,
        "title": "rewrwer",
        "url": "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/9372971ba76adb3f5b9b9443beff465e.mp4",
        "id": 11,
        "spotList": [],
        "detail": "<p>dfsdfdsf</p>",
        "img": "/Images/videoCourse/11.jpg",
        "chapter": ["fdsfsdfsdf"],
        "type": "分类3",
        "identification": ["类型2", "类型4"]
      }, {
        "state": 0,
        "step": 1,
        "watched": 0,
        "time": 1004,
        "title": "rewrew",
        "url": "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/9372971ba76adb3f5b9b9443beff465e.mp4",
        "id": 12,
        "spotList": [],
        "detail": "<p>鼎折覆餗地方</p>",
        "img": "/Images/videoCourse/12.jpg",
        "chapter": ["章节2"],
        "type": "分类3",
        "identification": ["类型4"]
      }, {
        "state": 0,
        "step": 1,
        "watched": 0,
        "time": 1004,
        "title": "测试ueditor",
        "url": "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/9372971ba76adb3f5b9b9443beff465e.mp4",
        "id": 13,
        "spotList": [],
        "detail": "<p>大厦酒店和</p>",
        "img": "/Images/videoCourse/13.jpg",
        "chapter": ["2849308490324"],
        "type": "分类3",
        "identification": ["类型2"]
      }, {
        "state": 0,
        "step": 1,
        "watched": 0,
        "time": 1004,
        "title": "测试",
        "url": "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/9372971ba76adb3f5b9b9443beff465e.mp4",
        "id": 15,
        "spotList": [],
        "detail": "<p>ceshi</p>",
        "img": "/Images/videoCourse/15.jpg",
        "chapter": ["twertewr"],
        "type": "分类3",
        "identification": ["类型2", "类型4"]
      }, {
        "state": 0,
        "step": 1,
        "watched": 0,
        "time": 1004,
        "title": "测试errwer",
        "url": "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/9372971ba76adb3f5b9b9443beff465e.mp4",
        "id": 16,
        "spotList": [],
        "detail": "<p>v</p>",
        "img": "/Images/videoCourse/16.jpg",
        "chapter": ["3423423"],
        "type": "分类1",
        "identification": ["类型5", "类型6"]
      }, {
        "state": 0,
        "step": 1,
        "watched": 0,
        "time": 1004,
        "title": "测试",
        "url": "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/9372971ba76adb3f5b9b9443beff465e.mp4",
        "id": 17,
        "spotList": ["", ""],
        "detail": "<p>ejfrlkf;kf;dsklf;</p>",
        "img": "/Images/videoCourse/17.jpg",
        "chapter": ["jsakldjksal", "dsadsads"],
        "type": "分类3",
        "identification": ["类型2", "类型4"]
      }, {
        "state": 0,
        "step": 1,
        "watched": 0,
        "time": 1004,
        "title": "测试",
        "url": "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/9372971ba76adb3f5b9b9443beff465e.mp4",
        "id": 18,
        "spotList": ["5435", "5435"],
        "detail": "<p>测试</p>",
        "img": "/Images/videoCourse/18.jpg",
        "chapter": ["测试", "543534"],
        "type": "分类3",
        "identification": ["类型2", "类型4"]
      }, {
        "state": 0,
        "step": 1,
        "watched": 0,
        "time": 1004,
        "title": "测试测试1",
        "url": "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/9372971ba76adb3f5b9b9443beff465e.mp4",
        "id": 19,
        "spotList": ["100"],
        "detail": "<p>4测试测试1</p>",
        "img": "/Images/videoCourse/19.jpg",
        "chapter": ["第一章"],
        "type": "分类2",
        "identification": ["类型2", "类型4"]
      }];
      this.courseItemArray[0] = this.tagSelect(data,"分类1")
      this.courseItemArray[1] = this.tagSelect(data,"分类2")
      this.courseItemArray[2] = this.tagSelect(data,"分类3")
      this.courseItemArray = this.resetChapter
      this.$store.commit('setCourseItem', this.courseItemArray)
      this.setVideoData(this.courseItemArray)
    }else{
      this.courseItemArray = this.$store.state.courseItem
      //console.log(this.courseItemArray)
      this.setVideoData(this.courseItemArray)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../scss/CourseVideo.scss";
</style>