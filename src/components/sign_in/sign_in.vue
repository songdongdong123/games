<template>
<transition name="slide">
  <div class="login">
    <Background></Background>
    <div class="sign_in">
      <p class="new_user" @click="toLogin">登录</p>  
    </div>
    <div class="logo_container">
      <Logo></Logo>
    </div>
    <div class="user_info">
      <div class="input_box">
        <span class="base icon_user"></span> 
        <input type="text" placeholder="请输入手机号" v-model="mobile">
      </div>
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
        <input  type="password" placeholder="6位以上数字或字母密码" v-model="password">
      </div>
      <Gradient></Gradient>
    </div>
    <div class="submit">
      <p class="submit_btn" @click="register">注册</p>
    </div>
    <div class="orther_id">
      <p>- 使用其他账号登录 -</p> 
    </div>
    <FooterLogo></FooterLogo>
  </div>
</transition>
</template>

<script>
  import Background from '@/base/background'
  import Logo from '@/base/Logo'
  import FooterLogo from '@/base/footer'
  import Gradient from '@/base/gradient'
  import { getAuthCode, regUser } from 'api/login'
  import { verificationPhone, verificationAuthCode, verificationPassWord } from '*/verification'
  import md5 from 'js-md5'
  export default {
    data () {
      return {
        mobile: '',
        AuthCode: '',
        password: '',
        textConten: '获取验证码'
      }
    },
    mounted () {
      let x = JSON.parse(window.localStorage.getItem('signInfo'))
      if (x) {
        this.mobile = x.mobile
        this.AuthCode = x.AuthCode
        this.password = x.password
      }
    },
    methods: {
      toLogin () {
        let signInfo = {
          mobile: this.mobile,
          AuthCode: this.AuthCode,
          password: this.password
        }
        window.localStorage.setItem('signInfo', JSON.stringify(signInfo))
        this.$router.push('/')
      },
      _getAuthCode () {
        // 获取验证码
        let phoneState = verificationPhone(this.mobile)
        if (phoneState) {
          getAuthCode({
            mobile: this.mobile,
            type: 2
          }).then(res => {
            if (res.data.errCode === this.$ERR_CODE && res.data.retCode === this.$RET_CODE) {
              this.$toast({
                message: '验证码已发送，请及时查看',
                duration: 1000
              })
              this.countDown()
            } else {
              this.$toast({
                message: res.data.msg,
                duration: 1000
              })
            }
          })
        } else {
          this.$toast({
            message: '请填写正确的手机号',
            duration: 1000
          })
        }
      },
      verification () {
        if (!verificationPhone(this.mobile)) {
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
        } else if (!verificationPassWord(this.password)) {
          this.$toast({
            message: '请填写6位以上的密码,使用6位数字或字母',
            duration: 1000
          })
          return false
        } else {
          return true
        }
      },
      register () {
        // 账号注册
        let phoneState = verificationPhone(this.mobile)
        let authCodeState = verificationAuthCode(this.AuthCode)
        if (this.verification() && phoneState && authCodeState) {
          regUser({
            userName: this.mobile,
            userType: 1008,
            authCode: this.AuthCode,
            password: md5(this.password)
          }).then(res => {
            if (res.data.errCode === this.$ERR_CODE && res.data.retCode === this.$RET_CODE) {
              this.$router.push('/random_name')
            } else {
              this.$toast({
                message: '请检查手机号或验证码是否正确',
                duration: 1000
              })
            }
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
    color:    #fff;
  }
  :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
      color:    #fff;
  }
  ::-moz-placeholder { /* Mozilla Firefox 19+ */
      color:    #fff;
  }
  :-ms-input-placeholder { /* Internet Explorer 10+ */
      color:    #fff;
  }
  .slide-enter-active,.slide-leave-active
    transition: all .5s
  .slide-enter
    transform: translate3d(100%, 0, 0)
    opacity:1
  .slide-leave-to
    transform: translate3d(-100%, 0, 0)
    // opacity:0.5
  .login
    width:100%
    position:absolute
    height:100vh
    // z-index:1000
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
          // background: url('../../common/image/keyboard.png') no-repeat
        .icon_reset
          width:0.34rem
          height:0.42rem
          bg-image('../../common/image/password')
          // background: url('../../common/image/password.png') no-repeat
        .check_box
          display:flex
          align-items: center
          .line
            border-left: 1px solid #FFF
            width:0.4rem
            height:0.5rem
          .check_input
            width:2.7rem
          .check_code
            color:#fff
            font-size:0.24rem
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
    .orther_id
      margin-top: 1.09rem
      p
        text-align: center
        font-size:0.26rem
        color:#99cccc
</style>

