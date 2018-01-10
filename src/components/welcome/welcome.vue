<template>
  <div class="login">
    <Background></Background>
    <div class="logo_container">
      <Logo></Logo>
    </div>
    <div class="welcome">
      <div class="container">
        <div class="welcome_logo"></div>
        <p class="welcome_text">欢迎加入</p> 
      </div>
    </div>
  </div>
</template>

<script>
  import Background from '@/base/background'
  import Logo from '@/base/Logo'
  export default {
    data () {
      return {}
    },
    created () {
      setTimeout(() => {
        this.toLogin()
      }, 3 * 1000)
    },
    methods: {
      toLogin () {
        this.$router.push('/index')
      }
    },
    components: {
      Background,
      Logo
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../../common/stylus/index.styl'
  .login
    .sign_in
      padding-top:0.78rem
      width:100%
      display:flex
      justify-content:flex-end
    .logo_container
      padding-top:1.98rem
      margin-bottom:0.6rem
      display:flex
      justify-content: center
    .welcome
      display:flex
      justify-content:center
      margin-top:1.65rem
      .welcome_logo
        width:1rem
        height:1rem
        bg-image('img/tick')
        background-size: cover
        margin-left:0.1rem
      .welcome_text
        margin-top:0.3rem
        text-align:center
        color:#fff
        font-size:0.3rem
</style>

