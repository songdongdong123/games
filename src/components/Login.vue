<template>
<transition name="slide">
  <div class="login">
    <!-- 背景组件 -->
    <Background></Background>
    <div class="sign_in">
      <p class="new_user" @click="toSignIn">注册</p>  
    </div>
    <div class="logo_container">
      <!-- logo组件 -->
      <Logo></Logo>
    </div>
    <div class="user_info">
      <transition name="fade">
          <!-- <p class="toast1" v-show="showT">请输入账号</p>   -->
      </transition>
      <div class="input_box">
        <span class="base icon_user"></span> 
        <input type="text" :placeholder="placeholder" @focus="test" v-model="loginKey">
      </div>
      <!-- 渐变线组件 -->
      <Gradient></Gradient>
      <!-- <transition name="fade">
          <p class="toast2" v-show="true">请输入密码</p>  
      </transition> -->
      <div class="input_box pass">
        <span class="base icon_pass"></span>
        <input type="password" placeholder="请输入密码" v-model="loginExt">
      </div>
      <Gradient></Gradient>
    </div>
    <div class="forget">
      <p class="forget_pass" @click="toSign">忘记密码</p>
    </div>
    <div class="submit">
      <p class="submit_btn" @click="Login_s">登录</p>
    </div>
    <!-- loading -->
    <div class="orther_id">
      <p @click="login_2">- 使用其他账号登录 -</p> 
    </div>
    <!-- 底部组件 -->
    <FooterLogo></FooterLogo>
  </div>
  </transition>
</template>

<script>
  import Background from '@/base/background'
  import Logo from '@/base/Logo'
  import FooterLogo from '@/base/footer'
  import Gradient from '@/base/gradient'
  import { verifyLogin, Login } from 'api/login'
  import { verificationPhone } from '*/verification'
  import md5 from 'js-md5'
  import { Indicator } from 'mint-ui'
  export default {
    data () {
      return {
        placeholder: '请输入账号',
        showT: false,
        loginKey: '',
        loginExt: ''
      }
    },
    mounted () {
      let x = JSON.parse(window.localStorage.getItem('userInfo'))
      if (x) {
        this.loginKey = x.userName
        this.loginExt = x.password
      }
      // console.log(X)
    },
    methods: {
      test () {
        // this.placeholder = ''
        this.showT = true
      },
      toSignIn () {
        let userInfo = {
          userName: this.loginKey,
          password: this.loginExt
        }
        window.localStorage.setItem('userInfo', JSON.stringify(userInfo))
        this.$router.push('/sign_in')
      },
      toSign () {
        this.$router.push('/forget_pw')
      },
      Login_s () {
        // 登录前获取检验串
        verifyLogin().then((res) => {
          if (res.data.errCode === this.$ERR_CODE && res.data.retCode === this.$RET_CODE) {
            let secretValue = res.data.data.secretValue
            let secretKey = res.data.data.secretKey
            this.login_2(secretValue, secretKey)
          }
        })
      },
      login_2 (secretValue, secretKey) {
        // 登录
        let reg = verificationPhone(this.loginKey)
        if (reg) {
          Indicator.open({
            spinnerType: 'fading-circle'
          })
          Login({
            loginKey: this.loginKey,
            loginExt: md5(md5(this.loginExt) + secretValue),
            userType: 1008,
            loginType: 1,
            secretKey: secretKey
          }).then(res => {
            if (res.data.errCode === this.$ERR_CODE && res.data.retCode === this.$RET_CODE) {
              this.$router.push('/index')
              Indicator.close()
            } else {
              Indicator.close()
              this.$toast({
                message: res.data.msg,
                duration: 1000
              })
            }
          }).catch(err => {
            console.log(err)
          })
        } else {
          this.$toast({
            message: '请输入正确的手机号',
            duration: 1000
          })
        }
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
  @import '../common/stylus/index.styl'
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
  .fade-enter-active, .fade-leave-active {
    // transition: opacity .5s
    animation: bounceIn 0.5s;
  }
  .slide-enter-active,.slide-leave-active
    transition: all .5s
  .slide-enter
    transform: translateX(100%)
  .slide-leave-to
    transform: translateX(-100%)
  // .fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
  //   // opacity: 0
  //   animation: bounceIn 1.5s reverse;
  // }
  @keyframes bounceIn {
    0% {
      top:19px
      // color:red
    }
    50% {
      top:-19px
      // color:pink
    }
    100% {
      top:-19px
      // color:blue
    }
  }
  .login
    position:absolute
    width:100%
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
      position: relative
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
      .toast1
        font-size: 0.29rem
        position: absolute
        top: -19px
        left: 61px
        color: #fff
      .toast2
        font-size: 0.29rem
        position: absolute
        top: -19px
        left: 61px
        color: #fff
      .input_box
        height:1.02rem
        border-radius:1rem
        background-color:#348e90
        display: flex
        align-items: center
        .base
          margin-left:0.52rem
          margin-right:0.4rem
          background-size cover
        .icon_user
          width:0.3rem
          height:0.46rem
          bg-image('../common/image/phone')
        .icon_pass
          width:0.34rem
          height:0.42rem
          bg-image('../common/image/password')
    .forget
      padding-top: 0.3rem;
      margin:auto 0.74rem
      display:flex
      justify-content:flex-end
      .forget_pass
        padding-right:0.2rem
        font-size:0.24rem
        color:#fff
        text-decoration:underline
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
      margin-top: 1.99rem
      p
        text-align: center
        font-size:0.26rem
        color:#99cccc
</style>
