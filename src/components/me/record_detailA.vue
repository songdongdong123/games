<template>
  <div class="record_detail">
    <div class="pack_down" 
      v-on:touchmove="MoveS" 
      v-on:touchstart="MoveE"
      :class="{'pack_down_active':pack_up}"></div>
    <div class="container"
      :class="{'container_active':pack_up}"
      v-on:touchmove="MoveS" 
      v-on:touchstart="MoveE">
      <div class="outter">
        <div class="inner" :class="{'inner_active': pack_up}">
        </div>
      </div>
    </div>
    <div class="header"
      v-on:touchmove="MoveS" 
      v-on:touchstart="MoveE">
      <div class="teams">
        <span class="home_team">{{homeTeam}}</span>
        <span class="score" v-show="">2:1</span>
        <span class="guest_team">{{guestTeam}}</span>
      </div>
      <div class="icons" :class="{'icon_active':pack_up}">
        <span class="data_icon" :class="{'data_icon_puckup':pack_up}"></span>
        <span class="time_icon" :class="{'time_icon_puckup':pack_up}"></span>
        <span class="video_icon" :class="{'video_icon_puckup':pack_up}"></span>
        <span class="zhenr_icon" :class="{'zhenr_icon_puckup':pack_up}"></span>
      </div>
    </div>
    <div class="center">
      <p class="title" v-show="planState === 1">赢{{prize}}金币</p>
      <p class="title" v-show="planState === 2">未中奖</p> 
      <p class="title" v-show="planState === 0">待开奖</p>
      <p class="tab_res">
        <span class="left">开奖结果</span>
        <span class="right">投注结果</span>
      </p>
      <div class="res_cions">
        <div class="win_team">
          <span class="team_name">{{successTeam}}</span>
          <span class="win_text" v-show="planState">{{hideSuccessText ? '胜利' : '平局'}}</span>
          <span class="win_bg"></span>
        </div>
        <div class="win_prize">
          <span class="team_name">{{homeTeam}}</span>
          <p v-show="this.teamsArr[2]">
            <span class="gold_num">{{unitAmount}}</span>
            <span class="big_gold"></span>
          </p> 
          <p v-show="this.teamsArr[2] && planState !== 0">
            <span class="flag w" v-show="resArr[2]"></span>
            <span class="flag l" v-show="!resArr[2]"></span>
          </p>
          <span class="win_prize_bg"></span>
        </div>
        <div class="lose_prize">
          <span class="team_name">平局</span>
          <p v-show="teamsArr[1]">
            <span class="gold_num">{{unitAmount}}</span>
            <span class="big_gold"></span>
          </p> 
          <p v-show="teamsArr[1] && planState !== 0">
            <span class="flag w" v-show="resArr[1]"></span>
            <span class="flag l" v-show="!resArr[1]"></span>
          </p>
          <span class="win_prize_bg" ></span>
        </div>
        <div class="no_bet">
          <span class="team_name">{{guestTeam}}</span>
          <p v-show="teamsArr[0]">
            <span class="gold_num">{{unitAmount}}</span>
            <span class="big_gold"></span>
          </p>
          <p v-show="teamsArr[0] && planState !== 0">
            <span class="flag w" v-show="resArr[0]"></span>
            <span class="flag l" v-show="!resArr[0]"></span>
          </p>
          <span class="win_prize_bg"></span>
        </div>
      </div>
      <div class="list_detail">
        <ul class="list">
          <li>
            <span>订单号：{{planNum}}</span>
          </li>
          <li>
            <span>投注时间：{{betTime}}</span>
          </li>
          <li>
            <span>投注选项：{{selectContent}}</span>
          </li>
          <li>
            <span>投注金币：{{planAmount}}</span>
          </li>
          <li>
            <span v-show="planState === 1">投注回报：{{rate}}倍</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import { getDealInfo } from 'api/record'
  import formatTime from '*/formatTime'
  import { formatFloat } from '*/common'
  import { judgeMatchRes } from '*/recordDetail'
  const ERR_CODE = 0
  const RET_CODE = 0
  export default {
    data () {
      return {
        betContent: [],
        teamsArr: [false, false, false], // 投注选项状态数组
        resArr: [false, false, false], // 显示中，还是不中的状态
        hideSuccessText: true, // 是否显示胜利
        homeTeam: '', // 主队
        guestTeam: '', // 客队
        planAmount: 0, // 投注金币
        betTime: '', // 投注时间
        selectContent: '', // 投注选项
        planNum: '', // 竞猜编号
        prize: 0, // 中奖金额
        planState: 0, // 开奖状态
        matchRes: '', // 比赛结果
        successTeam: '', // 比赛结果
        rate: '', // 回报率
        unitAmount: 0, // 每注平均投注钱数
        pack_up: false // 收起
      }
    },
    created () {
      this.planNum = this.$route.query.planNum
    },
    mounted () {
      this._getDealInfo(this.$route.query.planNum)
    },
    methods: {
      _getDealInfo (planNum) {
        // 获取精彩记录详情
        getDealInfo({
          planNo: planNum
        }).then(res => {
          if (res.data.errCode === ERR_CODE && res.data.retCode === RET_CODE) {
            let data = res.data.data
            this.betContent = JSON.parse(data.betContent).matchs[0]
            this.betTime = formatTime(data.createTime)
            this.homeTeam = this.betContent.homeTeam
            this.guestTeam = this.betContent.guestTeam
            this.planAmount = data.planAmount
            this.planState = data.planState
            this.prize = data.prize
            this.unitAmount = data.unitAmount
            if (data.passResult) {
              this._getSuccessTeam(data.passResult.drawResult[this.betContent.matchNo].split(','))
            } else {
              this.successTeam = '等待'
            }
            this._getBetContent(this.betContent)
            this._getRate(this.planAmount, this.prize, this.planState)
          }
        })
      },
      _getBetContent (betContent) {
        // 获取投注内容
        let selectStr = ''
        let selectArr = betContent.selected.split(',')
        for (let list of selectArr) {
          if (list === '0') {
            selectStr += this.guestTeam + '胜，'
            this.teamsArr[0] = true
          } else if (list === '1') {
            selectStr += '平，'
            this.teamsArr[1] = true
          } else if (list === '3') {
            selectStr += this.homeTeam + '胜'
            this.teamsArr[2] = true
          }
        }
        this.selectContent = selectStr
      },
      _getRate (planAmount, prize, planState) {
        // 获取投注回报率
        if (planState === 1) {
          this.rate = formatFloat(prize / planAmount)
        }
      },
      _getSuccessTeam (scoreArr) {
        // 获取单场比赛结果
        let res = judgeMatchRes(scoreArr)
        switch (res) {
          case 0:
            this.successTeam = this.guestTeam
            this.resArr[0] = true
            break
          case 1:
            this.successTeam = '平局'
            this.hideSuccessText = false
            this.resArr[1] = true
            break
          case 3:
            this.successTeam = this.homeTeam
            this.resArr[2] = true
            break
          default:
            this.successTeam = ''
        }
      },
      MoveS (e) {
        let x = e.touches[0].pageY
        let diffY = x - this.startY
        if (diffY > 0) {
          // console.log('下滑')
          this.pack_up = true
        } else {
          // console.log('上滑')
          this.pack_up = false
        }
      },
      MoveE (e) {
        e.preventDefault()
        this.startY = e.touches[0].pageY
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../../common/stylus/mixin.styl'
  .record_detail
    position relative
    .pack_down
      position:absolute
      width:100%
      height:100vh
      background:pink
      z-index:200
      transition:all 1s
      transform:translateY(-100%)
    .pack_down_active
      transform:translateY(0)
    .container_active
      // height:1.5rem !important
    .container
      overflow-x:hidden
      position: absolute
      width:100%
      height:2rem
      transition:all 1s
      z-index:201
      .outter
        overflow-x:hidden
        .inner
          position:absolute
          width:200%
          height:7.5rem
          background:#339999
          border-radius:50%
          left:-3.75rem
          top:-5.5rem
          transition:all 1s
        .inner_active
          top:-6rem
    .header
      position:absolute
      z-index:202
      font-size:0
      .teams
        width:4.16rem
        height:0.58rem
        margin:auto 1.66rem
        margin-top:0.5rem
        display:flex
        justify-content:space-between
        align-items:center
        .home_team
          font-size:0.4rem
          color:#ffffff
        .guest_team
          font-size:0.4rem
          color:#ffffff
        .score
          color:#ffffff
          font-size:0.5rem
      .icon_active
        top:1.8rem !important
        width:5.1rem !important
        margin:auto 1.2rem !important
      .icons
        margin:auto 2.84rem
        width:1.8rem
        font-size:0.16rem
        display:flex
        justify-content:space-between
        align-items:center
        position:absolute
        transition:all 1s
        top:1.32rem
        span
          display:inline-block
          width:0.3rem
          height:0.3rem
          background-size:cover
        .data_icon
          width:0.29rem
          height:0.29rem
          bg-image('./img/data')
        .data_icon_puckup
          bg-image('./img/gdata')
        .time_icon
          bg-image('./img/time')
        .time_icon_puckup
          bg-image('./img/gtime')
        .video_icon
          width:0.37rem
          height:0.33rem
          bg-image('./img/video')
        .video_icon_puckup
          bg-image('./img/gvideo')
        .zhenr_icon
          bg-image('./img/zhenrong')
        .zhenr_icon_puckup
          bg-image('./img/gzhenr')
    .center
      position:absolute
      width:100%
      .title
        font-size:0.34rem
        margin-top:1.25rem
        text-align:center
        color:#333333
        padding-top:1.1rem
      .tab_res
        margin-left:0.82rem
        font-size:0.24rem
        margin-top:0.52rem
        .left
          color:#f08833
        .right
          margin-left:2.34rem
          color:#b0b0b0
      .res_cions
        margin-top:0.25rem
        display:flex
        align-items:flex-end
        height:1.85rem
        margin-left: 0.5rem
        .win_team
          position: relative
          .team_name
            text-align: center
            position:absolute
            font-size:0.2rem
            font-style:italic
            color:#ffffff
            font-weight:bold
            top:0.4rem
            left:0.42rem
            width: 0.8rem
            overflow: hidden
            text-overflow:ellipsis
            white-space: nowrap
          .win_text
            position:absolute
            font-size:0.3rem
            color:#fff
            left:0.52rem
            top:0.9rem
          .win_bg
            width:1.67rem
            height:1.44rem
            display:inline-block
            bg-image('./img/win')
            background-size: cover
        .win_prize
          position: relative
          font-size:0.24rem
          .team_name
            position:absolute
            color:#cccccc
            width:0.9rem
            top:-1.34rem
            left:0.73rem
            z-index:10
            text-align:center
            overflow: hidden
            text-overflow:ellipsis
            white-space: nowrap
          .gold_num
            position:absolute
            color:#999999
            top:-0.54rem
            left:0.9rem
            z-index:10
            font-weight:bold
          .win_prize_bg
            position:absolute
            width:1.26rem
            height:1.36rem
            bg-image('./img/no_bet')
            display:inline-block
            background-size: cover
            top:-1.51rem
            left:0.56rem
          .big_gold
            position:absolute
            background-size:cover
            width:0.8rem
            height:0.68rem
            bg-image('./img/big_gold')
            top:-1.2rem
            left:0.8rem
            z-index:4
          .flag
            position:absolute
            background-size:cover
            display:inline-block
            width:0.64rem
            height:0.63rem
          .w
            bg-image('./img/win_flag')
            left:1rem
            top:-2.1rem
          .l
            bg-image('./img/lose')
            left:1rem
            top:-2.1rem
        .lose_prize
          position: relative
          font-size:0.24rem
          left:1.4rem
          .team_name
            position:absolute
            color:#cccccc
            width:0.9rem
            top:-1.34rem
            left:0.73rem
            z-index:10
            text-align:center
            overflow: hidden
            text-overflow:ellipsis
            white-space: nowrap
          .gold_num
            position:absolute
            color:#999
            font-weight:bold
            top:-0.54rem
            left:0.9rem
            z-index:10
          .win_prize_bg
            position:absolute
            width:1.26rem
            height:1.36rem
            bg-image('./img/no_bet')
            display:inline-block
            background-size: cover
            top:-1.51rem
            left:0.56rem
          .big_gold
            position:absolute
            background-size:cover
            width:0.8rem
            height:0.68rem
            bg-image('./img/big_gold')
            top:-1.2rem
            left:0.8rem
            z-index:4
          .flag
            position:absolute
            background-size:cover
            display:inline-block
            width:0.64rem
            height:0.63rem
          .w
            bg-image('./img/win_flag')
            left:1rem
            top:-2.1rem
          .l
            bg-image('./img/lose')
            left:1rem
            top:-2.1rem
        .no_bet
          position: relative
          font-size:0.24rem
          left:2.8rem
          .team_name
            position:absolute
            color:#cccccc
            width:0.9rem
            top:-1.34rem
            left:0.73rem
            z-index:10
            text-align:center
            overflow: hidden
            text-overflow:ellipsis
            white-space: nowrap
          .gold_num
            position:absolute
            color:#999
            font-weight:bold
            top:-0.54rem
            left:0.9rem
            z-index:10
          .win_prize_bg
            position:absolute
            width:1.26rem
            height:1.36rem
            bg-image('./img/no_bet')
            display:inline-block
            background-size: cover
            top:-1.5rem
            left:0.56rem
          .big_gold
            position:absolute
            background-size:cover
            width:0.8rem
            height:0.68rem
            bg-image('./img/big_gold')
            top:-1.2rem
            left:0.8rem
            z-index:4
          .flag
            position:absolute
            background-size:cover
            display:inline-block
            width:0.64rem
            height:0.63rem
          .w
            bg-image('./img/win_flag')
            left:1rem
            top:-2.1rem
          .l
            bg-image('./img/lose')
            left:1rem
            top:-2.1rem
      .list_detail
        margin-top:0.3rem
        font-size:0.24rem
        color:#666666
        .list
          li
            height:0.62rem
            line-height:0.62rem
            border-top:1px solid #f3f3f3
            span
              padding-left:0.3rem
</style>

