<template>
<!-- 充值页面 -->
  <div class="top_up">
    <div class="title">
      <p class="left">充值手机号</p>
      <p class="right">2小时内到账</p>
    </div>
    <div class="phone_number">
      <div class="input_container">
        <input type="text" placeholder="请输入手机号码" v-model="phone">
        <p class="full">
          <span class="full_in"></span>
        </p>
      </div>
      <p class="total">默认手机号（联通）</p>
    </div>
    <div class="prize_msg">
      <p class="prize_title">中奖奖品</p>
    </div>
    <div class="prize_message">
      <div class="prize_img">
        <img src="http://m.dev.pearlba.com/pic/czk2x.png" alt="">
      </div>
      <div class="prize_names">
        <p class="name_product">100元话费卡  支持中国移动、中国联通、   中国电信手机号充值</p>
        <p class="scorce">
          <span>66直充</span>
        </p>
      </div>
    </div>
    <div class="submit" @click="_sendGoods">
      <p class="submit_btn">确认提交</p>
    </div>
  </div>
</template>

<script>
  import { sendGoods } from 'api/prize'
  export default {
    data () {
      return {
        phone: '',
        key: '',
        recordId: 0
      }
    },
    created () {
      this.key = this.$route.query.key
      this.recordId = this.$route.query.recordId
    },
    methods: {
      _sendGoods () {
        let argument = {
          userInfo: JSON.stringify({
            phone: this.phone
          }),
          recordId: this.recordId,
          goodsKey: this.key
        }
        sendGoods(argument).then(res => {
          if (res.data.errCode === this.$ERR_CODE && res.data.retCode === this.$RET_CODE) {
            this.$router.push('/prizeorderdetail')
          }
        })
        this.$router.push('/prizeorderdetail')
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../../common/stylus/index.styl'
  ::-webkit-input-placeholder { /* WebKit browsers */
    color:    #ccc;
    // font-size:0.3rem;
  }
  :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
      color:    #ccc;
      // font-size:0.3rem;
  }
  ::-moz-placeholder { /* Mozilla Firefox 19+ */
      color:    #ccc;
      // font-size:0.3rem;
  }
  :-ms-input-placeholder { /* Internet Explorer 10+ */
      color:    #ccc;
      // font-size:0.3rem;
  }
  .top_up
    min-height:100vh
    background:#f3f3f3
    .title
      height:1rem
      display:flex
      justify-content:space-between
      align-items:center
      margin:auto 0.3rem
      .left
        font-size:0.36rem
      .right
        font-size:0.2rem
    .phone_number
      background:#fff
      font-size:0
      height:1.6rem
      .input_container
        width:6.9rem
        margin: auto 0.3rem
        display:flex
        align-items:center
        justify-content:space-between
        // height:0.61rem
        padding-top:0.3rem
        color:#333
        input
          width:6.1rem
          font-size:0.48rem
        .full
          .full_in
            display:inline-block
            width:0.46rem
            height:0.44rem
            background-size:cover
            bg-image('img/full_in')
      .total
        color:#cccccc
        font-size:0.24rem
        margin:auto 0.3rem
        padding-bottom:0.1rem
        margin-top:0.2rem
    .prize_msg
      height:0.6rem
      background:#fff
      margin-top:0.3rem
      .prize_title
        margin:auto 0.3rem
        font-size:0.24rem
        line-height:0.6rem
    .prize_message
      margin:auto 0.3rem
      margin-top:0.2rem
      display:flex
      align-items:flex-end
      // justify-content:space-between
      .prize_img
        width:1.54rem
        height:1.5rem
        background:#fff
        display:flex
        justify-content:center
        align-items:center
        img
          width:1.16rem
          height:0.66rem
      .prize_names
        width:4.26rem
        margin-left:0.2rem
        .name_product
          font-size:0.24rem
          margin-bottom:0.4rem
        .scorce
          font-size:0.18rem
          span
            display:inline-block
            height:0.38rem
            padding:0 0.1rem 0 0.1rem
            line-height:0.38rem
            background:#99cccc
            color:#fff
    .submit
      position:fixed
      bottom:0
      left:0
      width:100%
      height:1rem
      background:#339999
      font-size:0.3rem
      color:#fff
      text-align:center
      line-height:1rem
</style>

