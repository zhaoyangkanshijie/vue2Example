<template>
  <div class="inputBox">
    <div class="content" :style="'width:'+boxWidth+'px'">
      <p class="text" :class="canSeeSubtitle">{{subtitle}}</p>
      <input class="in" :class="inputClass" :type="changeType" :placeholder="subtitle" 
      :name="inputName" :maxlength="len" :pattern="patternReg" :title="validTitle" 
      :required="required" v-model.trim="val" @focus="focusAction" @blur="blurAction"
      :disabled="disable" :readonly="readOnly" />
      <div class="eye" :class="isVisible" @click="eyeAction" v-if="hasEye"></div>
    </div>
    <p class="info" v-if="info">{{info}}</p>
  </div>
</template>

<script>
export default {
  name: 'InputBox',
  data () {
    return {
      // 控制是否可见标题
      canSeeSubtitle: 'not-visible',
      // 控制正常:'',聚焦：'focus',报错:'error'
      inputClass: '',
      // 改变input type
      changeType: 'text',
      // 双向绑定input值
      val: '',
      // 通知父组件是否有错误
      canSubmit: false,
      // 显示的报错信息
      info: '',
      // 是否出现密码可见图案
      hasEye: false,
      // 密码是否可见
      isVisible: 'invisible'
    }
  },
  props: {
    // 盒子宽度
    boxWidth: Number,
    // 标题
    subtitle: String,
    // input type
    inputType: String,
    // input name
    inputName: String,
    // input value
    inputValue: String,
    // input disabled
    disable: Boolean,
    // input readonly
    readOnly: Boolean,
    // input maxlength
    len: Number,
    // input pattern
    patternReg: String,
    // input title
    validTitle: String,
    // input required 提示文字
    required: String,
    // 数据校验规则
    patternInfo: Array
  },
  methods: {
    // focus行为
    focusAction: function() {
      this.$emit('beforeFocus');
      if(!this.readOnly){
        this.inputClass = 'focus';
        this.canSeeSubtitle = '';
        this.info = '';
      }
      this.$emit('focused');
    },
    // blur行为
    blurAction: function() {
      this.$emit('beforeBlur');
      this.inputClass = '';
      if(this.val == ''){
        this.canSeeSubtitle = 'not-visible';
        if(this.required != ''){
          this.inputClass = 'error';
          this.info = this.required;
        }
      }
      this.validation();
      // 通知父组件是否有错误
      if(this.inputClass == 'error'){
        this.canSubmit = false;
      }
      else{
        this.canSubmit = true;
      }
      this.$emit('blured');
    },
    // 数据校验
    // {
    //   pattern: ...,
    //   [option: ...,]
    //   info: '...'
    // }
    validation: function() {
      // 循环匹配每项规则是否正确
      if(this.patternInfo != null){
        for(let i = 0;i < this.patternInfo.length;i++){
          // 匹配到正则表达式，则显示错误
          if(typeof this.patternInfo[i].pattern == 'object'){
            if(!this.patternInfo[i].pattern.test(this.val)){
              this.inputClass = 'error';
              this.info = this.patternInfo[i].info;
              break;
            }
          }
          // 匹配到字符串是否相等，决定显示错误
          else if(typeof this.patternInfo[i].pattern == 'string'){
            if(this.patternInfo[i].option){
              //相等显示错误
              if(this.patternInfo[i].option == '='){
                if(this.val == this.patternInfo[i].pattern){
                  this.inputClass = 'error';
                  this.info = this.patternInfo[i].info;
                  break;
                }
              }
              //不等显示错误
              else{
                if(this.val != this.patternInfo[i].pattern){
                  this.inputClass = 'error';
                  this.info = this.patternInfo[i].info;
                  break;
                }
              }
            }
            //默认不等显示错误
            else{
              if(this.val != this.patternInfo[i].pattern){
                this.inputClass = 'error';
                this.info = this.patternInfo[i].info;
                break;
              }
            }
          }
          // 匹配到长度，决定显示错误
          else if(typeof this.patternInfo[i].pattern == 'number'){
            if(this.patternInfo[i].option){
              //大于指定长度
              if(this.patternInfo[i].option == '>'){
                if(this.val.length > this.patternInfo[i].pattern){
                  this.inputClass = 'error';
                  this.info = this.patternInfo[i].info;
                  break;
                }
              }
              //等于指定长度
              else if(this.patternInfo[i].option == '='){
                if(this.val.length = this.patternInfo[i].pattern){
                  this.inputClass = 'error';
                  this.info = this.patternInfo[i].info;
                  break;
                }
              }
              //小于指定长度
              else{
                if(this.val.length < this.patternInfo[i].pattern){
                  this.inputClass = 'error';
                  this.info = this.patternInfo[i].info;
                  break;
                }
              }
            }
            //默认小于指定长度
            else{
              if(this.val.length < this.patternInfo[i].pattern){
                this.inputClass = 'error';
                this.info = this.patternInfo[i].info;
                break;
              }
            }
          }
          // 匹配到是否显示错误
          else if(typeof this.patternInfo[i].pattern == 'boolean'){
            if(this.patternInfo[i].pattern){
              this.inputClass = 'error';
              this.info = this.patternInfo[i].info;
              break;
            }
          }
          // 其余均显示错误
          else {
            this.inputClass = 'error';
            this.info = this.patternInfo[i].info;
            break;
          }
        }
      }
    },
    // 是否可见图案点击
    eyeAction: function() {
      if(this.isVisible == 'invisible'){
        this.isVisible = 'visible';
        this.changeType = 'text';
      }
      else{
        this.isVisible = 'invisible';
        this.changeType = 'password';
      }
    },
    // 获取input value
    getVal: function() {
      return this.val;
    },
    // 获取input校验是否通过
    getSubmitState: function() {
      return this.canSubmit;
    },
    // 显示服务器返回错误
    showServerInfo: function(serverInfo) {
      if(serverInfo != ''){
        this.inputClass = 'error';
        this.info = serverInfo;
      }
    }
  },
  mounted() {
    // password2类型表示可切换密码是否可见
    if(this.inputType == 'password2'){
      this.hasEye = true;
      this.changeType = 'password';
    }
    else{
      this.changeType = this.inputType;
    }
    if(this.inputValue){
      this.val = this.inputValue;
      this.canSeeSubtitle = '';
    }
  },
  watch: {  
    inputValue(newValue, oldValue) {  
      this.val = newValue;
      this.blurAction();
    }  
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import "../scss/InputBox.scss";
</style>