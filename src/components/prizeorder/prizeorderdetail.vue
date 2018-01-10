<template>
  <div class="prizeorderdetail">
    <div class="order_detail_container">
      <div class="order_detail">
        <p class="left">奖品派发中</p>
        <p class="right">
          客服妹子正全力为您派发奖品~ 奖品将于48小时内寄出
        </p>
      </div>
    </div>
    <div class="address_container" v-if="true">
      <div class="address">
        <div class="left">
          <p class="addressee">收件人：亨总</p>
          <p class="address_detail">收件地址：广东省深圳市南山区阿里巴巴大厦T2 栋1222</p>
        </div>
        <div class="right">
          <p class="Contact">1888888888</p>
        </div>
      </div>
    </div>
    <div class="dummy_prize_container" v-else>
      <div class="dummy_prize">
        <p class="prize_number">手机号码：18888888888</p>
      </div>
    </div>
    <div class="prize_container">
      <div class="prize">
        <div class="left">
          <img src="http://m.dev.pearlba.com/pic/SJ2x.png" alt="">
        </div>
        <div class="right">
          <p class="prize_name">100元话费卡 支持移动、联通、电信</p>
          <span class="source">66直营</span>
        </div>
      </div>
    </div>
    <div class="other_container">
      <div class="other">
        <div class="guess base">
          <p>竞猜赚金币</p>
        </div>
        <div class="order_detail base" @click="toOrderDetail">
          <p>查看订单详情</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {}
    },
    methods: {
      toOrderDetail () {
        this.$router.push('/orderdetail')
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../../common/stylus/index.styl'
  .prizeorderdetail
    min-height:100vh
    background:#f3f3f3
    .order_detail_container
      background:#339999
      .order_detail
        margin:auto 0.3rem
        height:1rem
        display:flex
        justify-content:space-between
        align-items:center
        color:#fff
        .left
          font-size:0.3rem
        .right
          width:3.3rem
          font-size:0.2rem
          line-height:0.35rem
    .address_container
      background:#fff
      box-shadow: 0px 5px 10px #dbdbdb
      .address
        height:1.6rem
        margin:auto 0.3rem
        display:flex
        justify-content:space-between
        font-size:0.24rem
        .left
          color:#333
          margin-top:0.25rem
          .address_detail
            width:5.3rem
            margin-top:0.2rem
            line-height:0.35rem
        .right
          margin-top:0.25rem
    .dummy_prize_container
      background:#fff
      margin-top:0.1rem
      .dummy_prize
        height:1rem
        margin:auto 0.3rem
        .prize_number
          font-size:0.24rem
          line-height:1rem
    .prize_container
      background:#fff
      .prize
        margin:auto 0.3rem
        margin-top:0.1rem
        height:1.9rem
        display:flex
        .left
          width:1.5rem
          height:1.5rem
          background:#f3f3f3
          display:flex
          justify-content:center
          align-items:center
          margin-top:0.2rem
          img
            max-width:0.8rem
            max-height:0.9rem
        .right
          font-size:0.24rem
          color:#333
          margin-top:0.3rem
          margin-left:0.25rem
          .source
            display:inline-block
            margin-top:0.6rem
            padding:0.1rem 0.2rem 0.1rem 0.2rem
            background:#cccccc
            color:#fff
    .other_container
      margin-top:0.1rem
      background:#fff
      .other
        margin:auto 0.3rem
        height:1.6rem
        font-size:0.3rem
        display:flex
        justify-content:space-between
        align-items:center 
        .base
          width:3rem
          height:0.8rem
          text-align:center
          line-height:0.8rem
        .guess
          background:#339999
          color:#fff
        .order_detail
          border:1px solid #339999
          color:#339999
</style>
