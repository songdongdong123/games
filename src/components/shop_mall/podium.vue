<template>
  <div class="podium">
    <div class="title">
      <div class="title_container">
        <div class="left_gold">
          <div class="gold_nums base">
            <div class="gold_icon_num">
              <span class="gold_icon icon"></span>
              <span class="num_text">91277</span>
            </div>
            <span class="add_icon icon">+</span>
          </div>
          <div class="damms_nums base">
            <div class="gold_icon_num">
              <span class="damms_icon icon"></span>
              <span class="num_text">91277</span>
            </div>
            <span class="add_icon icon">+</span>
          </div>
        </div>
        <div class="pay_list" @click="tomyOrder">
          <span class="paylist_icon"></span>
        </div>
      </div>
    </div>
    <div class="product_container">
      <ul class="product_list">
        <li class="product_item"
          @click="toProductdetail(list.key)" 
          v-for="(list, index) in goodlist">
          <div class="product_img">
            <img ref="imgs"  :src="list.icon" alt="">
          </div>
            <div class="product_title">
              <div class="simple" :class="{'active': list.Type === 1}">
                <p>{{list.source}}</p>
              </div>
              <div class="conversion">
                <p>{{list.buyOut}}</p>
              </div>
            </div>
          <div class="product_msg">
            <p class="product_tags">{{list.name}}</p>
            <div class="product_price">
              <div class="left_price">
                <span class="gold_icon"></span>
                <span class="nums">{{list.goldNowPrice}}</span>
              </div>
              <div class="right_price">
                <p>{{list.buyCond}}</p>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import { getGoodList } from 'api/goodlist'
  import { Indicator } from 'mint-ui'
  export default {
    data () {
      return {
        goodlist: []
      }
    },
    created () {
      this._getGoodList()
    },
    methods: {
      _getGoodList () {
        Indicator.open()
        getGoodList({}).then(res => {
          if (res.data.errCode === this.$ERR_CODE && res.data.retCode === this.$RET_CODE) {
            this.goodlist = res.data.data
            Indicator.close()
          }
        })
      },
      toProductdetail (key) {
        // 进入商品详情页面
        this.$router.push({path: '/product_detail', query: {key: key}})
      },
      tomyOrder () {
        // 进入订单管理页面
        this.$router.push('/prizeorder')
      }
    }
  }
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/index.styl'
.podium
  background:#f3f3f3
  min-height:100vh
  .title
    top:0
    left:0
    width:100%
    background:#339999
    position:fixed
    z-index:10
    .title_container
      margin:auto 0.3rem
      display:flex
      height:0.82rem
      justify-content: space-between
      align-items: center
      font-size 0.3rem
      .pay_list
        width:1rem
        height:0.4rem
        position: relative
        .paylist_icon
          display:inline-block
          background-size: cover
          width:0.36rem
          height:0.37rem
          bg-image:('img/paylist')
          position: absolute
          right:0
      .left_gold
        display:flex
        .base
          width:2.2rem
          height:0.5rem
          background:#70b8b8
          border-radius:0.25rem
          display:flex
          align-items:center
          justify-content space-between
          position: relative
          .gold_icon_num
            display:flex
            align-items:center
          .icon
            display:inline-block
            background-size: cover
          .gold_icon
            width:0.33rem
            height:0.33rem
            bg-image('img/gold')
            margin-left:0.05rem
          .add_icon
            width:0.42rem
            height:0.42rem
            background:#fff
            font-size:0.4rem
            font-weight: bold
            color:#afd6d6
            right:0.05rem
            text-align:center
            border-radius:100%
            margin-right:0.05rem
          .damms_icon
            width:0.35rem
            height:0.30rem
            bg-image('img/dimms')
            margin-left:0.05rem
          .num_text
            margin-left:0.1rem
            color:#e1eeee
        .damms_nums
          margin-left:0.3rem
  .product_container
    display:flex
    justify-content:space-between
    margin:auto 0.3rem
    padding-top:1rem
    padding-bottom:1.07rem
    .product_list
      display:flex
      flex-wrap:wrap
      justify-content:space-between
      width: 100%
      .product_item
        margin-bottom:0.2rem
        width:3.3rem
        // height:4.27rem
        border:1px solid #cccccc
        .product_img
          height:3.3rem
          background:#ffffff
          display:flex
          justify-content:center
          align-items:center
          position:relative
          img
            max-width:2.8rem
            max-height:2.5rem
        .product_title
          height:0.4rem
          width:100%
          display:flex
          justify-content:space-between
          line-height:0.4rem
          background:#fff
          .simple
            background:#f29b76
            font-size:0.18rem
            padding:0 0.15rem 0 0.15rem
            color:#fff
          .active
            background:#99cccc
          .conversion
            font-size:0.18rem
            padding-right:0.1rem
            color:#b2b2b2
        .product_msg
          height:1rem
          .product_tags
            font-size:0.2rem
            margin-top:0.12rem
            color:#333333
            padding-left:0.05rem
          .product_price
            display:flex
            justify-content:space-between
            margin-top:0.2rem
            align-items:center
            .left_price
              display:flex
              align-items:center
              font-size:0.24rem
              color:#ff6600
              .gold_icon
                background-size:cover
                display:inline-block
                width:0.33rem
                height:0.33rem
                bg-image('img/gold')
                margin-left:0.05rem
            .right_price
              font-size:0.18rem
              padding-right:0.1rem
              color:#333333
</style>

