<template>
<transition name="slide">
  <div class="sign_model" v-show="signState">
    <div class="reword">
      <div class="cneter_icon">
        <span v-if="awardInfo.days !== 3 && awardInfo.days !== 7" class="icon_center state_1"></span>
        <span v-else class="icon_center state_3"></span>
      </div>
      <p class="gold_num">{{awardInfo.tips}}</p>
      <p class="tips" v-if="awardInfo.days !== 3 && awardInfo.days !== 7">金币可用于参与竞猜</p>
      <p class="tips" v-else>钻石可用于兑换金币</p>
    </div>
  </div>
</transition>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'
  export default {
    data () {
      return {
        timer: ''
      }
    },
    computed: {
      ...mapGetters([
        'signState',
        'awardInfo'
      ])
    },
    watch: {
      signState (newV, oldV) {
        this.closeMode()
        if (oldV) {
          clearTimeout(this.timer)
        }
      }
    },
    methods: {
      closeMode () {
        // 关闭弹窗
        this.timer = setTimeout(() => {
          this.hideMode(false)
        }, 2500)
      },
      ...mapMutations({
        hideMode: 'SET_SIGN_STATE'
      })
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../../common/stylus/index.styl'
  .slide-enter-active,.slide-leave-active
    transition: all 0.5s
  .slide-enter
    transform:scale(0.2)
  .slide-leave-to
    transform:scale(0)
  .sign_model
    position:fixed
    // width:100%
    // height:100%
    // background:rgba(0,0,0,.7)
    z-index:1005
    display:flex
    justify-content:center
    .reword
      margin-top:1.3rem
      width:7.5rem
      height:5.07rem
      background-image url('img/bj.png')
      background-size: cover
      position:relative
      .cneter_icon
        width:100%
        height:100%
        display:flex
        justify-content:center
        align-items:center
        .icon_center
          display:inline-block
          background-size:cover
        .state_1
          width:2.24rem
          height:1.46rem
          background-image url('img/jb.png')
        .state_2
          width:1.65rem
          height:1.64rem
          background-image url('img/lb.png')
        .state_3
          width:2.1rem
          height:1.59rem
          background-image url('img/zs.png')
      .gold_num
        position:absolute
        width:100%
        text-align:center
        bottom:1rem
        font-size:0.48rem
        color:#ffcc00
      .tips
        position:absolute
        width:100%
        color:#ffffff
        text-align:center
        font-size:0.3rem
        bottom:0.25rem
</style>



