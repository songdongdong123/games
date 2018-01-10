<template>
  <div class="product_detail">
    <div class="mask" @click="closevolume" v-show="volumeState"></div>
    <div class="product_imgs">
      <mt-swipe  class="mt-swipe"
        :auto="0"
        :defaultIndex="defaultIndex"
        @change="handleChange">
        <mt-swipe-item class="mt-swipe-item" 
          :class="{'is-active': index === 0}" 
          v-for="(list, index) in adPic" :key="Math.random()">
          <img :src="list" alt="">
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <div class="product_msg">
      <div class="top_msg">
        <p class="product_name">{{product_name}}</p>
        <p class="product_price">
          <span class="gold_icon"></span>
          <span class="gold_num">{{priceNum}}</span>
        </p>
        <p class="product_other">
          <span class="old_price">市场价：{{simpleDesc.marketPrice}}</span>
          <span class="logistics">{{simpleDesc.post}}</span>
          <span class="source">{{simpleDesc.source}}</span>
        </p>
      </div>
      <p class="product_introduce_title">奖品介绍</p>
      <div class="product_introduce_container">
        <ul class="list_introduce">
          <li class="introduce_item" v-for="list in goodsDesc.content">
            {{list}}
          </li>
        </ul>
      </div>
      <p class="product_introduce_title">抽奖规则</p>
      <div class="product_introduce_container">
        <ul class="list_introduce">
          <li class="introduce_item" v-for="list in ruleDesc.content">
            {{list}}
          </li>
        </ul>
      </div>
      <p class="product_introduce_title">联系客服</p>
      <div class="product_introduce_container">
        <p class="customService">{{customService.content}}</p>
      </div>
    </div>
    <submitalert  
      :prokey="productKey" 
      :price="priceNum"
      :ptype="protype"
      v-show="volumeState"></submitalert>
    <div class="pay_btn" @click="Volume">
      <p class="submit_btn">立即抽奖</p>
    </div>
  </div>
</template>

<script>
  import { getGoodDetail } from 'api/goodlist'
  import { Indicator } from 'mint-ui'
  import submitalert from '@/base/productalert/submitalert'
  import { mapGetters, mapMutations } from 'vuex'
  export default {
    data () {
      return {
        goodsDesc: [],
        ruleDesc: [],
        customService: {},
        product_name: '',
        adPic: [],
        simpleDesc: {},
        defaultIndex: 0,
        autoTime: 3000,
        priceNum: 0,
        productKey: '',
        protype: 0
      }
    },
    created () {
      this.productKey = this.$route.query.key
      this._getGoodDetail(this.productKey)
    },
    computed: {
      ...mapGetters([
        'volumeState'
      ])
    },
    methods: {
      handleChange (index) {
        this.defaultIndex = index
      },
      _getGoodDetail (key) {
        // 获取商品详情
        Indicator.open()
        getGoodDetail({
          key: key
        }).then(res => {
          if (res.data.errCode === this.$ERR_CODE && res.data.retCode === this.$RET_CODE) {
            [
              this.goodsDesc,
              this.ruleDesc,
              this.customService,
              this.product_name,
              this.adPic,
              this.simpleDesc,
              this.priceNum,
              this.protype
            ] = [
              res.data.data.extInfo.goodsDesc,
              res.data.data.extInfo.ruleDesc,
              res.data.data.extInfo.customService,
              res.data.data.name,
              res.data.data.showInfo.adPic,
              res.data.data.showInfo.simpleDesc,
              res.data.data.goldNowPrice,
              res.data.data.Type
            ]
            Indicator.close()
          }
        })
      },
      Volume () {
        this.showVolueMode(true)
      },
      closevolume () {
        // 关闭抽奖弹窗
        this.showVolueMode(false)
      },
      ...mapMutations({
        showVolueMode: 'SET_VOLUME_STATE'
      })
    },
    components: {
      submitalert
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../../common/stylus/index.styl'
  .product_detail
    .mask
      position:fixed
      width:100%
      height:100%
      background:rgba(0,0,0,.5)
      z-index:20
    .product_imgs
      height:7.16rem
      // background:pink
      .mt-swipe
        .mt-swipe-item
          img
            width:100%
            height:100%
    .product_msg
      padding-bottom:1.2rem
      .top_msg
        margin:auto 0.3rem
        .product_name
          padding-top:0.2rem
          font-size:0.3rem
          font-weight:bold
          color:#333333
        .product_price
          padding-top:0.2rem
          font-size:0.36rem
          color:#ff6600
          display:flex
          align-items:center
          .gold_icon
            display:inline-block
            height:0.33rem
            width:0.33rem
            background-size: cover
            bg-image('img/gold')
            margin-right:0.1rem
        .product_other
          padding-top:0.3rem
          font-size:0.2rem
          display:flex
          justify-content:space-between
          color:#b8b8b8
      .product_introduce_title
        margin-top:0.2rem
        height:0.6rem
        background:#f3f3f3
        font-size:0.24rem
        color:#999999
        line-height:0.6rem
        padding-left:0.3rem
      .product_introduce_container
        font-size:0.2rem
        color:#333
        .list_introduce
          margin:auto 0.3rem
          margin-top:0.2rem
          .introduce_item
            line-height:0.34rem
            margin-bottom:0.1rem
        .customService
          margin:auto 0.3rem
          height:0.6rem
          line-height:0.6rem
    .pay_btn
      .submit_btn
        position:fixed
        bottom:0
        left:0
        background:rgba(51,153,153,.8)
        height:1rem
        width:100%
        text-align:center
        color:#fff
        font-size:0.3rem
        line-height:1rem
</style>

