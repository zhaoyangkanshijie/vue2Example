<template>
  <div class="userHome">
    <Header :hasNav="true" :whichNav="0" :hasLoginInfo="true" :applyTraining="true" />
    <div class="main">
      <div class="container">
        <div class="nav">
          <router-link to="/UserHome/information" class="item" :class="page=='userInformation'?'active':''">个人信息</router-link>
          <router-link to="/UserHome/password" class="item" :class="page=='userPassword'?'active':''">修改密码</router-link>
        </div>
        <div class="information" v-show="page=='userInformation'">
          <InputBox :boxWidth="600" subtitle="账号" inputType="text" inputName="account" 
            ref="account" class="inputbox" :inputValue="information.account" :disable="true" />
          <InputBox :boxWidth="600" subtitle="姓名" inputType="text" inputName="name" 
            ref="name" class="inputbox" :inputValue="information.name" :disable="true" />
          <InputBox :boxWidth="600" subtitle="身份证号" inputType="text" inputName="identification" 
            ref="identification" class="inputbox" :inputValue="information.identification" :disable="true" />
          <InputBox :boxWidth="600" subtitle="手机号" inputType="text" inputName="phone" :len="11"
            required="手机号不能为空" :patternInfo="phonePatternInfo" ref="phone" class="inputbox"
            :inputValue="information.phone" />
          <InputBox :boxWidth="600" subtitle="公司" inputType="text" inputName="company" 
            required="公司不能为空" :patternInfo="companyPatternInfo" ref="company" class="inputbox"
            :inputValue="information.company" />
          <InputBox :boxWidth="600" subtitle="电子邮箱" inputType="text" inputName="email" 
            required="电子邮箱不能为空" :patternInfo="emailPatternInfo" ref="email" class="inputbox"
            :inputValue="information.email" />
          <p class="save" @click="informationSubmit">保存</p>
          <div class="modal" v-show="informationSuccess">
            <div class="content">
              <img class="image" src="../assets/WellFormed.png" alt="1" />
              <p class="word">保存成功</p>
            </div>
          </div>
        </div>
        <div class="password" v-show="page=='userPassword'">
          <InputBox :boxWidth="600" subtitle="旧密码" inputType="password" inputName="oldPassword" @beforeBlur="syncNew2Password"
            required="旧密码不能为空" :patternInfo="oldPasswordPatternInfo" ref="oldPassword" class="inputbox" />
          <InputBox :boxWidth="600" subtitle="新密码" inputType="password" inputName="newPassword" @beforeBlur="syncOldPassword"
            required="新密码不能为空" :patternInfo="newPasswordPatternInfo" ref="newPassword" class="inputbox" />
          <InputBox :boxWidth="600" subtitle="再次输入新密码" inputType="password" inputName="newPassword2" @beforeBlur="syncNewPassword"
            required="再次输入新密码不能为空" :patternInfo="newPassword2PatternInfo" ref="newPassword2" class="inputbox" />
          <p class="save" @click="passwordSubmit">保存</p>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import InputBox from '@/components/InputBox.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'UserHome',
  data() {
    return {
      page: 'userInformation',
      information: {
        account: '加载中...',
        name: '加载中...',
        identification: '加载中...',
        phone: '加载中...',
        company: '加载中...',
        email: '加载中...'
      },
      phonePatternInfo: [
        {
          pattern: /1\d{10}/,
          info: '手机格式不正确'
        },
      ],
      companyPatternInfo: [],
      emailPatternInfo: [
        {
          pattern: /^[\w-]+@[\w-]+(.com){1}(.cn)?$/,
          info: '邮箱格式不正确'
        },
      ],
      informationDisabled: false,
      informationSuccess: false,
      oldPasswordPatternInfo: [
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
          option: '=',
          info: '新密码不能与旧密码相同，请重新输入'
        }
      ],
      newPasswordPatternInfo: [
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
          option: '=',
          info: '新密码不能与旧密码相同，请重新输入'
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
      passwordDisabled: false
    }
  },
  methods: {
    getInformation: function() {
      this.information = {
        account: 'zhaoyangkanshijie',
        name: 'zhaoyangkanshijie',
        identification: '1234567890',
        phone: '11111111111',
        company: 'aaaaaaaaaa',
        email: 'zhaoyangkanshijie@github.com'
      }
    },
    informationSubmit: function() {
      if(!this.informationDisabled){
        this.informationDisabled = true;
        if(this.informationValidate()){
          this.informationServer(this.$refs.phone.getVal(),this.$refs.company.getVal(),this.$refs.email.getVal());
        }
        else{
          this.$refs.phone.blurAction();
          this.$refs.company.blurAction();
          this.$refs.email.blurAction();
          this.informationDisabled = false;
        }
      }
    },
    informationValidate: function() {
      if(this.$refs.phone.getSubmitState() && this.$refs.company.getSubmitState() && this.$refs.email.getSubmitState()){
        return true;
      }
      else{
        return false;
      }
    },
    passwordSubmit: function() {
      if(!this.passwordDisabled){
        this.passwordDisabled = true;
        if(this.passwordValidate()){
          this.passwordServer(this.$refs.oldPassword.getVal(),this.$refs.newPassword.getVal(),this.$refs.newPassword2.getVal());
        }
        else{
          this.$refs.oldPassword.blurAction();
          this.$refs.newPassword.blurAction();
          this.$refs.newPassword2.blurAction();
          this.passwordDisabled = false;
        }
      }
    },
    passwordValidate: function() {
      if(this.$refs.oldPassword.getSubmitState() && this.$refs.newPassword.getSubmitState() && this.$refs.newPassword2.getSubmitState()){
        return true;
      }
      else{
        return false;
      }
    },
    syncNew2Password: function() {
      this.oldPasswordPatternInfo[2].pattern = this.$refs.newPassword.getVal();
    },
    syncOldPassword: function() {
      this.newPasswordPatternInfo[2].pattern = this.$refs.oldPassword.getVal();
    },
    syncNewPassword: function() {
      this.newPassword2PatternInfo[2].pattern = this.$refs.newPassword.getVal();
    },
    informationServer: function(phone,company,email) {
      alert("假装修改了");
      this.informationSuccess = true;
      setTimeout(() => {
        this.informationSuccess = false;
        this.informationDisabled = false;
      },2000);
    },
    passwordServer: function(oldPassword,newPassword,newPassword2){
      alert("假装修改了");
      this.$cookies.remove("zhaoyangkanshijieAccount");
      this.$cookies.remove("zhaoyangkanshijieName");
      this.$cookies.remove("zhaoyangkanshijieToken");
      this.$router.push({path: '/login'});
    },
  },
  created: function() {
    this.page = this.$route.name;
    this.getInformation();
  },
  watch: {
    // url改变，不切换组件
    '$route' (to, from) {
      this.page = to.name;
    }
  },
  components: {
    Header,InputBox,Footer
  }
}
</script>

<style lang="scss" scoped>
  @import "../scss/UserHome.scss";
</style>