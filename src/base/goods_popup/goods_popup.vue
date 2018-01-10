<template>
  <div class="popup" v-show="showPopPup">
    <div class="goods_msg" v-show="showGoodModel">
      <div class="close" @click="hidePopPup">
        <span class="close_icon"></span>
      </div>
      <div class="goods_detail">
        <div class="right_good">
          <div class="tips">
            <p class="left">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </p>
            <p class="center">
              <span class="center_text">100</span>
              <span class="center_b">元</span>
            </p>
            <p class="dashed_line"></p>
            <p class="goods_name">话费卷</p>
            <p class="right">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </p>
          </div>
          <span class="damms_text">限时9.6折  剩余5份</span>
          <span class="pay_btn">100金币</span>
        </div>
        <div class="left_msg">
          <div class="base buy_gold">
            <span class="icon_gold"></span>
            <span>9888</span>
            <span class="gold_btn" @click="showPoneC">金币购买</span>
          </div>
          <div class="base buy_damms">
            <span class="icon_damms"></span>
            <span>98</span>
            <span class="damms_btn" @click="showPoneC">钻石购买</span>
          </div>
        </div>
      </div>
    </div>
    <div class="phone_num" v-show="showPoneModel">
      <p class="close" @click="closePhoneC">
        <span class="icon_close">icon</span>
      </p>
      <p class="title">填写手机号</p>
      <p class="tipe_top">880金币兑换价值100元话费</p>
      <div class="ipt">
        <input type="text">
        <span class="icon"></span>
      </div>
      <p class="tips_bottom">
        <span>账户绑定号码（湖南移动）</span>
        <span class="lack">本地区100元面值暂时缺货</span>
      </p>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      showPopPup: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        showGoodModel: true, // 显示兑换商品详情模态框
        showPoneModel: false // 显示输入手机号模态框
      }
    },
    methods: {
      hidePopPup () {
        // 关闭购买商品组件
        this.$emit('hidePopPup')
      },
      showPoneC () {
        // 打开输入手机号模态框
        [this.showGoodModel, this.showPoneModel] = [false, true]
      },
      closePhoneC () {
        // 关闭输入手机号模态框
        [this.showGoodModel, this.showPoneModel] = [true, false]
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../../common/stylus/index.styl'
  .popup
    position:absolute
    width:100%
    height:100%
    top:0
    left:0
    display:flex
    justify-content:center
    background:rgba(0,0,0,.6)
    .phone_num
      background:#fff
      width:6.9rem
      height:4rem
      color:#333
      margin-top:2rem
      border-radius :0.1rem
      .close
        display:flex
        justify-content:flex-end
      .title
        text-align:center
        margin-top:0.4rem
        font-weight:bold
      .tipe_top
        margin-top:0.3rem
        font-size:0.2rem
        margin-left:0.8rem
        margin-bottom:0.2rem
      .tips_bottom
        font-size:0.2rem
        width:5.49rem
        display:flex
        justify-content:space-between
        margin:auto 0.8rem
        margin-top:0.15rem
        .lack
          color:red
      .ipt
        margin:auto 0.5rem
        border:1px solid #9fcbcb
        height:0.7rem
        border-radius:1rem
        display:flex
        align-items:center
        input
          width:5rem
          margin-left:0.3rem
          height:100%
        .icon
          display:inline-block
          width:0.45rem
          height:0.45rem
          background-size:cover
          bg-image('img/men')
    .goods_msg
      position:relative
      margin-top:2rem
      width:6.9rem
      height:4rem
      background:#fff
      border-radius:0.1rem
      .close
        height:0.7rem
        color:#663300
        display:flex
        justify-content:flex-end
        .close_icon
          margin:0.2rem 0.2rem 0 0
          width:0.3rem
          height:0.3rem
          background-size:cover
          bg-image('img/close')
      .goods_detail
        position: relative
        display:flex
        .left_msg
          color:#663300
          margin-left:0.5rem
          .base
            height:0.6rem
            display:flex
            align-items:center
            width:3.3rem
            justify-content:space-between
          .buy_gold
            margin-top:0.5rem
            .gold_btn
              text-align:center
              color:#fff
              border-radius:0.1rem
              height:100%
              width:1.5rem
              line-height:0.6rem
              background:#339999
            .icon_gold
              width:0.29rem
              height:0.28rem
              background-size:cover
              bg-image('img/gold')
          .buy_damms
            margin-top:0.32rem
            .damms_btn
              text-align:center
              color:#663300
              border-radius:0.1rem
              height:100%
              width:1.5rem
              line-height:0.6rem
              border:1px solid #4ba4a4
            .icon_damms
              width:0.3rem
              height:0.27rem
              background-size:cover
              bg-image('img/damm')
        .right_good
          margin-left:0.5rem
          border-radius:0.1rem
          width:2.22rem
          height:2.4rem
          background: radial-gradient(at 62px 40px,#0fafc5, #01696b)
          box-shadow: 0px 2px 0px #02373c
          .tips
            position:relative
            margin:auto 0.13rem
            width:1.94rem
            height:0.82rem
            background:#3c9fe3
            top:0.3rem
            .left
              font-size:0
              position:absolute
              z-index:1000
              span
                margin-top:0.03rem
                display:block
                width:0.05rem
                height:0.05rem
                border-radius:100%
                background:#028e90
            .right
              font-size:0
              position:absolute
              z-index:1000
              right:0
              top:0
              span
                margin-top:0.03rem
                display:block
                width:0.07rem
                height:0.07rem
                border-radius:100%
                background:#028e90
            .center
              color:#fff
              margin-left:0.3rem
              padding-top:0.15rem
              span
                display:inline-block
              .center_b
                font-size:0.13rem
              .center_text
                font-size:0.55rem
            .dashed_line
              position:absolute
              left:1.5rem
              top:0
              height:98%
              border:1px dashed #067d89
            .goods_name
              position:absolute
              top:0.12rem
              right:0.12rem
              width:0.2rem
              color:#fff
              font-size:0.2rem
          span
            display:block
          .damms_text
            font-size:0.2rem
            text-align:center
            margin-top:0.5rem
            margin-bottom:0.15rem
            color:#fff
          .pay_btn
            font-size:0.3rem
            width:1.89rem
            height:0.5rem
            text-align:center
            line-height:0.5rem
            margin:auto 0.15rem
            background:linear-gradient(#fffe8a, #ffa504)
            box-shadow: 1px 2px 1px #b7832e
            border-radius:0.1rem
            color:#663300
</style>

