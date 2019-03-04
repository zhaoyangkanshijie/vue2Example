<template>
  <div class="login">
    <Header />
    <div class="main">
      <div class="container">
        <div class="loginFrame" v-show="page == 'login'">
          <h3 class="title">登录</h3>
          <InputBox :boxWidth="400" subtitle="账号" inputType="text" inputName="account" 
            required="账号不能为空" :patternInfo="accountPatternInfo" ref="account" class="account" />
          <InputBox :boxWidth="400" subtitle="密码" inputType="password2" inputName="password"
            required="密码不能为空" :patternInfo="passwordPatternInfo" ref="password" class="password" />
          <div class="forget">
            <router-link to="/forgetAccount" class="link">忘记账号</router-link>
            <span class="line">|</span>
            <router-link to="/forgetPassword" class="link">忘记密码</router-link>
          </div>
          <div class="clear"></div>
          <div class="submit" @click="loginSubmitData">登录</div>
        </div>
        <div class="forgetPage" v-show="page == 'forgetAccount'">
          <div v-show="!sendAccountEmail">
            <h3 class="title">忘记账号</h3>
            <InputBox :boxWidth="400" subtitle="身份证号" inputType="text" inputName="identification"
              required="身份证号不能为空" :patternInfo="identificationPatternInfo" ref="identification" class="inputBox" />
            <DragSlider ref="accountSlide" />
            <div class="submit" @click="identificationSubmitData">确定</div>
          </div>
          <div v-show="sendAccountEmail">
            <h3 class="title">请查收邮件</h3>
            <p class="word">一封包含账号信息的邮件已发送到您的邮箱（{{accountEmail}}），请查收邮件。</p>
          </div>
        </div>
        <div class="forgetPage" v-show="page == 'forgetPassword'">
          <div v-show="!sendPasswordEmail">
            <h3 class="title">忘记密码</h3>
            <InputBox :boxWidth="400" subtitle="账号" inputType="text" inputName="oldAccount"
              required="账号不能为空" :patternInfo="oldAccountPatternInfo" ref="oldAccount" class="inputBox" />
            <DragSlider ref="passwordSlide" />
            <div class="submit" @click="oldAccountSubmitData">确定</div>
          </div>
          <div v-show="sendPasswordEmail">
            <h3 class="title">请查收邮件</h3>
            <p class="word">一封包含账号信息的邮件已发送到您的邮箱（{{passwordEmail}}），请查收邮件。</p>
            <router-link to="/ResetPassword?token=zhaoyangkanshijie">暗门</router-link>
          </div>
        </div>
        <div class="forgetPage" v-show="page == 'resetPassword'">
          <h3 class="title">修改登录密码</h3>
          <p class="hint">为了您的账号安全，请勿继续使用默认密码</p>
          <InputBox :boxWidth="400" subtitle="新密码" inputType="password2" inputName="newPassword"
            required="新密码不能为空" :patternInfo="newPasswordPatternInfo" ref="newPassword" class="inputBox" />
          <InputBox :boxWidth="400" subtitle="再次输入新密码" inputType="password2" inputName="newPassword2" @beforeBlur="syncPassword"
            required="再次输入新密码不能为空" :patternInfo="newPassword2PatternInfo" ref="newPassword2" class="inputBox" />
          <div class="submit" @click="setPasswordSubmitData">确定</div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import InputBox from '@/components/InputBox.vue'
import DragSlider from '@/components/DragSlider.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'Login',
  data () {
    return {
      // 校验信息
      accountPatternInfo: [],
      passwordPatternInfo: [],
      identificationPatternInfo: [],
      oldAccountPatternInfo: [],
      newPasswordPatternInfo: [
        {
          pattern: /\w{6,}/,
          info: '最少输入6位字符'
        },
        {
          pattern: /^(?!123456).*|(123456.+)$/,
          info: '“123456”是默认密码，请勿使用默认密码'
        }
      ],
      newPassword2PatternInfo: [
        {
          pattern: /\w{6,}/,
          info: '最少输入6位字符'
        },
        {
          pattern: /^(?!123456).*|(123456.+)$/,
          info: '“123456”是默认密码，请勿使用默认密码'
        },
        {
          pattern: false,
          info: '两次密码不一致，请重新输入'
        }
      ],
      // 当前页面
      page: 'login',
      // 是否忘记账号发送电子邮件页面
      sendAccountEmail: false,
      // 忘记账号 Email 地址
      accountEmail: '',
      // 忘记密码 Email 地址
      passwordEmail: '',
      // 忘记密码页面
      sendPasswordEmail: false,
      // 禁止登录点击
      loginSubmitDisabled: false,
      // 禁止身份证确定点击
      identificationSubmitDisabled: false,
      // 禁止找回密码确定点击
      oldAccountSubmitDisabled: false,
      // 禁止设置密码确定点击
      setPasswordSubmitDisabled: false
    }
  },
  methods: {
    // 登录点击
    loginSubmitData: function() {
      if(!this.loginSubmitDisabled){
        this.loginSubmitDisabled = true;
        if(this.loginValidateData()){
          this.loginServer(this.$refs.account.getVal(),this.$refs.password.getVal());
        }
        else{
          this.$refs.account.blurAction();
          this.$refs.password.blurAction();
          this.loginSubmitDisabled = false;
        }
      }
    },
    // 身份证确定点击
    identificationSubmitData: function() {
      if(!this.identificationSubmitDisabled){
        this.identificationSubmitDisabled = true;
        if(this.identificationValidateData()){
          this.forgetAccountServer(this.$refs.identification.getVal());
        }
        else{
          this.$refs.identification.blurAction();
          if(!this.$refs.accountSlide.slideOK()){
            this.$refs.accountSlide.showDragInfo(true);
          }
          this.identificationSubmitDisabled = false;
        }
      }
    },
    // 找回密码确定点击
    oldAccountSubmitData: function() {
      if(!this.oldAccountSubmitDisabled){
        this.oldAccountSubmitDisabled = true;
        if(this.oldAccountValidateData()){
          this.forgetPasswordServer(this.$refs.oldAccount.getVal());
        }
        else{
          this.$refs.oldAccount.blurAction();
          if(!this.$refs.passwordSlide.slideOK()){
            this.$refs.passwordSlide.showDragInfo(true);
          }
          this.oldAccountSubmitDisabled = false;
        }
      }
    },
    // 设置密码确定点击
    setPasswordSubmitData: function() {
      if(!this.setPasswordSubmitDisabled){
        this.setPasswordSubmitDisabled = true;
        if(this.setPasswordValidateData()){
          this.resetPasswordServer(this.$refs.newPassword.getVal(),this.$refs.newPassword2.getVal());
        }
        else{
          this.$refs.newPassword.blurAction();
          this.$refs.newPassword2.blurAction();
          this.setPasswordSubmitDisabled = false;
        }
      }
    },
    // 登录校验数据
    loginValidateData: function() {
      if(this.$refs.account.getSubmitState() && this.$refs.password.getSubmitState()){
        return true;
      }
      else{
        return false;
      }
    },
    // 身份证校验数据
    identificationValidateData: function() {
      if(this.$refs.identification.getSubmitState() && this.$refs.accountSlide.slideOK()){
        return true;
      }
      else{
        return false;
      }
    },
    // 找回密码校验数据
    oldAccountValidateData: function() {
      if(this.$refs.oldAccount.getSubmitState() && this.$refs.passwordSlide.slideOK()){
        return true;
      }
      else{
        return false;
      }
    },
    // 设置密码校验数据
    setPasswordValidateData: function() {
      if(this.$refs.newPassword.getSubmitState() && this.$refs.newPassword2.getSubmitState()){
        return true;
      }
      else{
        return false;
      }
    },
    syncPassword: function() {
      this.newPassword2PatternInfo[2].pattern = this.$refs.newPassword.getVal();
    },
    // 登录
    loginServer: function(account,password) {
      if(account != 'zhaoyangkanshijie'){
        this.$refs.account.showServerInfo('账户不存在');
        this.loginSubmitDisabled = false;
      }
      else if(password != 'zhaoyangkanshijie'){
        this.$refs.password.showServerInfo('密码错误');
        this.loginSubmitDisabled = false;
      }
      else{
        this.$cookies.set("zhaoyangkanshijieAccount", "zhaoyangkanshijie", 24*60*60);
        this.$cookies.set("zhaoyangkanshijieName", "zhaoyangkanshijie", 24*60*60);
        this.$cookies.set("zhaoyangkanshijieToken", "zhaoyangkanshijie", 24*60*60);
        if(this.$store.state.url){
          this.$router.push({path:this.$store.state.url});
        }
        else{
          this.$router.push({path:'/'});
        }
      }
      // this.axios.post('/api/login',{
      //   account: account,
      //   password: password
      // })
      // .then((response) => {
      //   if(!response.data.login){
      //     if(response.data.msg == '账户不存在'){
      //       this.$refs.account.showServerInfo('账户不存在');
      //       this.loginSubmitDisabled = false;
      //     }
      //     if(response.data.msg == '密码错误'){
      //       this.$refs.password.showServerInfo('密码错误');
      //       this.loginSubmitDisabled = false;
      //     }
      //   }
      //   else{
      //     this.$cookies.set("zhaoyangkanshijieAccount", response.data.account, 24*60*60);
      //     this.$cookies.set("zhaoyangkanshijieName", response.data.name, 24*60*60);
      //     this.$cookies.set("zhaoyangkanshijieToken", response.data.msg, 24*60*60);
          
      //     if(this.$store.state.url){
      //       this.$router.push({path:this.$store.state.url});
      //     }
      //     else{
      //       this.$router.push({path:'/'});
      //     }
      //   }
      // })
      // .catch((error) => {
      //   //console.log(error)
      //   let code = 500;
      //   if(error.toString().indexOf('status code 403') != -1){
      //     code = 403;
      //   }
      //   else if(error.toString().indexOf('status code 404') != -1){
      //     code = 404;
      //   }
      //   else{
      //     code = 500;
      //   }
      //   this.$router.push({name: 'exception',params:{code:code}});
      // });
    },
    // 忘记账户
    forgetAccountServer: function(identification) {
      if(identification != '1234567890'){
        this.$refs.identification.showServerInfo('身份证不存在');
        this.sendAccountEmail = false;
        this.identificationSubmitDisabled = false;
        this.$refs.accountSlide.reset();
      }
      else{
        this.sendAccountEmail = true;
        this.accountEmail = "zhaoyang**********@github.com";
      }
    },
    // 忘记密码
    forgetPasswordServer: function(account) {
      if(account != 'zhaoyangkanshijie'){
        this.$refs.oldAccount.showServerInfo('账户不存在');
        this.sendPasswordEmail = false;
        this.oldAccountSubmitDisabled = false;
        this.$refs.passwordSlide.reset();
      }
      else{
        this.sendPasswordEmail = true;
        this.passwordEmail = "zhaoyang**********@github.com";
      }
    },
    // 重置密码
    resetPasswordServer: function(password1,password2) {
      alert("不能重置密码");
      this.$router.push({path:'/'});
    }
  },
  created: function() {
    this.page = this.$route.name;
    if(this.page == 'resetPassword'){
      if(!this.$route.query.token){
        this.$router.push({path: '/'});
      }
    }
  },
  watch: {
    // url改变，不切换组件
    '$route' (to, from) {
      this.page = to.name;
    }
  },
  components: {
    Header,InputBox,DragSlider,Footer
  }
}
</script>

<style lang="scss" scoped>
  @import "../scss/Login.scss";
</style>