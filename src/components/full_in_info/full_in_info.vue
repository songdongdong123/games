<template>
  <div class="login">
    <Background></Background>
    <div class="user_image">
      <img src="../../common/image/Messi.png" alt="">
      <img src="../../common/image/Messi.png" alt="">
      <img src="../../common/image/Messi.png" alt="">
    </div>
    <div class="user_info">
      <div class="input_box">
        <span class="icon_pen"></span> 
        <input type="text" placeholder="请输入手机号">
        <span class="icon_reset"></span>
      </div>
    </div>
    <div class="submit">
      <p class="submit_btn">确定</p>
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
    methods: {
      toLogin () {
        this.$router.push('/')
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
    .user_image
      display: flex;
      justify-content: space-between;
      padding-top:3.08rem
      margin:auto 0.74rem
    .submit
      height:1.02rem
      margin:auto 0.74rem
      border-radius:1rem
      margin-top:0.88rem
      .submit_btn
        color:#fff
        font-size: 0.35rem
        text-align:center
        line-height:1.02rem
        border 1px solid #fff
        border-radius: 1rem
    .user_info
      margin:auto 0.9rem
      border-1px(rgba(255,255,255,1))
      padding-bottom:0.1rem
      margin-top:0.6rem
      .input_box
        display: flex
      span
        display:inline-block
      input
        width:4.5rem
        height:0.48rem
        font-size 0.29rem
        color:#fff
        background-color:rgba(0,0,0,0)
        margin-left:.18rem
      .icon_pen
        width:0.45rem
        height:0.45rem
        bg-image('../../common/image/pen')
        background-size: cover
        // background: url('../../common/image/pen.png') no-repeat
      .icon_reset
        width:0.39rem
        height:0.38rem
        bg-image('../../common/image/reload')
        background-size: cover
        // background: url('../../common/image/reload.png') no-repeat
</style>

