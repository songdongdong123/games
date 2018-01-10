<template>
  <div class="record_detailB">
    <div class="header">
      <div class="game_data">
        <p class="left">
          <span >赛前：{{betContent.length}}场比赛 {{passType}}</span>
        </p>
        <p class="right" >
          <span v-show="planState">{{betContent.length}}场已完场</span>
          <span v-show="!planState">比赛尚未结束</span>
        </p>
      </div>
      <div class="bet_gold_data">
        <p class="left" v-show="planState===1">赢{{prize}}金币</p>
        <p class="left" v-show="planState===2">未中奖</p>
        <p class="left" v-show="planState===0">未开奖</p>
        <p class="right">总投注金币：{{planAmount}}</p>
      </div>
    </div>
    <div class="game_record_list" v-for="(item, index) in betContent">
      <div class="game_title">
        <p class="game_num">第{{index+1}}场</p>
        <p class="teams">
          <span class="home_team">{{item.homeTeam}}</span>
          <span class="VS" v-show="planState !==0">{{item.score[0]}}:{{item.score[1]}}</span>
          <span class="VS" v-show="planState === 0"></span>
          <span class="away_team">{{item.guestTeam}}</span>
        </p>
        <p class="game_state" v-show="false">
          已完场
        </p>
      </div>
      <div class="res_container">
        <p class="res_title">
          <span class="left">开奖结果</span>
          <span class="right">投注结果</span>
        </p>
        <div class="res_icons">
          <div class="win">
            <span class="win_team">{{item.winTeam}}</span>
            <!-- <span class="win_team">等待</span> -->
            <span class="win_tex" v-show="planState">{{item.winTeam === '平局'?'平局':'胜利'}}</span>
            <span class="win_icon"></span>
          </div>
          <div class="win_prize">
            <span class="team_name">{{item.homeTeam}}</span>
            <p v-show="item.chooseArr[2]">
              <!-- <span class="gold_num">{{unitAmount}}</span> -->
              <span class="big_gold"></span>
            </p>
            <p v-show="item.chooseArr[2] && planState !== 0">
              <span class="flag w" v-show="item.winTeam===item.homeTeam"></span>
              <span class="flag l" v-show="item.winTeam!==item.homeTeam"></span>
            </p> 
            <span class="win_prize_bg"></span>
          </div>
          <div class="lose_prize">
            <span class="team_name">平局</span>
            <p v-show="item.chooseArr[1]">
              <!-- <span class="gold_num">{{unitAmount}}</span> -->
              <span class="big_gold"></span>
            </p>
            <p v-show="item.chooseArr[1] && planState !== 0">
              <span class="flag w" v-show="item.winTeam==='平局'"></span>
              <span class="flag l" v-show="item.winTeam!=='平局'"></span>
            </p> 
            <span class="win_prize_bg"></span>
          </div>
          <div class="no_bet">
            <span class="team_name">{{item.guestTeam}}</span>
            <p v-show="item.chooseArr[0]">
              <!-- <span class="gold_num">{{unitAmount}}</span> -->
              <span class="big_gold"></span>
            </p>
            <p v-show="item.chooseArr[0] && planState !== 0">
              <span class="flag w" v-show="item.winTeam===item.guestTeam"></span>
              <span class="flag l" v-show="item.winTeam!==item.guestTeam"></span>
            </p> 
            <span class="win_prize_bg"></span>
          </div>
        </div>
      </div>
    </div>
    <div class="order_msg">
      <ul class="list">
        <li class="item">
          <span>订单号：{{planNo}}</span>
        </li>
        <li class="item">
          <span>投注时间：{{betTime}}</span>
        </li>
        <li class="item" v-show="planState === 1">
          <span>投注回报：{{rate}}倍</span>
        </li>
        <li class="item">
          <span>投注金币：{{planAmount}}</span>
        </li>
        <li class="item">
          <span>投注类型：串关投注</span>
        </li>
      </ul>
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
        planAmount: 0, // 投注金额
        unitAmount: 0, // 每注投注金额
        planState: 0, // 开奖状态 0待开奖，1中奖，2未中奖
        passResult: '', // 临时状态
        prize: 0, // 中奖金额
        planNo: '', // 订单号
        betTime: '', // 投注时间
        rate: '', // 投注回报率
        passType: '', // 过关方式
        chooseArr: [false, false, false],
        betContent: [] // 对阵列表
      }
    },
    created () {
      this.planNo = this.$route.query.planNum
      // console.log(this.$route.query)
      this._getDealInfo(this.planNo)
    },
    methods: {
      _getDealInfo (planNo) {
        // 获取竞猜详情
        getDealInfo({
          planNo: planNo
        }).then(res => {
          if (res.data.errCode === ERR_CODE && res.data.retCode === RET_CODE) {
            [
              this.betContent,
              this.planAmount,
              this.unitAmount,
              this.planState,
              this.prize,
              this.betTime,
              this.passResult,
              this.passType] = [
                JSON.parse(res.data.data.betContent).matchs,
                res.data.data.planAmount,
                res.data.data.unitAmount,
                res.data.data.planState,
                res.data.data.prize,
                formatTime(res.data.data.createTime),
                res.data.data.passResult,
                JSON.parse(res.data.data.betContent).passType]
            console.log(res.data.data)
            let data = res.data.data
            if (data.passResult) {
              this._getSuccessTeam(data.passResult.drawResult)
            } else {
              for (let list of this.betContent) {
                list.winTeam = '等待'
                list.chooseArr = this._getChooseState(list.selected.split(','))
                list.score = [0, 0]
              }
            }
            this._getRate(this.planAmount, this.prize, this.planState)
          }
        })
      },
      _getRate (planAmount, prize, planState) {
        // 获取投注回报率
        if (planState === 1) {
          this.rate = formatFloat(prize / planAmount)
        }
      },
      _getChooseState (arr) {
        // 获取每场比赛的选项
        this.chooseArr = [false, false, false]
        for (let list of arr) {
          switch (list) {
            case '0':
              this.chooseArr[0] = true
              break
            case '1':
              this.chooseArr[1] = true
              break
            case '3':
              this.chooseArr[2] = true
          }
        }
        return this.chooseArr
      },
      _getSuccessTeam (scoreObj) {
        // 获取串关每场比赛赛果
        // console.log(this.betContent)
        for (let list of this.betContent) {
          let x = judgeMatchRes(scoreObj[list.matchNo].split(','))
          let scorArr = scoreObj[list.matchNo].split(',')
          switch (x) {
            case 0:
              list.winTeam = list.guestTeam
              list.chooseArr = this._getChooseState(list.selected.split(','))
              list.score = scorArr.splice(2, scorArr.length)
              break
            case 1:
              list.winTeam = '平局'
              list.chooseArr = this._getChooseState(list.selected.split(','))
              list.score = scorArr.splice(2, scorArr.length)
              break
            case 3:
              list.winTeam = list.homeTeam
              list.chooseArr = this._getChooseState(list.selected.split(','))
              list.score = scorArr.splice(2, scorArr.length)
              break
            default:
              list.winTeam = ''
          }
        }
        console.log(this.betContent)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../../common/stylus/index.styl'
  .record_detailB
    .header
      background:#339999
      height:1.32rem
      .game_data
        font-size:0.24rem
        color:#fff
        display:flex
        justify-content:space-between
        margin:auto 0.32rem
        padding-top:0.14rem
        .left
          .left_1
            margin-left:0.15rem
      .bet_gold_data
        display:flex
        justify-content:space-between
        margin:auto 0.32rem
        margin-top:0.38rem
        color:#fff
        .left
          font-size:0.36rem
        .right
          font-size:0.24rem
          margin-top:0.05rem
    .game_record_list
      margin-top:0.2rem
      .game_title
        font-size:0
        height:1.1rem
        margin:auto 0.32rem
        .game_num
          font-size:0.3rem
        .teams
          font-size:0.36rem
          text-align:center
          color:#333333
          span
            display:inline-block
            width:1.3rem
            overflow: hidden
            text-overflow:ellipsis
            white-space: nowrap
          .VS
            color:#999999
            margin:0 0.5rem 0 0.5rem
        .game_state
          font-size:0.18rem
          color:#b8b8b8
      .res_container
        height:2.69rem
        background:#f3f3f3
        box-shadow 0px 4px 2px #e4e4e4
        .res_title
          padding-top:0.2rem
          margin-left:0.88rem
          font-size:0.24rem
          .left
            color:#f08833
          .right
            margin-left:2.34rem
            color:#999999
      .res_icons
        position:relative
        display:flex
        margin-top:0.7rem
        .win
          margin-left 0.57rem
          .win_team
            text-align: center
            position:absolute
            font-size:0.2rem
            color:#fff
            font-style:italic
            left:0.94rem
            top:0.4rem
            width:0.9rem
            overflow: hidden
            text-overflow:ellipsis
            white-space: nowrap
          .win_tex
            position:absolute
            font-size:0.3rem
            color:#fff
            top:0.9rem
            left:1.06rem
          .win_icon
            display:inline-block
            width:1.67rem
            height:1.44rem
            background-size:cover
            bg-image('./img/win')
      .win_prize
          position: relative
          font-size:0.24rem
          .team_name
            position:absolute
            color:#cccccc
            width:0.5rem
            top:0.2rem
            left:0.73rem
            z-index:10
            width:0.9rem
            text-align:center
            overflow: hidden
            text-overflow:ellipsis
            white-space: nowrap
          .gold_num
            position:absolute
            color:#999
            top:0.9rem
            left:0.73rem
            z-index:10
            font-weight: bold
            width:0.9rem
            text-align:center
            overflow: hidden
            text-overflow:ellipsis
            white-space: nowrap
          .win_prize_bg
            position:absolute
            width:1.26rem
            height:1.36rem
            bg-image('./img/no_bet')
            display:inline-block
            background-size: cover
            top:0
            left:0.56rem
          .big_gold
            position:absolute
            background-size:cover
            width:0.8rem
            height:0.68rem
            bg-image('./img/big_gold')
            top:0.5rem
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
            top:-0.56rem
          .l
            bg-image('./img/lose')
            left:1rem
            top:-0.56rem
        .lose_prize
          position: relative
          font-size:0.24rem
          left:1.4rem
          .team_name
            position:absolute
            color:#cccccc
            top:0.2rem
            left:0.73rem
            z-index:10
            width:0.9rem
            text-align:center
            overflow: hidden
            text-overflow:ellipsis
            white-space: nowrap
          .gold_num
            position:absolute
            color:#999
            top:0.9rem
            left:0.73rem
            z-index:10
            font-weight: bold
            width:0.9rem
            text-align:center
            overflow: hidden
            text-overflow:ellipsis
            white-space: nowrap
          .win_prize_bg
            position:absolute
            width:1.26rem
            height:1.36rem
            bg-image('./img/no_bet')
            display:inline-block
            background-size: cover
            top:0
            left:0.56rem
          .big_gold
            position:absolute
            background-size:cover
            width:0.8rem
            height:0.68rem
            bg-image('./img/big_gold')
            top:0.5rem
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
            top:-0.56rem
          .l
            bg-image('./img/lose')
            left:1rem
            top:-0.56rem
        .no_bet
          position: relative
          font-size:0.24rem
          left:2.8rem
          .team_name
            position:absolute
            color:#cccccc
            top:0.2rem
            left:0.73rem
            z-index:10
            width:0.9rem
            text-align:center
            overflow: hidden
            text-overflow:ellipsis
            white-space: nowrap
          .gold_num
            position:absolute
            color:#999
            top:0.9rem
            left:0.73rem
            z-index:10
            font-weight: bold
            width:0.9rem
            text-align:center
            overflow: hidden
            text-overflow:ellipsis
            white-space: nowrap
          .win_prize_bg
            position:absolute
            width:1.26rem
            height:1.36rem
            bg-image('./img/no_bet')
            display:inline-block
            background-size: cover
            top:0
            left:0.56rem
          .big_gold
            position:absolute
            background-size:cover
            width:0.8rem
            height:0.68rem
            bg-image('./img/big_gold')
            top:0.5rem
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
            top:-0.56rem
          .l
            bg-image('./img/lose')
            left:1rem
            top:-0.56rem
    .order_msg
      .list
        font-size:0.24rem
        margin-top:0.05rem
        .item
          padding-left:0.32rem
          height:0.62rem
          line-height:0.62rem
          border-top:1px solid #f3f3f3
</style>

