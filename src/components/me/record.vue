<template>
  <div class="record">
    <div class="header">
      <div class="container">
        <div class="team">
          <span class="base home_icon"></span>
          <p class="team_message">
            <span class="textMargin team_name">{{homeTeam}}</span>
            <span class="textMargin team_ranking">小组排名第5</span>
          </p>
        </div>
        <div class="team">
          <p>  vs  </p>
        </div>
        <div class="team">
          <p class="team_message">
            <span class="textAlign team_name">{{guestTeam}}</span>
            <span class="textAlign team_ranking">小组排名第5</span>
          </p>
          <span class="base guest_icon"></span>
        </div>
     </div>
    </div>
    <div class="bet_btn">
      <p  :class="{'btn1':tagClass, 'btn2':!tagClass}" @click="tagClassName">赛前投注</p>
      <p  :class="{'btn1':!tagClass, 'btn2':tagClass}" @click="tagClassName">滚盘投注</p>
    </div>
    <div class="bet_record">
      <div class="total_gold">
        <p>总投注：金币{{guessMoney}}</p>
      </div>
      <div class="bet_list">
        <ul
        infinite-scroll-distance="50"
        v-infinite-scroll="_InfiniteScroll" 
        class="list">
          <li v-for="item in guessRecordList" class="item">
            <p class="bet_box">
              <span class="bet_team">{{item.nickname}}</span>
              <span class="selected">{{item.selected}}</span>
              <span class="bet_glod">金币12300</span>
            </p>
            <p class="bet_time">
              <span class="month">{{item.time}}</span>
            </p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import { Indicator } from 'mint-ui'
  import { getGuessRecord } from 'api/record'
  import formatTime from '*/formatTime'
  const ERR_CODE = 0
  const RET_CODE = 0
  export default {
    data () {
      return {
        tagClass: false,
        guessMoney: 0, // 总投注金额
        homeTeam: '', // 主队
        guestTeam: '', // 客队
        matchNo: '', // 对阵编号
        guessRecordList: [], // 投注记录列表
        falg: true, // 是否进行下次请求的标志
        page1: 1 // 每次请求的page标记
      }
    },
    created () {
      // 获取对阵号
      this._getMatchMsg(this.$route.query)
      this._getGuessRecord({})
    },
    methods: {
      _InfiniteScroll () {
        // 无限滚动加载投注记录
        if (this.falg) {
          this.page1++
          this._getGuessRecord({page: this.page1, pageSize: 10})
        }
      },
      tagClassName () {
        this.tagClass = !this.tagClass
      },
      _getMatchMsg (query) {
        // 获取对阵信息
        this.homeTeam = decodeURI(query.homeTeam)
        this.guestTeam = decodeURI(query.guestTeam)
        this.matchNo = query.matchNo
      },
      _getGuessRecord ({page = 0, pageSize = 10}) {
        if (this.falg) {
          Indicator.open()
          // 单关投注记录
          getGuessRecord({
            lotyId: 'JCZQ',
            playId: 'JCDG',
            matchNo: this.matchNo,
            page: page,
            pageSize: pageSize,
            needExtInfo: 0,
            orderType: 0
          }).then(res => {
            if (res.data.errCode === ERR_CODE && res.data.retCode === RET_CODE) {
              this.guessRecordList = this.guessRecordList.concat(res.data.data.guessRecord)
              this.guessMoney = res.data.data.guessMoney
              if (res.data.data.guessRecord.length < 10) {
                this.falg = false
              }
              for (let list of this.guessRecordList) {
                list.time = formatTime(list.time)
              }
              Indicator.close()
            }
          })
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../../common/stylus/mixin.styl'
  .record
    background:#f3f3f3
    position:absolute
    width:100%
    min-height:100%
    .header
      background:#fff
      .container
        height:2rem
        display:flex
        align-items:center
        justify-content:space-between
        margin:auto 0.4rem
        font-size:0.34rem
        .team
          display:flex
          align-items:center
          .base
            display:inline-block
            width:0.69rem
            height:0.69rem
            background-size:cover
          .home_icon
            bg-image('img/home')
          .guest_icon
            bg-image('img/guest')
          .team_message
            span
              display:block
            .textAlign
              text-align:right
              margin-right:0.2rem
            .textMargin
              margin-left:0.2rem
            .team_name
              color:#333333
            .team_ranking
              margin-top:0.22rem
              color:#cbcbcb
              font-size:0.18rem
    .bet_btn
      display:flex
      align-items:center
      font-size:0.36rem
      margin:auto 1.38rem
      margin-top:0.78rem
      p
        width:2.4rem
        height:0.8rem
        line-height:0.8rem
        text-align:center
      .btn1
        background:#fff
        color:#339999
      .btn2
        background:#339999
        color:#ffffff
    .bet_record
      margin: auto 0.3rem
      margin-top:0.5rem
      font-size:0.24rem
      // .total_gold
      .bet_list
        margin-top:0.38rem
        .list
          .item
            display:flex
            justify-content:space-between
            margin-bottom:0.2rem
</style>