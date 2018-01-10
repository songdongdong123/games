<template>
<transition name="fade" >
  <div class="payaway"  v-show="showPayAway">
    <div class="buydamm">
      <p class="close_icon">
       <span class="close" @click="hidePayAway"></span>
      </p>
      <p class="title">购买钻石</p>
      <p class="explain">您将以¥198.00的价格购买1980钻石，将赠送320钻石</p>
      <p class="pays">选择支付方式</p>
      <div class="paylist">
        <div class="base wechat" @click="payAway(21)">
          <p>
            <span class="wechat_icon"></span>
            <span>微信</span>
          </p>
          <span class="back_icon"></span>
        </div>
        <div class="base alipay" @click="payAway(11)">
          <p>
            <span class="alipay_icon"></span>
            <span>支付宝</span>
          </p>
          <span class="back_icon"></span>
        </div>
      </div>
    </div>
  </div>
</transition>
</template>

<script>
  import { toPay } from 'api/pay'
  const ERR_CODE = 0
  const RET_CODE = 0
  export default {
    props: {
      showPayAway: {
        type: Boolean,
        default: false
      },
      payMoney: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {}
    },
    methods: {
      hidePayAway () {
        this.$emit('hidePayAway')
      },
      payAway (paytype) {
        // console.log(this.payMoney)
        // 微信支付
        toPay({
          payType: paytype,
          payAmount: 0.01
        }).then(res => {
          if (res.data.errCode === ERR_CODE && res.data.retCode === RET_CODE) {
            location.href = res.data.data.payUrl
          }
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../../common/stylus/index.styl'
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
    opacity: 0
  }
  .payaway
    position:absolute
    width:100%
    height:100%
    background:rgba(0,0,0,.6)
    z-index:1000
    .buydamm
      margin:auto 0.3rem
      margin-top:1.28rem
      height:4.83rem
      background:#f3f3f3
      border-radius:0.1rem
      font-size:0
      .close_icon
        display:flex
        justify-content:flex-end
        font-size:0.3rem
        padding-top:0.1rem
        margin-right:0.1rem
        .close
          display:inline-block
          width:0.28rem
          height:0.28rem
          background-size:cover
          bg-image('./img/close')
      .title
        text-align:center
        font-size:0.37rem
        color:#339999
        margin-bottom:0.52rem
      .explain
        margin:auto 0.52rem
        font-size:0.22rem
        margin-bottom:0.22rem
      .pays
        font-size:0.37rem
        margin-left:0.52rem
        margin-bottom:0.27rem
      .paylist
        background:#fff
        .base
          height:0.8rem
          font-size:0.23rem
          display:flex
          justify-content:space-between
          align-items:center
          .back_icon
            margin-right:0.1rem
            display:inline-block
            width:0.16rem
            height:0.28rem
            bg-image('./img/back')
            background-size:cover
        .wechat
          border-bottom:1px solid #f3f3f3
          margin-left:0.3rem
          p
            display:flex
            font-size:0.23rem
            align-items:center
            .wechat_icon
              width:0.56rem
              height:0.56rem
              bg-image('./img/wechat')
              background-size:cover
              margin-right:0.3rem
        .alipay
          margin-left:0.3rem
          p
            display:flex
            font-size:0.23rem
            align-items:center
            .alipay_icon
              width:0.56rem
              height:0.56rem
              bg-image('./img/alipay')
              background-size:cover
              margin-right:0.3rem
              .back_icon
                margin-right:0.1rem
                margin-right:0.1rem
                display:inline-block
                width:0.16rem
                height:0.28rem
</style>
