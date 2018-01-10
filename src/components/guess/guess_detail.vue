<template>
<!-- <Scroll refs = 'guess_detail' class="Scroll"> -->
  <div class="guess_detail" :class="{'over': matchState, 'overs': betCarState}">
    <div class="testBd"></div>
    <Masks
      v-show="matchState"></Masks>
    <matchDetail v-show="matchState" 
      :home-team="home_team"
      :guest-team="guest_team"
      :match-no="matchNo"></matchDetail>
    <cloasebet></cloasebet>
    <betError></betError>
    <div class="titleS">{{leagueName}}</div>
    <div class="match_msg">
      <div class="team_name home">
        <p>{{home_team}}</p>
      </div>
      <div class="res">{{home_score}}:{{guest_score}}</div>
      <div class="team_name guest">
        <p>{{guest_team}}</p>
      </div>
    </div>
    <div class="event">
      <div class="time">
        <p>{{commCase}}</p>
      </div>
      <div class="event_container home">
        <p v-if="homeCase">{{homeCase.desc}} {{homeCase.minutes}}</p>
      </div>
      <div class="event_container guest">
        <p v-if="guessCase">{{guessCase.desc}} {{guessCase.minutes}}</p>
      </div>
    </div>
    <!-- <Scroll :guessDetail="guessDetail" :data="playingList"> -->
    <div class="bet_option">
      <span class="record_icon" @click="showMaskMethod"></span>
      <ul class="bet_option_list">
        <li 
          v-for="(list, key) in playingList"
          class="bet_option_item">
          <div class="option_container">
            <div class="title">
              <span class="item0">{{list.playName}}</span>
              <span class="item1">竞猜两队全场比赛（含补时）的让球比赛结果</span>
            </div>
            <div class="playing">
              <div
                v-for="(item, index) in list.odds" 
                :class="{
                  'two':list.playId === 'AH' || list.playId === 'DXQ', 
                  'three': list.odds.length===3, 
                  'active': currentIndex===index && list.playId === playId}" 
                @click="shwoNewBetCar(index, list.playId, item, list.issueNo)">
                <p>
                  <span>{{item.cnName}}</span>
                  <span class="odds">{{item.oddsVal}}倍</span>
                </p>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <div class="lastOdds" :class="{'lastOdds_active':betCarState}">
        <div class="title">
          <span class="item0">{{lastOdds.playName}}</span>
          <span class="item1">竞猜两队全场比赛(含补时)的让球比赛结果</span>
        </div>
        <div class="groups" v-for="list in lastOdds.odds">
          <p class="group_title">{{list.tab}}</p>
          <div class="BF_container">
            <p class="item_last" 
              :class="{'active': currentIndex===index && lastOdds.playId === playId && list.tab===tab}"
              @click="betBF(index, lastOdds.playId, list.tab, item, lastOdds.issueNo)"
              v-for="(item, index) in list.concreteOdds">
              <span v-if ="item.enName"></span>
              <span class="score">{{item.showName}}</span>
              <span class="odds_num">{{item.oddsVal}}倍</span>
            </p>
            <p></p>
            <p></p>
            <p></p>
            <p></p>
          </div>
        </div>
      </div>
    </div>
    <newBetCar v-show="betCarState"></newBetCar>
  </div>
<!-- </Scroll> -->
</template>

<script>
  import Scroll from '../../base/scroll/scroll'
  import Masks from '@/base/mask/mask'
  import matchDetail from '@/components/match_detail/match_detail'
  import newBetCar from '@/base/bet_cart/new_bet_cat'
  import { mapGetters, mapMutations, mapActions } from 'vuex'
  import { getMatchOddList } from 'api/matchlist'
  import cloasebet from '@/base/alert/cloasebet'
  import betError from '@/base/alert/beterror'
  export default {
    data () {
      return {
        guessDetail: false,
        playingList: [{}],
        lastOdds: {},
        home_team: '',
        guest_team: '',
        home_score: 0,
        guest_score: 0,
        homeCase: {},
        guessCase: {},
        commCase: '',
        leagueName: '',
        currentIndex: '',
        playId: '',
        lastTab: '',
        matchStates: 0,
        clearTimer: '',
        arr: [1, 2, 3, 4]
      }
    },
    created () {
      this.matchNo = this.$route.query.matchNo
      this._getMatchOddList()
      this.loopGetData()
    },
    computed: {
      ...mapGetters([
        'matchState',
        'betCarState',
        'closeBetCarState'
      ])
    },
    methods: {
      loopGetData () {
        // 比赛开赛的时候，5秒钟刷新一次
        clearInterval(this.clearTimer)
        if (this.matchStates === 0) {
          this.clearTimer = setInterval(() => {
            this._getMatchOddList()
            if (this.betCarState) {
              clearInterval(this.clearTimer)
            } else if (this.matchStates === 2) {
              clearInterval(this.clearTimer)
            } else if (this.matchState) {
              clearInterval(this.clearTimer)
            }
          }, 1000 * 10)
        }
      },
      _getMatchOddList () {
        // 获取比赛内部数据
        getMatchOddList({
          matchNo: this.matchNo,
          lotyId: 'JCZQ',
          betType: 'JCDG'
        }).then(res => {
          if (res.data.errCode === this.$ERR_CODE && res.data.retCode === this.$RET_CODE) {
            [
              this.home_team,
              this.guest_team,
              this.home_score,
              this.guest_score,
              this.homeCase,
              this.guessCase,
              this.commCase,
              this.matchStates,
              this.leagueName
            ] = [
              res.data.data.match.homeTeam,
              res.data.data.match.guestTeam,
              res.data.data.match.homeTeamScore,
              res.data.data.match.guestTeamScore,
              res.data.data.match.matchCase.homeCase,
              res.data.data.match.matchCase.guessCase,
              res.data.data.match.matchCase.commCase,
              res.data.data.match.matchState,
              res.data.data.match.leagueName
            ]
            if (this.matchStates === 0) {
              this.commCase = '未开赛'
            }
            this.guessDetail = true
            let playingList = [].concat(res.data.data.matchOdd)
            this.playingList = playingList.splice(0, playingList.length - 1)
            this.lastOdds = playingList.splice(-1, 1)[0]
            for (let list of this.lastOdds.odds) {
              for (let item of list.concreteOdds) {
                if (item.enName === '9:0') {
                  item.showName = '胜其他'
                } else if (item.enName === '0:9') {
                  item.showName = '负其他'
                } else if (item.enName === '9:9') {
                  item.showName = '平其他'
                } else {
                  item.showName = item.enName
                }
              }
            }
          }
        })
      },
      showMaskMethod () {
        this.showMask(true)
        this.shwoBetCar(false)
        clearInterval(this.clearTimer)
      },
      shwoNewBetCar (index, playId, list, issueNo) {
        if (this.currentIndex === index && this.playId === playId) {
          this.shwoBetCar(false)
          this.currentIndex = ''
          this.playId = ''
        } else {
          this.currentIndex = index
          this.playId = playId
          this.betMatch({
            info: {
              matchNo: this.matchNo,
              betItem: list,
              betissueNo: issueNo,
              playId: playId,
              odds: list.oddsVal
            },
            betCarState: true
          })
        }
      },
      betBF (index, playId, tab, item, issueNo) {
        // 选择比分投注
        if (playId === 'BF') {
          // this.showMask(true)
          if (this.currentIndex === index && this.playId === playId) {
            this.shwoBetCar(false)
            this.currentIndex = ''
            this.playId = ''
          } else {
            this.currentIndex = index
            this.playId = playId
            this.tab = tab
            this.betMatch({
              info: {
                matchNo: this.matchNo,
                betItem: item,
                betissueNo: issueNo,
                playId: playId,
                odds: item.oddsVal
              },
              betCarState: true
            })
          }
        }
      },
      hideMatchDetail () {
        // 隐藏比赛内页投注记录弹窗
        this.showMask(false)
      },
      ...mapActions([
        'betMatch'
      ]),
      ...mapMutations({
        showMask: 'SET_MATCH_STATE',
        shwoBetCar: 'SET_BET_CAR'
      })
    },
    watch: {
      betCarState (newV, oldV) {
        if (oldV) {
          this.loopGetData()
          this.currentIndex = ''
          this.playId = ''
        }
      },
      matchState (newV, oldV) {
        if (!oldV) {
          clearInterval(this.clearTimer)
        } else {
          this.loopGetData()
        }
      }
    },
    beforeDestroy () {
      this.showMask(false)
      this.shwoBetCar(false)
      clearInterval(this.clearTimer)
    },
    components: {
      Masks,
      matchDetail,
      newBetCar,
      Scroll,
      cloasebet,
      betError
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../../common/stylus/index.styl'
  .active
    border-bottom:2px solid #0a6f6f !important
    background:#5cbfbf !important
    .odds
      color:#e6f43d !important
    .odds_num
      color:#e6f43d !important
  .over
    overflow-y: hidden
    height:100vh !important
    // position:fixed
  .testBd
    position:fixed
    top:0
    left: 0
    width: 100%
    height:100%
    background-image url('img/bg.jpg')
    background-size:100% 100%
    background-position:center
    // background red
  .guess_detail
    // position:absolute
    overflow-x:hidden
    min-height:100vh
    // background-size:cover
    background-size:100% 100%
    background-position:center
    // background-position:center center no-repeat
    // background-repeat:no-repeat
    background-image url('img/bg.jpg')
    .titleS
      z-index:1000
      position:absolute
      width:100%
      font-size:0.24rem
      color:#99cccc
      text-align:center
      height:0.7rem
      line-height:0.7rem
    .match_msg
      margin-top:0.7rem
      display:flex
      justify-content:center
      position: relative
      .res
        height:0.9rem
        text-align:center
        line-height:0.9rem
        color:#00ffff
        font-size:0.36rem
        width:1.4rem
      .team_name
        position:absolute
        width:3.06rem
        height:0.9rem
        background:linear-gradient(-181deg, #71d5d5, #006666)
        text-align:center
        line-height:0.9rem
        color:#ccffff
        font-size:0.36rem
      .guest
        right:-0.18rem
        transform:skew(-20deg)
        p
          transform:skew(20deg)
      .home
        transform:skew(20deg)
        left:-0.18rem
        p
          transform:skew(-20deg)
    .event
      position:absolute
      width:100%
      display:flex
      height:0.7rem
      justify-content:center
      background:linear-gradient(#0c2124, #17484a)
      z-index:1000
      .event_container
        position:absolute
        width:2.76rem
        height:0.7rem
        color:#66cccc
        line-height:0.7rem
        p
          font-size:0.24rem
      .home
        left:0
        p
          text-align:left
          padding-left:0.3rem
      .guest
        right:0
        p
          text-align:right
          padding-right:0.3rem
      .time
        width:1.5rem
        height:0.7rem
        // margin: 50px
        text-align:center
        color:#fff
        line-height:0.7rem
        background:linear-gradient(-181deg, #71d5d5, #006666)
        position:relative
        font-size:0.18rem
      .time::before
        content:''
        display:block
        width:0.3rem
        height:0.7rem
        position:absolute
        transform:skewX(18deg)
        background:linear-gradient(#0c2124, #17484a)
        left:-0.14rem
        top:0
      .time::after
        content:''
        display:block
        width:0.3rem
        height:0.7rem
        position:absolute
        transform:skewX(-18deg)
        background:linear-gradient(#0c2124, #17484a)
        top:0
        right:-0.14rem
    .bet_option
      margin-top:1.17rem
      position: relative
      .record_icon
        position:fixed
        width:0.44rem
        height:0.53rem
        background-size:cover
        bg-image('img/record')
        right:0.45rem
        top:2.38rem
        z-index:1000
      .bet_option_list
        .bet_option_item
          min-height:1.6rem
          padding-bottom:0.2rem
          background:rgba(28,58,57,.2)
          margin-bottom:0.1rem
          .option_container
            .title
              margin:auto 0.3rem
              height:0.6rem
              display:flex
              justify-content:space-between
              align-items:center
              .item0
                font-size:0.36rem
                color:#fff
              .item1
                font-size 0.18rem
                color:#99cccc
            .playing
              display:flex
              justify-content:space-between
              flex-wrap:wrap
              min-height:1.06rem
              div
                display: flex;
                justify-content: center;
                align-items: center
              .three
                width:2.48rem
                background:rgba(29,77,76,0.7)
                border-bottom:2px solid rgba(0,0,0,0)
                // border-bottom:2px solid #113030
                // border-color:none
                p
                  span
                    display:block
                    text-align:center
                    font-size:0.3rem
                    color:#fff
                  .odds
                    font-size:0.24rem
                    margin-top:0.1rem
                    color:#57b1b1
              .two
                width:3.735rem
                height:1rem
                background:rgba(29,77,76,0.7)
                margin-bottom:0.03rem
                border-bottom:2px solid rgba(0,0,0,0)
                p
                  span
                    display:block
                    text-align:center
                    font-size:0.3rem
                    color:#fff
                  .odds
                    font-size:0.24rem
                    margin-top:0.1rem
                    color:#57b1b1
              .four
                width:1.86rem
                background:rgba(29,77,76,0.7)
                p
                  span
                    display:block
                    text-align:center
                    font-size:0.3rem
                    color:#fff
                  .odds
                    font-size:0.24rem
                    margin-top:0.1rem
      .lastOdds
        min-height:1.6rem
        padding-bottom:0.2rem
        background:rgba(28,58,57,.2)
        margin-bottom:0.1rem
        transition:all 0.5s
        .title
          margin:auto 0.3rem
          height:0.6rem
          display:flex
          justify-content:space-between
          align-items:center
          .item0
            font-size:0.36rem
            color:#fff
          .item1
            font-size 0.18rem
            color:#99cccc
        .groups
          margin-top:0.2rem
          .group_title
            margin-left:0.3rem
            font-size:0.24rem
            color:#57b1b1
            margin-bottom:0.1rem
          .BF_container
            display:flex
            justify-content:space-between
            flex-wrap:wrap
          .BF_container
            p:empty
              height: 0
              // border:0
              width:1.86rem
            .item_last
              width:1.86rem
              background:rgba(29,77,76,0.7)
              border-bottom:2px solid rgba(0,0,0,0)
              font-size:0.3rem
              color:#fff
              height:1rem
              text-align:center
              margin-top:0.05rem
              span
                display:block
              .score
                margin-top:0.1rem
              .odds_num
                margin-top:0.15rem
                font-size:0.24rem
                color:#57b1b1
      .lastOdds_active
        padding-bottom:3rem
</style>

