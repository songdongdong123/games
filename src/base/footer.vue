<template>
  <div class="other_login">
      <div class="logo_box">
        <div class="logo_box wechat_logo"></div>
        <p>微信</p>
      </div>
      <div class="logo_box">
        <div class="logo_box qq_logo"></div>
        <p>QQ</p>
      </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {}
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../common/stylus/index.styl'
  .other_login
    display:flex
    margin: auto 1.5rem
    margin-top 0.4rem
    justify-content: space-between;
    .logo_box
      text-align: center;
    p
      color:#fff
      font-size:0.28rem
      margin-top:0.15rem
    .logo_box
      width:0.84rem
      height:0.84rem
    .wechat_logo
      // background-image:url('../common/image/wechat.png')
      bg-image('../common/image/wechat')
      background-size:cover
    .qq_logo
      bg-image('../common/image/qq')
      // background-image:url('../common/image/qq.png')
      background-size:cover
</style>