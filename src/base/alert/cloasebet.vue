<template>
<transition>
  <div class="closebet" v-show="closeBetCarState">
    <div class="marsk"></div>
    <div class="coloe_container">
      <div class="content">
        <div class="top">
          <p class="title">关闭投注后，投注信息将被清空</p>
          <p class="text">确认关闭吗？</p>
        </div>
        <div class="bottom">
          <p class="yes" @click="emptyBet">是</p>
          <p class="no" @click="hideBetCar">否</p>
        </div>
      </div>
    </div>
  </div>
</transition>
</template>
<script>
  import { mapGetters, mapMutations, mapActions } from 'vuex'
  export default {
    data () {
      return {}
    },
    computed: {
      ...mapGetters([
        'closeBetCarState'
      ])
    },
    methods: {
      emptyBet () {
        this.setBetCarClose({
          falgA: false,
          falgB: false,
          falgC: true
        })
      },
      hideBetCar () {
        this.hideCloseBetCar(false)
      },
      ...mapMutations({
        hideCloseBetCar: 'SET_CLOSE_BET_CAR'
      }),
      ...mapActions([
        'setBetCarClose'
      ])
    }
  }
</script>

<style lang="stylus" scoped>
  .closebet
    .marsk
      top:0
      left:0
      position:fixed
      width:100%
      height:100vh
      background:rgba(0,0,0,.5)
      z-index:1500
    .coloe_container
      position:relative
      width:100%
      margin:auto 0.75rem 
      z-index:1500
      .content
        position:fixed
        bottom:3.6rem
        width:6rem
        height:3rem
        background:#fff
        border-radius:0.2rem
        overflow: hidden
        .top
          height:2rem
          background:linear-gradient(#62c8c8, #1c8282)
          p
            text-align:center
            color:#fff
          .title
            padding-top:0.4rem
            font-size:0.3rem
          .text
            padding-top:0.2rem
            font-size:0.36rem
        .bottom
          height:1rem
          display:flex
          justify-content:space-between
          p
            width:50%
            font-size:0.36rem
            text-align:center
            line-height:1rem
          .yes
            background:#336666
            color:#99ffff
          .no
            background:#99ffff
            color:#003333
</style>

