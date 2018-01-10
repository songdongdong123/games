<template>
  <div class="addressmanage">
    <div class="title">
      <p>收货地址</p>
      <p>7日内发货</p>
    </div>
    <div class="oldaddress" @click="toNewAddress">
      <div class="adress_container">
        <div class="adress_icon">
          <span class="icon"></span>
        </div>
        <div class="center" v-if="hasAddress">
          <p class="consignee">
            <span class="name">{{names}}</span>
            <span class="phone">{{phone}}</span>
          </p>
          <p class="consignee_address">
            {{area}}
          </p>
        </div>
        <div class="newaddress" v-else >
          <span class="new_icon"></span>
          <span class="text">添加收货地址</span>
        </div>
        <div class="left">
          <span class="left_icon"></span>
        </div>
      </div>
    </div>
    <div class="product_msg">
      <div class="title_msg">
        <p>中奖奖品</p>
      </div>
      <div class="product_detail">
        <div class="pro_img">
          <img src="http://m.dev.pearlba.com/pic/SJ2x.png" alt="">
        </div>
        <div class="pro_msg">
          <p class="pro_name">小米 红米Note4X 5.5寸高清屏全网通版</p>
          <!-- <p class="pro_price">12500</p> -->
          <span class="source">小米官网直营</span>
        </div>
      </div>
    </div>
    <div class="submit" @click="toPrizeOrderDetail">
      <p class="submit_btn">确认提交</p>
    </div>
  </div>
</template>

<script>
  import { getUserAddressList } from 'api/address'
  import { mapMutations } from 'vuex'
  export default {
    data () {
      return {
        hasAddress: false,
        names: '',
        phone: '',
        area: ''
      }
    },
    created () {
      this.key = this.$route.query.key
      this.recordId = this.$route.query.recordId
      this.$toast({
        message: '恭喜您抽奖成功',
        duration: 1000
      })
      this._getUserAddressList()
      this.setProMsg(
        {
          key: this.key,
          recordId: this.recordId
        }
      )
    },
    methods: {
      toNewAddress () {
        if (this.hasAddress) {
          this.$router.push('/addresslist')
        } else {
          this.$router.push('/newaddress')
        }
      },
      toPrizeOrderDetail () {
        this.$router.push('/prizeorderdetail')
      },
      _getUserAddressList () {
        // 查看上次收货地址
        getUserAddressList({
          isAll: 0
        }).then(res => {
          if (res.data.errCode === this.$ERR_CODE && res.data.retCode === this.$RET_CODE) {
            if (res.data.data.length) {
              [this.names, this.phone, this.area] = [
                res.data.data[0].name,
                res.data.data[0].phone,
                res.data.data[0].area + res.data.data[0].detailedAddress
              ]
              this.hasAddress = true
            } else {
              this.hasAddress = false
            }
          }
        })
      },
      ...mapMutations({
        setProMsg: 'SET_PRODUCT_MSG'
      })
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../../common/stylus/index.styl'
  .addressmanage
    min-height:100vh
    background:#f3f3f3
    .title
      font-size:0.3rem
      display:flex
      justify-content:space-between
      margin: auto 0.3rem
      height:1rem
      line-height:1rem
    .oldaddress
      background:#fff
      .adress_container
        height:1.52rem
        margin:auto 0.3rem
        display:flex
        justify-content:space-between
        align-items:center
        font-size: 0
        .adress_icon
          .icon
            display:inline-block
            background-size: cover
            width:0.3rem
            height:0.44rem
            bg-image('img/adress')
        .center
          width:5.3rem
          color:#333
          font-size:0
          .consignee
            .name
              font-size:0.3rem
            .phone
              font-size:0.36rem
              font-weight: bold
          .consignee_address
            font-size:0.24rem
            color:#a0a0a0
            margin-top:0.1rem
            line-height:0.4rem
        .newaddress
          font-size:0.3rem
          display:flex
          align-items:center
          margin-right: 2rem
          .new_icon
            margin-right:0.5rem
            display:inline-block
            width:0.76rem
            height:0.76rem
            background-size:cover
            bg-image('img/add')
        .left
          .left_icon
            display:inline-block
            background-size:cover
            width:0.24rem
            height:0.43rem
            bg-image('img/left')
    .product_msg
      .title_msg
        background:#fff
        height:0.7rem
        padding-left:0.3rem
        font-size:0.24rem
        line-height:0.7rem
        margin-top:0.3rem
      .product_detail
        height:1.54rem
        display:flex
        align-items:flex-end
        margin:auto 0.3rem
        margin-top:0.2rem
        .pro_img
          width:1.5rem
          height:1.54rem
          background:#fff
          display:flex
          justify-content:center
          align-items:center
          img
            width:0.88rem
            height:1rem
        .pro_msg
          font-size:0.2rem
          margin-left:0.2rem
          color:#333
          .pro_name
            margin-bottom:0.6rem
          .source
            display:inline-block
            height:0.46rem
            line-height:0.46rem
            background:#f29b76
            color:#fff
            padding: 0 0.1rem 0 0.1rem
    .submit
      position:fixed
      bottom:0
      left:0
      width:100%
      height:1rem
      font-size:0.3rem
      text-align:center
      line-height:1rem
      background:#339999
      color:#fff
</style>
