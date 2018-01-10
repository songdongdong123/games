<template>
<transition name="slide">
  <div class="login">
    <!-- 通用背景组件 -->
    <Background></Background>
    <div class="sign_in">
      <p class="new_user" @click="toLogin">登录</p>  
    </div>
    <div class="logo_container">
      <!-- logo组件 -->
      <Logo></Logo>
    </div>
    <div class="user_info">
      <div class="input_box">
        <span class="base icon_user"></span> 
        <input type="text" placeholder="请输入手机号" v-model="userName">
      </div>
      <!-- input框底部间变线 -->
      <Gradient></Gradient>
      <div class="input_box pass">
        <span class="base icon_pass"></span>
        <div class="check_box">
          <input type="text" class="check_input" placeholder="请填写四位验证码" v-model="AuthCode">
          <span class="line"></span>
          <p class="check_code" @click="_getAuthCode">{{textConten}}</p>  
        </div>
      </div>
      <Gradient></Gradient> 
      <div class="input_box pass">
        <span class="base icon_reset"></span>
        <input class="newPass"  v-bind:type="inputType" placeholder="输入新密码" v-model="newPassWord">
        <span class="icon_eye" @click="showPassWord"></span>
      </div>
      <Gradient></Gradient>
    </div>
    <div class="submit" @click="changePassWord">
      <p class="submit_btn">确定</p>
    </div>
  </div>
  </transition>
</template>

<script>
  import Background from '@/base/background'
  import Logo from '@/base/Logo'
  import FooterLogo from '@/base/footer'
  import Gradient from '@/base/gradient'
  import { findPassword } from '../../api/login'
  import md5 from 'js-md5'
  // import { verificationPhone } from '*/verification'
  import { verificationPhone, verificationAuthCode, verificationPassWord } from '*/verification'
  const ERR_CODE = 0
  const RET_CODE = 0
  export default {
    data () {
      return {
        userName: '',
        inputType: 'password',
        AuthCode: '',
        newPassWord: '',
        textConten: '获取验证码',
        second: 60
      }
    },
    mounted () {
      // 获取默认信息
      let x = JSON.parse(window.localStorage.getItem('forgetInfo'))
      if (x) {
        this.userName = x.userName
        this.AuthCode = x.AuthCode
        this.newPassWord = x.newPassWord
      }
    },
    methods: {
      toLogin () {
        let forgetInfo = {
          userName: this.userName,
          AuthCode: this.AuthCode,
          newPassWord: this.newPassWord
        }
        window.localStorage.setItem('forgetInfo', JSON.stringify(forgetInfo))
        this.$router.push('/')
      },
      _getAuthCode () {
        let PhoneState = verificationPhone(this.userName)
        if (PhoneState) {
          findPassword({
            actionType: 1,
            userName: this.userName,
            userType: 1008
          }).then(res => {
            if (res.data.errCode === ERR_CODE && res.data.retCode === RET_CODE) {
              this.$toast({
                message: '验证码已发送，请及时查看',
                duration: 1000
              })
              this.countDown()
            }
          })
        } else {
          this.$toast({
            message: '请输入正确的手机号',
            duration: 1000
          })
        }
      },
      countDown () {
        // 60s倒计时
        this.textConten = 60
        let initSetInter = setInterval(() => {
          this.textConten--
          if (this.textConten === 0) {
            clearInterval(initSetInter)
            this.textConten = '重新发送'
          }
        }, 1000)
      },
      changePassWord () {
        // 更改新密码
        let regExp = this.verification()
        if (regExp) {
          findPassword({
            actionType: 2,
            userName: this.userName,
            authCode: this.AuthCode,
            password: md5(this.newPassWord),
            userType: 1008
          }).then(res => {
            if (res.data.errCode === ERR_CODE && res.data.retCode === RET_CODE) {
              this.$router.push('/')
            }
          })
        }
      },
      verification () {
        if (!verificationPhone(this.userName)) {
          this.$toast({
            message: '请填写正确的手机号！',
            duration: 1000
          })
          return false
        } else if (!verificationAuthCode(this.AuthCode)) {
          this.$toast({
            message: '请填写正确4位验证码',
            duration: 1000
          })
          return false
        } else if (!verificationPassWord(this.newPassWord)) {
          this.$toast({
            message: '请填写6位以上的密码,使用6位数字或字母',
            duration: 1000
          })
          return false
        } else {
          return true
        }
      },
      showPassWord () {
        // 显示密码
        this.inputType = this.inputType === 'text' ? 'password' : 'text'
      }
    },
    components: {
      Background,
      Logo,
      FooterLogo,
      Gradient
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../../common/stylus/index.styl'
  ::-webkit-input-placeholder { /* WebKit browsers */
    color:rgba(255,255,255,0.5);
  }
  :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color:rgba(255,255,255,0.5);
  }
  ::-moz-placeholder { /* Mozilla Firefox 19+ */
    color:rgba(255,255,255,0.5);
  }
  :-ms-input-placeholder { /* Internet Explorer 10+ */
    color:rgba(255,255,255,0.5);
  }
  .slide-enter-active,.slide-leave-active
    transition: all .5s
  .slide-enter
    transform: translate3d(100%, 0, 0)
    opacity:1
  .slide-leave-to
    transform: translate3d(-100%, 0, 0)
  .login
    width:100%
    position:absolute
    height:100vh
    .sign_in
      padding-top:0.34rem
      width:100%
      display:flex
      justify-content:flex-end
      .new_user
        margin: auto 0.67rem
        font-size:0.28rem
        color:#ffffff
    .logo_container
      margin-top:0.7rem
      margin-bottom:0.6rem
      display:flex
      justify-content: center
    .user_info
      margin:auto 0.74rem
      span
        display:inline-block
      input
        width:75%
        height:0.48rem
        font-size:0.24rem
        color:#fff
        background-color:#348e90
      .pass
        margin-top: 0.38rem
      .input_box
        height:1.02rem
        border-radius:1rem
        background-color:#348e90
        display: flex
        align-items: center
        font-size:0.24rem
        .base
          margin-left:0.52rem
          margin-right:0.35rem
          background-size: cover
        .icon_user
          width:0.3rem
          height:0.46rem
          bg-image('../../common/image/phone')
          // background: url('../../common/image/phone.png') no-repeat
        .icon_pass
          width:0.36rem
          height:0.32rem
          bg-image('../../common/image/keyboard')
        .icon_reset
          width:0.34rem
          height:0.42rem
          bg-image('../../common/image/password')
        .icon_eye
          width:0.36rem
          height:0.24rem
          bg-image('../../common/image/eye')
          background-size: cover
        .newPass
          width:4rem
        .check_box
          display:flex
          align-items: center
          .line
            border-left: 1px solid #FFF
            width:0.4rem
            height:0.5rem
          .check_input
            width:2.7rem
            font-size:0.24rem
          .check_code
            color:rgb(255,255,255)
            // color:#fff
            font-size:0.24rem
            width:1.3rem
            text-align:center
    .submit
      height:1.02rem
      margin:auto 0.74rem
      border-radius:1rem
      margin-top:0.38rem
      .submit_btn
        color:#fff
        font-size: 0.35rem
        text-align:center
        line-height:1.02rem
        border 1px solid #fff
        border-radius: 1rem
</style>

