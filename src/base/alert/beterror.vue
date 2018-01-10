<template>
  <div class="betError" v-show="betError">
    <div class="mask" @click="hideBetErrorMethod">
    </div>
    <div class="container">
      <div class="content">
        <div class="gold_icon">
          <span></span>
        </div>
        <p class="error_text">投注失败</p>
        <p class="error_in">金币余额不足</p>
        <p class="duihuan" @click="toPayPage">兑换金币>></p>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'
  export default {
    data () {
      return {}
    },
    methods: {
      toPayPage () {
        // 跳转到充值页面
        this.$router.push('/pay')
        this.hideBetError(false)
      },
      hideBetErrorMethod () {
        this.hideBetError(false)
      },
      ...mapMutations({
        hideBetError: 'SET_BET_ERROR'
      })
    },
    computed: {
      ...mapGetters([
        'betError'
      ])
    }
  }
</script>
<style lang="stylus" scoped>
  @import '../../common/stylus/index.styl'
  .betError
    display:flex
    // justify-content:center
    .mask
      position:fixed
      width:100%
      height:100%
      background:rgba(0,0,0,.7)
      z-index:1500
    .container
      position:fixed
      width:100%
      bottom:50%
      z-index:1500
      display:flex
      justify-content:center
      .content
        border-radius:0.1rem
        background:linear-gradient(#5ec4c4, #036969)
        width:6rem
        height:3rem
        .gold_icon
          height:0.9rem
          width:0.9rem
          border-radius:100%
          background:#99ffff
          margin:0 auto
          margin-top:0.3rem
          display:flex
          justify-content:center
          align-items:center
          span
            display:inline-block
            width:0.62rem
            height:0.58rem
            background-size:cover
            bg-image('img/gold')
        p
          text-align:center
        .error_text
          margin-top:0.25rem
          color:#fff
          font-size:0.3rem
        .error_in
          margin-top:0.25rem
          color:#fff
          font-size:0.3rem
        .duihuan
          margin-top: 0.2rem;
          width:100%
          bottom:0.25rem
          font-size:0.24rem
          color:#5dc2c2
</style>

