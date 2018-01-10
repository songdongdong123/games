<template>
  <div class="footbail_detail">
    <transition name="slide">
      <div class="mask" v-show="showMsk"></div>
    </transition>
    <div class="header">
      <div class="ourter">
        <div class="innter"></div>
      </div>
    </div>
    <div class="header_container">
      <div class="container_box">
        <span class="chan_icon" @click="showFiltrate"></span>
        <input type="text" placeholder="俄罗斯世界杯 | 英雄联盟">
        <span class="screen_icon" @click="toSingleBet"></span>
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
      <div>
        <ul>
          <li v-for="(list, index) of goods" class="menu-item" 
          @click="_selectMenu(index, $event, currentIndex)"
          :class="{'current': currentIndex === index}" ref="menuList">
            {{list.id}}
          </li>
        </ul>
      </div>
      </Scroll>
      <Scroll :listen-scroll="listenScroll" :data="goods" @scroll="scrollFood" class="foods-wrapper" ref="foodsWrapper">
        <div>
          <p class="today_bet_count">今天37场可投</p>
          <ul>
            <li v-for="(list,index) of goods" class="food-list" ref="foodList">
              <ul>
                <li v-for="foods in list.data" class="food-item border-1px">
                  <div class="base">
                    <div class="container" v-for="item in foods.testArr" :class="{'activeClass': item.classState}" @click="selectGame(item, foods)">
                      <p class="team_name">{{item.name}}</p>
                      <p class="score">{{item.title}}{{item.odds}}</p>
                    </div>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </Scroll>
    </div>
    <div class="footer">
      <p class="empty" @click="emptyGame">清空</p>
      <p class="active_choose">已选{{selectGames.length}}场比赛</p>
      <p class="confirm" @click="showMskModel" :class="{'confirm_avtive':comfirmState}">确定</p>
    </div>
    <div class="betCart">
      <betCart :show-msk="showMsk" :mach-list="selectGames" @hidebetcart="hidebetcartModel"></betCart>
    </div>
  </div>
</template>

<script>
  import Scroll from '../../base/scroll/scroll'
  import betCart from '@/base/bet_cart/bet_cart'
  import { getMatchList } from '../../api/matchlist'
  import formatTime from '../../common/js/formatTime'
  import { emptyArr } from '*/common'
  // import { Indicator } from 'mint-ui'
  const ERR_CODE = 0
  const RET_CODE = 0
  export default {
    data () {
      return {
        showMsk: false,
        goods: [],
        listHeight: [],
        scrollY: 0,
        listenScroll: true,
        pos: {},
        selectGames: []
      }
    },
    computed: {
      comfirmState () {
        if (this.selectGames.length >= 2) {
          return true
        } else {
          return false
        }
      },
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
      showMskModel () {
        if (this.selectGames.length >= 2) {
          this.showMsk = true
        } else {
          this.$toast('请至少选择两场比赛')
        }
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
              if (!list.odds.SPF) {
                list.testArr = [{
                  name: list.homeTeam,
                  title: '主胜',
                  odds: 0,
                  classState: false
                }, {
                  name: 'VS',
                  title: '平',
                  odds: 0,
                  classState: false
                }, {
                  name: list.guestTeam,
                  title: '客胜',
                  odds: 0,
                  classState: false
                }]
              } else {
                list.testArr = [{
                  name: list.homeTeam,
                  title: '主胜',
                  odds: list.odds.SPF.fixedOdds.split(',')[0],
                  classState: false
                }, {
                  name: 'VS',
                  title: '平',
                  odds: list.odds.SPF.fixedOdds.split(',')[1],
                  classState: false
                }, {
                  name: list.guestTeam,
                  title: '客胜',
                  odds: list.odds.SPF.fixedOdds.split(',')[2],
                  classState: false
                }]
              }
              list.falg = false
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
      toSingleBet () {
        // 前往单关竞赛赛事列表
        this.$router.push('/football_detail')
      },
      selectGame (item, game) {
        // 最多选择六场比赛
        let x = this.selectGames.find((value, index, arr) => {
          return value.matchNo === game.matchNo
        })
        if (this.selectGames.length < 6) {
          item.classState = !item.classState
          if (!x) {
            this.selectGames.push(game)
          }
        } else {
          if (x) {
            item.classState = !item.classState
          } else {
            this.$toast('最多选择6场')
          }
        }
        this.filtrationGames(this.selectGames)
      },
      filtrationGames (selectGames) {
        // 防止选中又取消，重新过滤数组
        for (let i = 0; i < selectGames.length; i++) {
          let count = 0
          for (let item of selectGames[i].testArr) {
            if (!item.classState) {
              count++
            }
          }
          if (count === 3) {
            selectGames.splice(i, 1)
          }
        }
      },
      emptyGame () {
        // 清空已选择的比赛
        emptyArr(this.selectGames)
      },
      hidebetcartModel () {
        // 收起竞猜选择框
        this.showMsk = false
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
      _selectMenu (index, event, currentIndex) {
        // 选中分类foodlist跟随滚动
        this.ind = index
        // console.log(0)
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
      Scroll,
      betCart
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../../common/stylus/mixin.styl'
  .slide-enter-active,.slide-leave-active
    transition: all .5s
  .slide-enter
    opacity: 1
  .slide-leave-to
    opacity: 0
  .mask
    position:fixed
    width:100%
    height:100%
    background:rgba(0,0,0,.5)
    z-index:1001
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
        background-size:cover
      .chan_icon
        width:0.46rem
        height:0.46rem
        bg-image('img/screen')
      .screen_icon
        bg-image('img/dan')
  .hot_bet
    display:flex
    position:absolute
    z-index:100
    top:1.8rem
    .hot_icon
      position: absolute
      left: 0.75rem
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
      flex:0 0 1.6rem
      width:2.4rem
      // overflow-x:hidden
      background:#f3f3f3
      .menu-item
        display:table
        height:1.14rem
        white-space: nowrap
        width:100%
        overflow-x:hidden
        word-wrap:normal 
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
      // background:#ccc
      .today_bet_count
        font-size:0.24rem
        height:0.6rem
        background:#f3f3f3
        margin-left:0.21rem
        line-height:0.6rem
        padding-left:0.2rem
        color:#c4c4c4
      .food-item
        display:flex
        height:1.8rem
        margin-left:0.21rem
        // margin-bottom:0.18rem
        border-bottom: 0.12rem solid rgba(7,17,27,0.1)
        font-size:0
        background:#fff
        &:last-child
          margin-bottom:0
        .base
          flex:1
          display:flex
          align-items:center
          justify-content:space-between
          font-size:0
          height:100%
          .container
            flex:1
            text-align:center
            height:100%
            .team_name
              // text-align center
              width:1.8rem
              overflow: hidden
              text-overflow:ellipsis
              white-space: nowrap
              padding-top:0.5rem
              font-size:0.3rem
              margin-bottom:0.5rem
            .score
              // text-align center
              font-size:0.18rem
              color:#d0d0d0
          .activeClass
            background:#339999
            color:#fff
          .container:nth-child(2)
            border-left:1px solid #FFF
            border-right:1px solid #fff
        .bottom_line
          height: 0.12rem
          background:pink
  .footer
    position:absolute
    width:100%
    bottom:0
    display:flex
    height:1.05rem
    p
      flex:1
      height:100%
      line-height:1.05rem
    .empty
      font-size:0.24rem
      padding-left:0.3rem
      color:#666666
    .active_choose
      font-size:0.24rem
      text-align:center
      color:#333333
    .confirm
      font-size:0.3rem
      text-align:center
      background:#ccc
    .confirm_avtive
      color:#fff
      background:#339999
  .betCart
    position:absolute
    z-index:1002
    width:100%
    bottom:0
    // background:pink
</style>