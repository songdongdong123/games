<template>
<transition name="fade" >
  <div class="error" v-show="showError">
    <div class="container">
      <div class="close" @click="hideError">
        <span class="close_icon"></span>
      </div>
      <div class="sadcontainer">
        <span
          :class="{'smile': deficiency}" 
          class="sad_icon"></span>
      </div>
      <p class="text" v-show="!deficiency">钻石余额不足</p>
      <p class="text" v-show="deficiency">{{damms}}钻石兑换{{gold}}金币</p>
      <p class="submint_btn"
        @click="insufficientAffirmPay"  
        v-show="!deficiency">钻石不足请充值</p>
      <p class="submint_btn"
        @click="submitAffirmPay"  
        v-show="deficiency">兑换</p>
    </div>
  </div>
</transition>
</template>

<script>
  import { mapActions } from 'vuex'
  export default {
    props: {
      showError: {
        type: Boolean,
        default: false
      },
      gold: {
        type: Number,
        default: 0
      },
      damms: {
        type: Number,
        default: 0
      },
      Alldamms: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {
        deficiency: false
      }
    },
    watch: {
      showError (newV, oldV) {
        if (!oldV) {
          this.deficiency = this.Alldamms > this.damms
        }
      }
    },
    methods: {
      insufficientAffirmPay () {
        // console.log(0)
        // 钻石不足
        this.setAffirmModeMsg({
          falgA: true,
          falgB: false
        })
        this.hideError()
      },
      submitAffirmPay () {
        // 钻石充足可以兑换
        this.setAffirmModeMsg({
          falgA: false,
          falgB: true
        })
        this.hideError()
      },
      hideError () {
        this.$emit('hideError')
      },
      ...mapActions([
        'setAffirmModeMsg'
      ])
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../../common/stylus/index.styl'
  .error
    position:absolute
    z-index:2000
    width:100%
    height:100%
    background:rgba(0,0,0,.5)
    .container
      margin:auto 0.3rem
      width:6.9rem
      height:4.8rem
      background:#fff
      margin-top:1.28rem
      border-radius:0.1rem
      .close
        font-size:0
        display:flex
        justify-content:flex-end
        .close_icon
          display:inline-block
          height:0.28rem
          width:0.28rem
          background-size:cover
          bg-image('./img/close')
          margin-top:0.1rem
          margin-right:0.1rem
      .sadcontainer
        display:flex
        justify-content:center
        .sad_icon
          display:inline-block
          width:1.13rem
          height:1.13rem
          background-size:cover
          bg-image('./img/sad')
          margin-top:0.5rem
        .smile
          bg-image('./img/smile')
      .text
        text-align:center
        font-size:0.3rem
        color:#c9c9c9
        margin-top:0.44rem
      .submint_btn
        width:4.7rem
        height:1.02rem
        text-align:center
        line-height:1.02rem
        color:#fff
        background:#339999
        font-size:0.3rem
        margin:auto 1.1rem
        border-radius:1rem
        margin-top:0.68rem
</style>
