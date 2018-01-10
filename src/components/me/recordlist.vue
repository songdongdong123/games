<template>
  <div class="record">
    <div class="changeBtn">
      <p
        @click="chooseThis(index)"
        :class="{'active': currentIndex === index}" 
        v-for="(list, index) in planStateArr">
        <span>{{list}}</span>
      </p>
    </div>
    <div class="record_container">
      <ul class="record_list"
        v-infinite-scroll="_InfiniteScroll"
        :infinite-scroll-distance="20"
        v-if="betArr"
        v-for="(list, index) in betArr">
        <p class="time">{{list.subLeagueName}}</p>
        <li
          v-if="betArr" 
          class="record_item" v-for="(item, ind) in list.data">
          <div class="item_title">
            <div class="left">
              <p class="home_team">{{item.homeTeam}}</p>
              <p class="score">
                <span class="home_score">{{item.homeTeamScore}}</span>
                <span class="vs">VS</span>
                <span class="guest_score">{{item.guestTeamScore}}</span>
              </p>
              <p class="guest_team">{{item.guestTeam}}</p>
            </div>
            <div class="right">
              <p>{{item.matchState}}</p>
            </div>
          </div>
          <div class="item_center">
            <p class="content">{{item.playName}}</p>
            <p class="res">{{item.betContent[0]}} <span class="res_odds">@{{item.betContent[1]}}</span></p>
            <p class="bet_time">{{item.betTime}}</p>
          </div>
          <div class="item_bottom">
            <div class="res_item">
              <p class="top">结果</p>
              <p
                :class="{'active1 active2':item.result === '中奖', 'active3': item.result === '未中奖'}" 
                class="bottom first">{{item.result === "中奖"? "已中奖": item.result}}</p>
            </div>
            <div class="res_item">
              <p class="top">投入金币</p>
              <p class="bottom">{{item.amount}}</p>
            </div>
            <div class="res_item">
              <p class="top">{{item.result === '中奖' || item.result === '未中奖' ? "返还":"预计返还"}}</p>
              <p class="bottom last" :class="{'active3': item.result === '未中奖'}">{{item.retAmount}}</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <!-- <p class="top" @click="topTop">top</p> -->
  </div>
</template>

<script>
  import { getAllMatchGuessRecord } from 'api/record'
  import { Indicator } from 'mint-ui'
  import Scroll from '../../base/scroll/scroll'
  import { scrollToTop } from '*/native.js'
  import { forMatGameList } from '*/common'
  export default {
    data () {
      return {
        currentIndex: 0,
        betArr: [],
        tempArr: [],
        year: '',
        month: '',
        day: '',
        weekDay: '',
        pageFalg: 0,
        listenScroll: true,
        totalCount: 0, // 记录总条数
        pageCount: 0, // 记录总页数
        page1: 0, // 分页
        planStateArr: ['全部', '未结算', '中奖']
      }
    },
    created () {
      this._getRecordList({})
    },
    methods: {
      chooseThis (index) {
        this.currentIndex = index
        this.tempArr = []
        this._getRecordList({})
        this.pageFalg = true
        this.page1 = 0
      },
      _InfiniteScroll () {
        // 无限滚动加载竞猜记录列表
        if (this.page1 < Math.ceil(this.pageCount / 10) - 1) {
          this.page1 = this.page1 + 1
          // console.log('进来了')
          this._getRecordList({page: this.page1, pageSize: 10})
        }
      },
      _getRecordList ({page = 0, pageSize = 10}) {
        // 获取竞猜记录列表
        Indicator.open()
        // console.log(0)
        this.loading = true
        getAllMatchGuessRecord({
          tabs: this.currentIndex,
          lotyId: 'JCZQ',
          page: page,
          pageSize: pageSize
        }).then(res => {
          if (res.data.errCode === this.$ERR_CODE && res.data.retCode === this.$RET_CODE) {
            this.loading = false
            Indicator.close()
            if (!res.data.data.data) {
              this.betArr = []
              this.$toast({
                message: '暂无记录',
                duration: 1000
              })
              return
            }
            if (res.data.data.data) {
              this.pageCount = res.data.data.totalNum
              this.tempArr = this.tempArr.concat(res.data.data.data)
              this.betArr = this.tempArr
              for (let list of this.betArr) {
                list.subLeagueName = this.$forMatTime(list.guessTime, 'y-m-d')
                list.betTime = this.$forMatTime(list.guessTime, 'h-m-s')
                list.betContent = list.guessContent.split('@')
                if (list.matchState === 0) {
                  list.matchState = '未开赛'
                } else if (list.matchState === 1) {
                  list.matchState = '比赛中'
                } else if (list.matchState === 2) {
                  list.matchState = '比赛结束'
                }
              }
              this.betArr = forMatGameList(this.betArr)
            }
          }
        })
      },
      _getDate () {
        // 获取今天时间
        let date = new Date()
        this.year = date.getFullYear()
        this.month = date.getMonth() + 1
        this.day = date.getDate()
      },
      torecod_detail (playId, planNo) {
        // 这里的index就是区分单关和串关的标识
        // 根据列表项的类型，跳转到不同的竞猜记录详情
        if (playId === 'JCDG') {
          this.$router.push({path: '/record_detailA', query: {planNum: planNo}})
        } else if (playId === 'JCCG') {
          this.$router.push({path: '/record_detailB', query: {planNum: planNo}})
        }
      },
      topTop () {
        scrollToTop()
      }
    },
    components: {
      Scroll
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../../common/stylus/index.styl'
  .record
    min-height:100vh
    background:linear-gradient(#42a4a4, #006666)
    .changeBtn
      display:flex
      justify-content:space-between
      margin: auto 0.8rem
      padding-top:0.3rem
      font-size:0.24rem
      p
        width:1.61rem
        height:0.6rem
        font-size:0.24rem
        color:#fff
        background:#1b6060
        text-align:center
        border-radius:0.1rem
        display:flex
        justify-content:center
        align-items:center
        // background:linear-gradient(#bae5e5, #125d5d)
        span
          display:inline-block
          height:0.53rem
          width:1.61rem
          border-radius:0.1rem
          line-height:0.53rem
          // background:linear-gradient(#89d2d2, #379e9e)
      .active
        background:linear-gradient(#bae5e5, #125d5d)
        span
          background:linear-gradient(#89d2d2, #379e9e)
    .record_container
      margin:auto 0.1rem
      margin-top:0.28rem
      padding-bottom:1.3rem
      .time
        font-size:0.18rem
        color:#31E9DA
        padding-left:0.1rem
        padding-top: 0.1rem
      .record_list
        .record_item
          // height:2.22rem
          // background:#003333
          margin-top:0.1rem
          border-radius:0.1rem
          overflow:hidden
          font-size:0
          .item_title
            height:0.62rem
            background:#287c7c
            display:flex
            justify-content:space-between
            align-items:center
            font-size:0.24rem
            color:#66cccc
            padding:0 0.15rem 0 0.15rem
            .left
              display:flex
              .score
                margin: 0 0.2rem 0 0.2rem
          .item_center
            height:0.58rem
            background:#155b5b
            display:flex
            justify-content:space-between
            align-items:center
            padding:0 0.15rem 0 0.15rem
            p
              text-align:center
              color:#339999
            .content
              font-size:0.3rem
            .res
              font-size:0.3rem
              color:#fff
              .res_odds
                font-size:0.24rem
                color:#ffff00
            .bet_time
              font-size:0.24rem
          .item_bottom
            height:1.02rem
            background:#003333
            display:flex
            justify-content:space-between
            align-items:center
            padding: 0 0.5rem 0 0.5rem
            .res_item
              p
                text-align:center
              .bottom
                margin-top:0.15rem
                color:#fff
                font-size:0.3rem
              .active1
                color:#ff6600
              .active2
                color:#ff6600
              .active3
                color:#3e6d6d
              .top
                color:#66cccc
                font-size:0.24rem
              .last
                color:#ffff00
              .active3
                color:#669999
              .first
                font-size:0.24rem
</style>