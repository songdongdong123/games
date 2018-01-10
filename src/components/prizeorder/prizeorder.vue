<template>
  <div class="prizeorder">
    <div class="prize_title">
      <div class="title_container">
        <p
          :class="{'active': index === ind}" 
          v-for="(list, index) in titleArr">{{list}}</p>
      </div>
    </div>
    <div class="order_container">
      <ul
        v-infinite-scroll="_InfiniteScroll"
        :infinite-scroll-distance="20" 
        class="order_list">
        <li class="order_item"
          @click="toOrderDetail"
          v-for="(list, index) in titleArr">
          <div class="order_detail">
            <div class="left">
              <img src="http://m.dev.pearlba.com/pic/SJ2x.png" alt="">
            </div>
            <div class="center">
              <p class="prize_name">100元话费卡 支持移动、联通、电信</p>
              <span class="prize_source">66直充</span>
            </div>
            <div class="right" @click.stop="toGetprize">
              <p class="prize_state">现在领取</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import { getGoodsList } from 'api/prize'
  export default {
    data () {
      return {
        titleArr: ['全部', '派单中', '已派发'],
        ind: 0
      }
    },
    created () {
      this._getGoodsList()
    },
    methods: {
      toOrderDetail () {
        this.$router.push('/orderdetail')
      },
      toGetprize () {
        console.log('领奖')
      },
      _getGoodsList () {
        getGoodsList({}).then(res => {
          if (res.data.errCode === this.$ERR_CODE && res.data.retCode === this.$RET_CODE) {
            console.log(res.data)
          }
        })
      },
      _InfiniteScroll () {
        console.log(0)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../../common/stylus/index.styl'
  .prizeorder
    min-height:100vh
    background:#f3f3f3
    .prize_title
      background:#fff
      .title_container
        height:1rem
        display:flex
        align-items:center
        font-size:0.3rem
        p
          width:2.5rem
          height:0.6rem
          line-height:0.6rem
          text-align:center
        .active
          color:#339999
    .order_container
      .order_list
        .order_item
          background:#fff
          margin-top:0.1rem
          .order_detail
            height:1.9rem
            margin:auto 0.3rem
            display:flex
            align-items:center
            // position: relative
            .left
              height:1.5rem
              width:1.5rem
              display:flex
              justify-content:center
              align-items:center
              background:#f3f3f3
              img
                max-width:0.8rem
                max-height:0.96rem
            .center
              font-size:0.24rem
              margin-left:0.3rem
              .prize_name
                margin-bottom:0.1rem
                line-height:0.37rem
              .prize_source
                display:inline-block
                margin-top:0.2rem
                padding:0.1rem 0.2rem 0.1rem 0.2rem
                background:#f3f3f3
            .right
              position:relative
              font-size:0.18rem
              width:1.2rem
              height:1rem
              margin-top:0.8rem
              margin-left:0.5rem
              .prize_state
                position:absolute
                right:0
                bottom:0.3rem
</style>

