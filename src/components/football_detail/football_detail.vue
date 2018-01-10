<template>
  <div class="footbail_detail">
    <div class="header">
      <div class="ourter">
        <div class="innter"></div>
      </div>
    </div>
    <div class="header_container">
      <div class="container_box">
        <span class="chan_icon" @click="showFiltrate"></span>
        <input type="text" placeholder="俄罗斯世界杯 | 英雄联盟">
        <span class="screen_icon" @click="toDoubleFoot"></span>
      </div>
    </div>
    <div class="hot_bet">
      <div class="hot_icon">
        <span></span>
      </div>
      <div class="left">
        <p class="left_title">欧洲冠军杯</p>
        <p class="left_hot">投注热点：皇马出线希望渺茫，小组生死一战</p>
      </div>
      <div class="right">
        <p>小组赛第4轮</p>
      </div>
    </div>
    <div class="goods">
    <Scroll :data="goods" class="menus-wrapper" ref="menuScroll">
      <div  ref="menuWrapper">
        <ul>
          <li v-for="(list, index) of goods" class="menu-item" 
          @click="_selectMenu(index, $event)"
          :class="{'current': currentIndex === index}" ref="menuList">
            {{list.id}}
          </li>
        </ul>
      </div>
      </Scroll>
      <Scroll :listen-scroll="listenScroll" :data="goods" @scroll="scrollFood" class="foods-wrapper" ref="foodsWrapper">
        <div>
          <ul>
            <li v-for="(list,index) of goods" class="food-list" ref="foodList">
              <ul>
                <h1 class="class_title">{{list.id}}</h1>
                <li v-for="foods in list.data" class="food-item border-1px" @click="toGuess(foods.matchNo, foods.homeTeam, foods.guestTeam, foods.odds.SPF.fixedOdds)">
                  <div class="title">
                    <p class="game_time">{{foods.matchTime}}</p>
                    <p class="res_icon"></p>
                  </div>
                  <div class="center">
                    <p class="home_court">{{foods.homeTeam}}</p>
                    <p class="vs">VS</p>
                    <p class="visiting_field">{{foods.guestTeam}}</p>
                  </div>
                  <div class="take_inNum">
                    1323434参与竞猜
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </Scroll>
    </div>
  </div>
</template>

<script>
  import Scroll from '../../base/scroll/scroll'
  // import md5 from 'js-md5'
  import { getMatchList } from '../../api/matchlist'
  import formatTime from '../../common/js/formatTime'
  // import { Indicator } from 'mint-ui'
  const ERR_CODE = 0
  const RET_CODE = 0
  export default {
    data () {
      return {
        goods: [],
        listHeight: [],
        scrollY: 0,
        ind: '',
        listenScroll: true,
        pos: {}
      }
    },
    computed: {
      currentIndex () {
        // 计算当前menu的index
        for (let i = 0; i < this.listHeight.length; i++) {
          let heightT = this.listHeight[i]
          let heightB = this.listHeight[i + 1]
          if (!heightB || (this.scrollY >= heightT && this.scrollY < heightB)) {
            this._followScroll(i)
            return i
          }
        }
        return 0
      }
    },
    created () {
      this._getDoods()
    },
    methods: {
      toDoubleFoot () {
        // 进入串关竞猜
        this.$router.push('/doublefootball_detail')
      },
      _getMatchList () {
        // 打开loading
        // Indicator.open()
        // 获取赛事列表
        getMatchList({
          lotyId: 'JCZQ',
          playId: 'JCDG'
        }).then(res => {
          if (res.data.errCode === ERR_CODE && res.data.retCode === RET_CODE) {
            // 关闭loading
            // Indicator.close()
            let matchList = res.data.data.list
            for (let list of matchList) {
              list.id = list.leagueName
              list.matchTime = formatTime(list.matchTime)
            }
            this.goods = this.forMatData(matchList)
            this.$nextTick(() => {
              this._calculateHeight()
            })
          }
        })
      },
      forMatData (matchList) {
        // 处理赛事列表数据
        let arr = matchList
        let map = {}
        let dest = []
        for (let i = 0; i < arr.length; i++) {
          let ai = arr[i]
          if (!map[ai.id]) {
            dest.push({
              id: ai.id,
              data: [ai]
            })
            map[ai.id] = ai
          } else {
            for (let j = 0; j < dest.length; j++) {
              let dj = dest[j]
              if (dj.id === ai.id) {
                dj.data.push(ai)
                break
              }
            }
          }
        }
        return dest
      },
      showFiltrate () {
        // 显示筛选窗口
        // this.showfiltrate = true
        this.$router.push('/filtrate')
      },
      toGuess (matchNo, homeTeam, guestTeam, fixedOdds) {
        // 进入竞猜
        this.$router.push({
          path: '/guess',
          query: {matchNo: matchNo,
            homeTeam: encodeURI(homeTeam),
            guestTeam: encodeURI(guestTeam),
            fixedOdds: fixedOdds}})
      },
      scrollFood (pos) {
        this.pos = pos
        this.scrollYs()
      },
      _getDoods () {
        // 获取商品
        this._getMatchList()
        // this.$nextTick(() => {
        //   this._calculateHeight()
        // })
      },
      scrollYs () {
        if (this.pos.y <= 0) {
          this.scrollY = Math.abs(Math.round(this.pos.y))
        }
      },
      _selectMenu (index, event) {
        this.ind = index
        // 选中分类foodlist跟随滚动
        if (!event._constructed) {
          return
        }
        let foodList = this.$refs.foodList
        let el = foodList[index]
        this.$refs.foodsWrapper.scrollToElement(el, 300)
      },
      _calculateHeight () {
        // 获取foodlist里面每个元素的累加高度
        let foodList = this.$refs.foodList
        let height = 0
        this.listHeight.push(height)
        for (let list of foodList) {
          height += (list.clientHeight)
          this.listHeight.push(height)
        }
      },
      _followScroll (index) {
        let menuList = this.$refs.menuList
        let el = menuList[index]
        // scrollToElement有四个参数，第一个参数代表目标元素，第二个参数代表动画执行时间，第三个参数代表x轴偏移量，第四个参数代表y轴偏移量
        this.$refs.menuScroll.scrollToElement(el, 300, 0, -100)
      }
    },
    components: {
      Scroll
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../../common/stylus/mixin.styl'
  .header
    overflow-x:hidden
    position: absolute
    width:100%
    height:2.67rem
    border-1px(rgba(7,17,27,0.1))
    .ourter
      overflow-x:hidden
      .innter
        position:absolute
        width:200%
        height:7.5rem
        background:#339999
        border-radius:50%
        left:-3.75rem
        top:-6rem
  .header_container
    position:absolute
    z-index:1000
    top:0.3rem
    width:100%
    .container_box
      // width:100%
      display:flex
      justify-content:space-between
      margin:auto 0.3rem
      input
        width:3.8rem
        height:0.64rem
        border-radius:1rem
        padding-left:0.27rem
        font-size:0.2rem
        // color:red !important
      span
        display:inline-block
        width:0.5rem
        height:0.5rem
        // border:1px solid pink
        background-size:cover
      .chan_icon
        width:0.46rem
        height:0.46rem
        bg-image('img/screen')
      .screen_icon
        bg-image('img/chuan')
  .hot_bet
    display:flex
    position:absolute
    z-index:100
    top:1.8rem
    .hot_icon
      position: absolute
      left: 0.98rem
      top:-0.32rem
      span
        display:inline-block
        width:0.5rem
        height:0.69rem
        background-size:cover
        bg-image('img/hot')
    .left
      margin-left:2.4rem
      .left_title
        font-size:0.27rem
        color:#339999
      .left_hot
        color:#ff6633
        font-size:0.18rem
        margin-top:0.1rem
    .right
      font-size:0.22rem
  .goods
    display:flex
    position:absolute
    overflow:hidden
    top:2.67rem
    bottom:1.05rem
    width:100%
    .menus-wrapper
      flex:0 0 2.4rem
      width:2.4rem
      background:#f3f3f3
      .menu-item
        display:table
        height:1.14rem
        width:100%
        font-size:0.2rem
        line-height:1.14rem
        text-align:center
        border-1px(rgba(7,17,27,0.1))        
        // padding:0 12px
        &.current
          position: relative
          z-index: 10
          margin-top: -0.01rem
          background: #fff
          // font-weight: 700
          .text
            color:#f01414
            border-none()
    .foods-wrapper
      flex:1
      .class_title
        font-size:0.3rem
        margin-left:0.2rem
        background:#f3f3f3
        padding:0.1rem 0 0.1rem 0.3rem
      .food-item
        // display:flex
        height:1.8rem
        margin:0rem 0 0 0.21rem
        padding-bottom:0.18rem
        border-1px(rgba(7,17,27,0.1))
        &:last-child
          // border-none()
          margin-bottom:0
        .title
          display:flex
          justify-content:space-between
          align-items:center
          padding-right:0.3rem
          padding-top:0.3rem
          .game_time
            padding:0.08rem
            height:0.3rem
            line-height:0.3rem
            font-size:0.17rem
            color:#fff
            background:linear-gradient(-45deg, #29a7a7, #1b9090)
            border-radius:0.05rem
          .res_icon
            display:inline-block
            width:0.36rem
            height:0.35rem
            bg-image('img/star')
            background-size:cover
        .center
          display:flex
          justify-content:space-between
          font-size:0.3rem
          margin:0.3rem 0.88rem 0 0.63rem
          .vs
            color:#cfcfcf
            font-size:0.19rem
          .home_court
            width:1.2rem
            overflow: hidden
            text-overflow:ellipsis
            white-space: nowrap
          .visiting_field
            width:1.2rem
            overflow: hidden
            text-overflow:ellipsis
            white-space: nowrap
        .take_inNum
          float:right
          color:#a8a8a8
          margin-right:0.3rem
          margin-top:0.33rem
          font-size:0.2rem
</style>