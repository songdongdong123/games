<template>
  <transition name="slide" mode="in-out">
    <div class="match_detail">
    <div class="match_container">
      <div class="list_container">
        <div class="title">
          <p class="bg">
            <span class="bg-title">竞猜</span>
            <span class="match_team">{{homeTeam}}vs{{guestTeam}}</span>
          </p>
        </div>
        <div class="tags">
          <p 
          @click="chooseThis(index)"
          :class="{'active': currentIndex === index}"
          v-for="(list, index) in btnList"><span>{{list}}</span></p>
        </div>
        <Scroll class="content"
          ref="content"
          @scrollDown="scrollDowns"
          :pull-down="true"
          :listenScroll="true" 
          :data="record_list" 
          :matchState="matchState">
          <div>
            <div v-for="list in record_list">
            <p class="time" v-show="!showToast">{{list.subLeagueName}}</p>
            <ul 
              class="record_list">
              <li class="record_item" v-for="item in list.data">
                <div class="record_title">
                  <span class="title_item">{{item.playName}}</span>
                  <span class="title_item center">{{item.betContent[0]}}<span class="score">@{{item.betContent[1]}}</span></span>
                  <span class="title_item">{{item.betTime}}</span>
                </div>
                <div class="res_record">
                  <div class="res_item">
                    <p class="top">结果</p>
                    <p class="bottom first">{{item.result}}</p>
                  </div>
                  <div class="res_item">
                    <p class="top">投入金币</p>
                    <p class="bottom">{{item.amount}}</p>
                  </div>
                  <div class="res_item">
                    <p class="top">预计返还</p>
                    <p class="bottom last">{{item.retAmount}}</p>
                  </div>
                </div>
              </li>
            <div class="loading">
              <Loading class="Loading" v-show="loading"></Loading>
            </div>
            </ul>
          </div>
              <p class="lastLoading" v-show="showToast">{{toastText}}</p>
          </div>
        </Scroll>
      </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import Scroll from '../../base/scroll/scroll'
  import { mapGetters, mapMutations } from 'vuex'
  import { getOneMatchGuessRecord } from 'api/record'
  import Loading from '@/base/loading/loading'
  import { forMatGameList } from '*/common'
  export default {
    props: {
      matchNo: {
        type: String,
        default: ''
      },
      homeTeam: {
        type: String,
        default: ''
      },
      guestTeam: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        currentIndex: 0,
        btnList: ['全部', '未结算', '中奖'],
        myChannel: [1, 2, 3, 4, 5, 6],
        // 单场比赛的投注记录
        oneMatchList: [],
        record_list: [],
        tempArr: [],
        page1: 0,
        loading: false,
        showToast: false,
        pageCount: 0,
        toastText: '暂无投注记录'
      }
    },
    watch: {
      matchState (newV, oldV) {
        if (!oldV) {
          this.record_list = []
          this._getChannelList({})
        }
      }
    },
    created () {
      // this._getChannelList({})
    },
    computed: {
      ...mapGetters([
        'matchState'
      ])
    },
    methods: {
      scrollTos () {
        this.$refs.content.scrollTo(0, 0, 30)
      },
      scrollDowns () {
        if (this.page1 < Math.ceil(this.pageCount / 10) - 1) {
          this.page1 = this.page1 + 1
          this.loading = true
          this._getChannelList({page1: this.page1, pageSize: 10})
        } else {
          this.loading = false
          this.loading = false
        }
      },
      chooseThis (index) {
        this.currentIndex = index
        this.tempArr = []
        this.loading = false
        this.page1 = 0
        this._getChannelList({})
        this.scrollTos()
      },
      _getChannelList ({page1 = 0, pageSize = 10}) {
        // 测试代码
        getOneMatchGuessRecord({
          tabs: this.currentIndex,
          matchNo: this.matchNo,
          lotyId: 'JCZQ',
          page: page1,
          pageSize: pageSize
        }).then(res => {
          if (res.data.errCode === this.$ERR_CODE && res.data.retCode === this.$RET_CODE) {
            if (res.data.data.data) {
              this.pageCount = res.data.data.totalNum
              this.tempArr = this.tempArr.concat(res.data.data.data)
              this.record_list = this.tempArr
              for (let list of this.record_list) {
                list.betContent = list.guessContent.split('@')
                list.subLeagueName = this.$forMatTime(list.guessTime, 'y-m-d')
                list.betTime = this.$forMatTime(list.guessTime, 'h-m-s')
              }
              this.record_list = forMatGameList(this.record_list)
              this.showToast = false
            } else {
              this.record_list = []
              if (this.currentIndex === 0 || this.currentIndex === 1) {
                this.showToast = true
                this.toastText = '暂无投注记录'
              } else {
                this.showToast = true
                this.toastText = '暂无中奖记录'
              }
            }
          }
        })
      },
      hideMatchRecord () {
        // 收起竞猜页内竞猜详情
        this.hideMode(false)
      },
      ...mapMutations({
        hideMode: 'SET_MATCH_STATE'
      })
    },
    components: {
      Scroll,
      Loading
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../../common/stylus/index.styl'
  .slide-enter-active,.slide-leave-active
    transition: all .5s
  .slide-enter
    transform:scale(0.2)
  .slide-leave-to
    transform:scale(0)
  .match_detail
    position: absolute
    // height:100%
    width:100%
    display:flex
    justify-content: center
    margin-top:1.1rem
    // align-items:center
    z-index:1010
    .match_container
      width:6.95rem
      height:10rem
      background:linear-gradient(#45a7a7, #006666)
      border-radius:0.1rem
      border:2px solid #cccc99
      .list_container
        position:relative
        .title
          height:0.5rem
          .bg
            top:-0.5rem
            left:50%
            margin-left:-2.065rem
            position:absolute
            width:4.13rem
            height:0.95rem
            background-size:cover
            bg-image('img/titleBg')
            span
              display:block
              color:#fff
              text-align:center
              margin-top:0.1rem
            .bg-title
              font-size:0.36rem
            .match_team
              font-size:0.24rem
        .tags
          display:flex
          justify-content:space-between
          margin:auto 0.53rem
          margin-top:0.3rem
          p
            width:1.61rem
            height:0.6rem
            font-size:0.24rem
            color:#fff
            background:#1b6060
            text-align:center
            // line-height:0.6rem
            border-radius:0.1rem
            display:flex
            justify-content:center
            align-items:center
            span
              display:inline-block
              height:0.53rem
              width:1.61rem
              // background:red
              border-radius:0.1rem
              line-height:0.53rem
              // background:linear-gradient(#89d2d2, #379e9e)
          .active
            background:linear-gradient(#bae5e5, #125d5d)
            span
              background:linear-gradient(#89d2d2, #379e9e)
        .content
          // width:6rem
          height:8rem
          overflow-y:hidden
          margin: auto 0.1rem
          margin-top:0.4rem
          font-size:0.3rem
          // padding-bottom:0.5rem
          div
            // margin-bottom:1rem
            .time
              font-size:0.24rem
              padding-left:0.3rem
              color:#006666
            .record_list
              // padding-bottom:1rem
              .record_item
                height:1.6rem
                background:#003333
                margin-top:0.2rem
                .record_title
                  height:0.6rem
                  background:#175d5d
                  display:flex
                  justify-content:space-between
                  line-height:0.6rem
                  padding:0 0.2rem 0 0.2rem
                  color:#339999
                  span
                    display:inline-block
                    text-align:center
                  .center
                    font-size:0.3rem
                    color:#fff
                    .score
                      color:#ff0
                .res_record
                  height:1rem
                  margin: auto 0.5rem
                  display:flex
                  justify-content:space-between
                  align-items:center
                  .res_item
                    p
                      text-align:center
                    .bottom
                      margin-top:0.1rem
                      color:#fff
                      // margin-top:0.15rem
                    .top
                      color:#66cccc
                      font-size:0.24rem
                    .last
                      color:#ffff00
                    .first
                      font-size:0.24rem
        .loading
          // height:5rem
          font-size:0rem
          height 0.5rem
          margin-top:0.3rem
          .Loading
            font-size:0.3rem
        .lastLoading
          font-size:0.3rem
          text-align:center
          color:#fff
</style>

