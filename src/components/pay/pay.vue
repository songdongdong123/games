<template>
  <div class="pay">
    <!-- 兑换成功组件 -->
    <signSuccess></signSuccess>
    <buling 
    :show-buling="showBuling" 
    @hideBuling="hideBulingModel"></buling>
    <!-- 金币不足组件 -->
    <errorpay
      :gold="exchangeGold"
      :Alldamms="AllDamms"
      :damms="exchangeDamms" 
      :show-error="showError" 
      @hideError="hideErrorModel"></errorpay>
    <!-- 选择支付方式组件 -->
    <payaway :pay-money="payMoney" :show-pay-away="showPayAway" @hidePayAway="hidePayAwayModel"></payaway>
    <div class="mask" v-show="signState"></div>
    <div class="top_title">
      <p class="left">
        <img :src="picurl" alt="">
        <span>{{userName}}</span>
      </p>
      <p class="right">
        <span class="damm_icon"></span>
        <span class="damm_num">{{damms}}</span>
        <span class="gold_icon"></span>
        <span class="gold_num">{{gold}}</span>
      </p>
    </div>
    <div class="paycontainer">
      <div class="damm_gold_tab">
        <p class="dammpay" :class="{'active':index === 1}" @click="chooseClass(1)">钻石充值</p>
        <p class="goldpay" :class="{'active':index === 2}" @click="chooseClass(2)">金币兑换</p>
      </div>
      <div class="goldanddamms">
        <div class="damm_list" :class="{'damms_list_active':index === 1}" @click="chooseClass(1)">
          <div class="damm_item" v-for="(item, index) in dammsList" @click="showPayAwayMe(item.money)">
            <span class="dmms_icon"></span>
            <span class="damms_text">{{item.damms}}钻石</span>
            <span class="pay_btn">¥ {{item.money}}元</span>
          </div>
        </div>
        <div class="gold_list" :class="{'gold_list_active':index === 2}" @click="chooseClass(2)">
          <div class="damm_item" v-for="item in goldArr" @click="toExchange(item.damms, item.gold)">
            <span class="damms_text">{{item.gold}}金币</span>
            <span class="pay_btn">{{item.damms}}钻石</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import payaway from './payaway'
  import signSuccess from '@/base/sign_success/sign_success'
  import buling from '@/base/buling/buling'
  import errorpay from '@/base/buling/errorpay'
  import moneyArrObj from '*/moneydata' // 钻石规格数据
  import { exchange } from 'api/pay'
  import { getSimpleUserInfo } from 'api/userinfo'
  import { formatFloat } from '*/common'
  import { mapActions, mapGetters, mapMutations } from 'vuex'
  // import affirmPay from '@/base/alert/affirmPay'
  export default {
    data () {
      return {
        toggleTab: false,
        dammsList: moneyArrObj.moneyArr,
        goldArr: moneyArrObj.goldArr,
        index: 2,
        payMoney: 0,
        picurl: '', // 用户图像
        gold: 0, // 用户金币
        damms: 0, // 用户钻石
        userName: '', // 用户名称
        exchangeGold: 0,
        exchangeDamms: 0,
        AllDamms: 0,
        showError: false, // 金币不足组件状态
        showBuling: false, // 显示兑换成功组件状态
        showPayAway: false // 显示支付方式组件状态
      }
    },
    computed: {
      ...mapGetters([
        'awardInfo',
        'affirmPayState',
        'submitAffurmGold',
        'signState'
      ])
    },
    created () {
      this._getSimpleUserInfo()
      // if (this.$route.query.falg === 1) {
      //   this.index = 2
      // } else {
      //   this.index = 1
      // }
    },
    watch: {
      submitAffurmGold (newV, oldV) {
        if (!oldV) {
          this.submintExchange()
        }
      },
      affirmPayState (newV, oldV) {
        if (!oldV) {
          this.index = 1
          this.showAffirmPayMode(false)
        }
      }
    },
    methods: {
      _getSimpleUserInfo () {
        // 获取用户基本信息
        getSimpleUserInfo({}).then(res => {
          if (res.data.errCode === this.$ERR_CODE && res.data.retCode === this.$RET_CODE) {
            [
              this.picurl,
              this.gold,
              this.damms,
              this.userName] = [
                res.data.data.picture,
                formatFloat(res.data.data.gold),
                formatFloat(res.data.data.diamond),
                res.data.data.nickname
              ]
            this.AllDamms = res.data.data.diamond
          }
        })
      },
      toExchange (damm, gold) {
        this.exchangeGold = gold
        this.exchangeDamms = damm
        this.showErroModel()
      },
      submintExchange () {
        // 兑换金币
        exchange({
          exDiamond: this.exchangeDamms,
          exGold: this.exchangeGold
        }).then(res => {
          if (res.data.errCode === this.$ERR_CODE && res.data.retCode === this.$RET_CODE) {
            let currentDay = {
              tips: this.exchangeGold,
              paydays: 8,
              days: this.awardInfo.days
            }
            this._getSimpleUserInfo()
            this.setSignState({
              info: currentDay,
              signState: true
            })
            this.setSubmitAffirm(false)
          } else {
            this.showErroModel()
          }
        })
      },
      chooseClass (index) {
        // 切换钻石和金币tab
        this.index = index
      },
      hidePayAwayModel () {
        // 隐藏充值页面
        this.showPayAway = false
      },
      showPayAwayMe (money) {
        // 显示充值组件
        this.payMoney = money // 获取充值金额
        this.showPayAway = true
      },
      hideBulingModel () {
        // 隐藏兑换成功组件
        this.showBuling = false
      },
      showBulingModel () {
        // 显示兑换成功组件
        this.showBuling = true
      },
      showErroModel () {
        // 显示钻石不足组件
        this.showError = true
      },
      hideErrorModel () {
        // 隐藏兑换金币不足组件
        this.showError = false
      },
      ...mapActions([
        'setSignState'
      ]),
      ...mapMutations({
        showAffirmPayMode: 'SET_AFFIRM_PAY_STATE',
        setSubmitAffirm: 'SET_SUBMIT_AFFIRM_GOLD'
      })
    },
    components: {
      payaway,
      buling,
      errorpay,
      signSuccess
    }
  }
</script>
<style lang="stylus" scoped>
  @import '../../common/stylus/index.styl'
  .mask
    position:absolute
    width:100%
    height:100%
    left:0
    top:0
    background:rgba(0,0,0,.3)
    z-index:100
  .pay
    overflow-x:hidden
    background:linear-gradient(#033636, #437676)
    .top_title
      height:0.98rem
      display:flex
      justify-content:space-between
      align-items:center
      padding:0 0.3rem 0 0.3rem
      font-size:0.3rem
      // background:#66cccc
      .left
        display:flex
        align-items:center
        color:#fff
        img
          width:0.62rem
          height:0.62rem
          margin-right:0.16rem
          border-radius:100%
          border:2px solid #fff
      .right
        display:flex
        align-items:center
        span
          display:inline-block
          background-size:cover
          font-size:0.3rem
        .damm_icon
          width:0.42rem
          height:0.39rem
          bg-image('img/diamond')
          margin-right:0.05rem
        .damm_num
          color:#93f8f8
          margin-right:0.56rem
        .gold_icon
          width:0.41rem
          height:0.42rem
          bg-image('img/gold')
          margin-right:0.05rem
        .gold_num
          color:#93f8f8
    .paycontainer
      // background:#012424
      height:11.2rem
      width:100%
      overflow-x:hidden
      .damm_gold_tab
        display:flex
        // height:0.8rem
        align-items:center
        margin:auto 0.3rem
        font-size:0.27rem
        color:#fff
        margin-top:0.4rem
        overflow: hidden
        // padding-top:0.4rem
        border:0.04rem solid #339999
        border-radius:0.2rem
        .dammpay
          height:0.8rem
          width:50%
          line-height:0.8rem
          text-align:center
          // background:#66cccc
          // border-radius:0.2rem 0 0 0.2rem
        .goldpay
          height:0.8rem
          line-height:0.8rem
          width:50%
          text-align:center
          // background:#66cccc
          // border-radius:0 0.2rem 0.2rem 0
        .active
          background:#339999
          color:#fff
      .goldanddamms_active
        transform:translate3d(-110%,0,0) !important
      .goldanddamms
        transition:all 0.5s
        overflow:hidden
        width:100%
        .damms_list_active
          transform:translate3d(0,0,0) !important
        .damm_list
          position:absolute
          display:flex
          justify-content:space-between
          flex-wrap:wrap
          margin:auto 0.3rem
          margin-top:0.46rem
          transform:translateY(0)
          transform:translate3d(-110%,0,0)
          transition:all 0.5s
          .damm_item
            margin-bottom:0.12rem
            border-radius:0.1rem
            width:2.22rem
            height:2.4rem
            background: radial-gradient(at 62px 40px,#0fafc5, #01696b)
            box-shadow: 0px 2px 0px #02373c
            span
              display:block
            .dmms_icon
              margin-top:0.2rem
              width:1.18rem
              height:0.98rem
              bg-image('./img/damms')
              background-size:cover
              margin-left:0.62rem
            .damms_text
              font-size:0.3rem
              text-align:center
              margin-bottom:0.23rem
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
        .gold_list_active
          transform:translateX(0) !important
        .gold_list
          // position:absolute
          display:flex
          // justify-content:space-between
          flex-wrap:wrap
          margin:auto 0.3rem
          margin-top:0.46rem
          transform:translateX(110%)
          transition:all 0.5s
          .damm_item
            margin-bottom:0.12rem
            margin-left: 0.08rem
            border-radius:0.1rem
            width:2.22rem
            height:2.4rem
            background-size:cover
            bg-image('./img/glods')
            span
              display:block
            .damms_text
              font-size:0.3rem
              text-align:center
              margin-bottom:0.1rem
              color:#663300
              margin-top:1.35rem
            .pay_btn
              font-size:0.3rem
              width:1.89rem
              height:0.5rem
              text-align:center
              line-height:0.5rem
              margin:auto 0.15rem
              background:#cc6600
              box-shadow: 1px 2px 1px #b7832e
              border-radius:0.1rem
              color:#fff
</style>

