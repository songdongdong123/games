<template>
  <div class="filtrate">
  <div class="submit">
    <p>游戏商城</p>
    <span class="payList"></span>
  </div> 
  <div class="navbar" ref="classify">
     <ul ref="classify_list">
        <li
          :class="{'menu_item_active': index === currentIndex}" 
          class="menu_item" 
          ref="menu_item" 
          v-for="(list, index) of tabArr" 
          @click="select(index, $event)">{{list}}</li>
      </ul>
   </div>
   <div class="shop_container">
     <Pciker></Pciker>
   </div>
   <popup :show-pop-pup="showPopPup" @hidePopPup="hidePopPupModel"></popup>
  </div>
</template>

<script>
  import popup from '@/base/goods_popup/goods_popup'
  import BScroll from 'better-scroll'
  import { getGoodList } from 'api/goodlist'
  import { Indicator } from 'mint-ui'
  import Pciker from '@/base/picker/picker'
  const ERR_CODE = 0
  const RET_CODE = 0
  export default {
    data () {
      return {
        tabArr: ['全部', '优惠', '魔法道具', '荣耀', 'LOL', 'lod', 'hhhh', 'asd'],
        currentIndex: 0,
        showPopPup: false,
        goodList: []
      }
    },
    created () {
      this.$nextTick(() => {
        this._initScroll()
      })
      // this._getGoodList()
    },
    methods: {
      _initScroll () {
        // 初始化顶部导航滚动
        let picWidth = 113
        let margin = 29
        let width = (picWidth + margin) * this.tabArr.length - margin
        this.$refs.classify_list.style.width = width / 100 + 'rem'
        this.meunScroll = new BScroll(this.$refs.classify, {
          scrollX: true,
          eventPassthrough: 'vertical'
        })
      },
      select (index, event) {
        this.currentIndex = index
        this._followScroll(index, event)
      },
      _followScroll (index, event) {
        let menuList = this.$refs.menu_item
        let el = menuList[index]
        // scrollToElement有四个参数，第一个参数代表目标元素，第二个参数代表动画执行时间，第三个参数代表x轴偏移量，第四个参数代表y轴偏移量
        this.meunScroll.scrollToElement(el, 300, true, 0)
      },
      _getGoodList () {
        // 获取商品列表
        Indicator.open()
        getGoodList().then(res => {
          if (res.data.errCode === ERR_CODE && res.data.retCode === RET_CODE) {
            Indicator.close()
            this.goodList = res.data.data
          }
        })
      },
      chooseThis (index) {
        // tab切换
        this.currentIndex = index
      },
      showPopPupModel () {
        // 显示购买商品组件
        this.showPopPup = true
      },
      hidePopPupModel () {
        // 隐藏商品购买组件
        this.showPopPup = false
      }
    },
    components: {
      popup,
      Pciker
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../../common/stylus/index.styl'
  .filtrate
    font-size:0.3rem
    color:#fff
    min-height:100%
    width:100%
    position:absolute
    background:#012424
    .submit
      display:flex
      justify-content:center
      align-items:center
      padding-left:0.3rem
      padding-right:0.3rem
      height:0.85rem
      background:#339999
      position: relative
      p
        width:1.6rem
        height:0.6rem
        text-align:center
        color:#fff
        line-height:0.6rem
      span
        display:inline-block
        background-size:cover
        position:absolute
        // margin-left:2rem
      .payList
        width:0.36rem
        height:0.37rem
        bg-image('img/paylist')
        right:0.3rem
        top:0.22rem
    .navbar
      margin-top:0.4rem
      padding:0 0.32rem 0 0.32rem
      overflow: hidden
      white-space: nowrap
      font-size:0
      ul
        .menu_item
          width:1.2rem
          text-align:center
          display:inline-block
          font-size:0.2rem
          margin-left:0.1rem
          padding-bottom:0.2rem
          color:#ffffff
        .menu_item_active
          border-bottom:3px solid #339999
          color:#339999
    .shop_container
      .damm_list
        position:absolute
        display:flex
        justify-content:flex-start
        flex-wrap:wrap
        margin:auto 0.3rem
        margin-top:0.46rem
        transform:translateY(0)
        transform:translate3d(0,0,0)
        transition:all 0.5s
        .damm_item
          margin-right:0.115rem
          margin-bottom:0.12rem
          border-radius:0.1rem
          width:2.22rem
          height:2.4rem
          background: radial-gradient(at 62px 40px,#0fafc5, #01696b)
          box-shadow: 0px 2px 0px #02373c
          .tips
            margin:auto 0.15rem
            margin-top:0.3rem
            width:1.94rem
            height:0.82rem
            background:#3c9fe3
            position:relative
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
              width:0.15rem
              color:#fff
              font-size:0.2rem
              word-break:break-all
          span
            display:block
          .damms_text
            font-size:0.2rem
            text-align:center
            margin-top:0.15rem
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
        .damm_item:nth-child(3n)
          margin-right:0  
</style>

