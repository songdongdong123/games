<template>
<transition name="slide">
  <div class="guess">
    <div class="bet_record" 
     :class="{'bet_record_active':showBox}"
    >
     <!-- 
      v-on:touchmove="MoveS"
      v-on:touchstart="MoveE" -->
      <div class="top_contain">
        <div class="top_title">
          <div class="top_container">
            <div class="top_containers">
              <mt-swipe :auto="0"  @change="handleChange" :show-indicators="false">
                <mt-swipe-item>
                  <!-- 统计 -->
                  <div class="tab_one">
                    <ul class="tab_list">
                      <li class="tab_item" v-for="item in eventList">
                        <p class="left">
                          <span class="left_num">10</span>
                          <span class="left_pillar" :style="{'width':item + 'rem'}"></span>
                        </p>
                        <p class="center">
                          test
                        </p>
                        <p class="right">
                          <span class="right_pillar" :style="{'width':item + 'rem'}"></span>
                          <span class="right_num">10</span>
                        </p>
                      </li>
                    </ul>
                  </div>
                </mt-swipe-item>
                <mt-swipe-item>
                  <!-- 事件 -->
                  <div class="tab_two">
                    <ul class="tab_list">
                      <li class="tab_item" v-for="item in eventList">
                        <div class="topE">
                          <p class="left">
                          <span class="left_num">球员名称</span>
                          <span class="left_icon">icon</span>
                          </p>
                          <p class="center">
                            test
                          </p>
                          <p class="right">
                            <span class="right_num">icon</span>
                            <span class="right_icon">球员名称</span>
                          </p>
                        </div>
                      </li>
                    </ul>
                    <div class="bottomE">
                      <p class="icon_container">
                        <span class="base icon1"></span>
                        <span class="base_text">进球</span>
                      </p>
                      <p class="icon_container">
                        <span class="base icon2"></span>
                        <span class="base_text">点球</span>
                      </p>
                      <p class="icon_container">
                        <span class="base icon3"></span>
                        <span class="base_text">无效</span>
                      </p>
                      <p class="icon_container">
                        <span class="base icon4"></span>
                        <span class="base_text">角球</span>
                      </p>
                      <p class="icon_container">
                        <span class="base icon5"></span>
                        <span class="base_text">换人</span>
                      </p>
                      <p class="icon_container">
                        <span class="base icon6"></span>
                        <span class="base_text">红牌</span>
                      </p>
                      <p class="icon_container">
                        <span class="base icon7"></span>
                        <span class="base_text">黄牌</span>
                      </p>
                    </div>
                  </div>
                </mt-swipe-item>
                <mt-swipe-item>
                  暂无数据
                </mt-swipe-item>
                <mt-swipe-item>
                  暂无数据
                </mt-swipe-item>
              </mt-swipe>
            </div>
          </div>
        </div>
      </div>
      <div class="arrows" @click="pack_up" v-on:touchmove="MoveS"
      v-on:touchstart="MoveE">
        <span class="icon-doubleangleup"></span>
      </div>
    </div>
    <div class="hideBox" 
      :class="{'active': showBox}" 
      v-on:touchmove="MoveS" 
      v-on:touchstart="MoveE">
      <div class="time" :class="{'time_active':showBox}">
        <p>10月21日 15:00</p>
      </div>
      <div class="football_team">
        <div class="left">
          <img src="./img/zhu@3x.png" alt="" :class="{'changeFont':showBox}">
          <p class="item_name" :class="{'changeFont':showBox}">{{homeTeam}}</p>
        </div>
        <div class="center">
          <p class="vs">VS</p>
          <p class="part" v-show="!showBox">西甲小组赛第6轮</p>
        </div>
        <div class="right">
          <p class="item_name" :class="{'changeFont':showBox}">{{guestTeam}}</p>
          <img  src="./img/ke@3x.png" alt=""  :class="{'changeFont':showBox}">
        </div>
      </div>
      <div class="icon_gropes">
        <p>
          <span class="base1" 
          :class="{'icon1':showBox, 'icon1_active': currentIndex === 0&&showBox}"></span>
          <span class="base_text" 
          :class="{'text_active1':showBox,'text_active11':currentIndex === 0&&showBox}">统计</span>
        </p>
        <p>
          <span class="base2" 
          :class="{'icon2':showBox,'icon2_active': currentIndex === 1&&showBox}"></span>
          <span class="base_text"  
          :class="{'text_active2':showBox,'text_active22':currentIndex === 1&&showBox}">事件</span>
        </p>
        <p>
          <span class="base3" 
          :class="{'icon3':showBox,'icon3_active': currentIndex === 2&&showBox}"></span>
          <span class="base_text" 
          :class="{'text_active3':showBox,'text_active33':currentIndex === 2&&showBox}">视频</span>
        </p>
        <p>
          <span class="base4" 
          :class="{'icon4':showBox,'icon4_active': currentIndex === 3&&showBox}"></span>
          <span class="base_text" 
          :class="{'text_active4':showBox,'text_active44':currentIndex === 3&&showBox}">阵容</span>
        </p>
      </div>
    </div>
    <div class="header">
      <div class="swiper_container">
        <mt-swipe :auto="0" class="swipebox" :defaultIndex="1">
          <mt-swipe-item>
            <!-- 图表一 -->
            <!-- <gline2></gline2> -->
            <div class="table_one">
              <div class="base support_home">
                <span class="title">皇马</span>
                <span class="range_base range_home" :style="{'width':rangeData1}"></span>
                <span class="triangle tg1"></span>
                <p class="people_support">
                  <span class="add_num">+10</span>
                  <span>{{guessHomeA}}支持</span>
                </p>
                <!-- <p></p> -->
              </div>
              <div class="base deuce">
                <span class="title">平</span>
                <span class="range_base range_deuce" :style="{'width':rangeData2}"></span>
                <span class="triangle tg2"></span>
                <p class="people_support">
                  <span class="add_num">+10</span>
                  <span>{{GuessDogfall}}支持</span>
                </p>
              </div>
              <div class="base support_away">
                <span class="title">巴萨</span>
                <span class="range_base range_away" :style="{'width':rangeData3}"></span>
                <span class="triangle tg3"></span>
                <p class="people_support">
                  <span class="add_num">+10</span>
                  <span>{{guessGustB}}支持</span>
                </p>
              </div>
            </div>
          </mt-swipe-item>
          <mt-swipe-item>
            <!-- 图标2 -->
            <div class="canvas_container">
              <span class="canvas_top">皇马</span>
              <canvas class="canvas" ref="canvas1" width="500px" height="260px"></canvas>
              <span class="canvas_bottom">巴萨</span>
            </div>
            <!-- <gline></gline> -->
          </mt-swipe-item>
          <mt-swipe-item>
            <!-- 图标2 -->
            <div class="canvas_container2">
              <span class="canvas_top">皇马</span>
              <canvas class="canvas" ref="canvas2" width="450px" height="260px"></canvas>
              <span class="canvas_bottom">巴萨</span>
            </div>
            <!-- <gline></gline> -->
          </mt-swipe-item>
        </mt-swipe>
      </div>
      <div class="partition">
        <div class="partition_box">
          <p class="bet_text">竞猜</p>
          <p class="bet_num" @click="toRecord">该场已投注金币：{{guessMoney}}万<span class="leftarr"></span></p>
        </div>
      </div>
      <div class="odds">
        <div class="odds_box">
          <p class="odds_left">全场赛果</p>
          <p class="odds_right">上半场比赛总进球数大小</p>
        </div>
      </div>
      <div class="res_btn">
        <div class="res_btn_box">
          <p class="won" :class="{'choose_active':choose1}" @click="chooseThis1">
            <span class="home_won">主胜</span>
            <span class="num">{{SPF[0]}}</span>
          </p>
          <p class="flat" :class="{'choose_active':choose2}" @click="chooseThis2">
            <span class="home_ping">平</span>
            <span class="num">{{SPF[1]}}</span>
          </p>
          <p class="lost" :class="{'choose_active':choose3}" @click="chooseThis3">
            <span class="home_lose" >主负</span>
            <span class="num">{{SPF[2]}}</span>
          </p>
        </div>
      </div>
      <div class="renge">
        <mt-range v-model="rangeVal" :max="50000" @change="toMax">
        </mt-range>
        <div class="range_text">
          <span class="gold_1">2000金币</span>
          <span class="gold_2">1万金币</span>
          <span class="gold_3">2万金币</span>
          <span class="gold_4">5万金币</span>
          <span class="gold_5">全部</span>
        </div>
      </div>
    </div>
    <div class="footer">
      <p class="footer_left">
        <span class="gold_tex">总投注金币</span>
        <span class="gold_num">{{rangeVal}}</span>
      </p>
      <p class="footer_right" @click="_submitRecord">
        <span>投注</span>
        <span class="smallTex">最高返还{{bindMaxBonus}}</span>
      </p>
    </div>
  </div>
  </transition>
</template>

<script>
  import { drawBorder } from '../../common/js/canvas'
  import { drawBorderS } from '../../common/js/canvas2'
  import { submitRecord, getGuessStatistic } from 'api/record'
  import { getArrMax, getArrMin, formatFloat } from '*/common'
  const ERR_CODE = 0
  const RET_CODE = 0
  export default {
    data () {
      return {
        goods: [],
        eventList: [0.4, 1, 0.4, 0.8, 0.2, 0.6, 1, 0.5, 1, 2],
        showBox: false,
        rangeVal: 0,
        hideThis1: false,
        showThisTab: false,
        maxVal: 50000,
        currentIndex: 0,
        rangeData1: '3.5rem',
        rangeData2: '3rem',
        rangeData3: '2rem',
        choose1: true,
        choose2: false,
        choose3: false,
        SPF: [], // 胜平负概率
        homeTeam: '', // 主队
        bindMaxBonus: 0, // 最高返还金币
        guestTeam: '', // 客队
        guessHomeA: 0, // 主队竞猜人数统计
        guessGustB: 0,
        GuessDogfall: 0,
        guessMoney: 0, // 单场比赛投注总金额统计
        guessPeople: 0, // 单场比赛投注总人数
        matchNo: '' // 对阵编号
      }
    },
    mounted () {
      this.initCancasStyle()
      this.initCanvas()
      this._getGuessStatistic()
    },
    created () {
      this._getMatchMsg(this.$route.query)
    },
    methods: {
      _getGuessStatistic () {
        // 获取单关投注页面数据统计信息
        getGuessStatistic({
          lotyId: 'JCZQ',
          playId: 'JCDG',
          matchNo: this.matchNo,
          needExtInfo: 1,
          orderType: 0
        }).then(res => {
          if (res.data.errCode === ERR_CODE && res.data.retCode === RET_CODE) {
            this.guessPeopleA = res.data.data.guessType
            if (this.guessPeopleA.length) {
              this.guessHomeA = this.guessPeopleA[0].guessNum
              this.GuessDogfall = this.guessPeopleA[1].guessNum
              this.guessGustB = this.guessPeopleA[2].guessNum
              this.guessMoney = res.data.data.guessMoney
            }
          }
        })
      },
      _getMatchMsg (query) {
        // 获取对阵信息
        this.homeTeam = decodeURI(query.homeTeam)
        this.guestTeam = decodeURI(query.guestTeam)
        this.matchNo = query.matchNo
        this.SPF = query.fixedOdds.split(',')
      },
      countPlanNum () {
        // 统计投注注数
        let tempArr = [this.choose1, this.choose2, this.choose3]
        let selectedArr = ['3', '1', '0']
        let selectedStr = ''
        let spfArr = []
        let count = 0
        for (let i = 0; i < tempArr.length; i++) {
          if (tempArr[i]) {
            count++
            selectedStr += selectedArr[i] + ','
            spfArr.push(this.SPF[i])
          }
        }
        return {
          count: count,
          selectedStr: selectedStr.slice(0, selectedStr.length - 1),
          max: getArrMax(spfArr),
          min: getArrMin(spfArr)
        }
      },
      unitAmountTest () {
        // 每注投注数量检验
        let count = this.countPlanNum().count
        if (count === 1) {
          if (this.rangeVal < 100) {
            return {
              betState: false,
              msg: '单注不少于100金币'
            }
          } else {
            return {
              betState: true
            }
          }
        } else if (count === 2) {
          if (this.rangeVal < 200) {
            return {
              betState: false,
              msg: '两注，每注不少于200金币'
            }
          } else {
            return {
              betState: true
            }
          }
        } else if (count === 3) {
          if (this.rangeVal < 300) {
            return {
              betState: false,
              msg: '三注，每注不少于300金币'
            }
          } else {
            return {
              betState: true
            }
          }
        } else if (count === 0) {
          return {
            betState: false,
            msg: '请至少选择一注投注'
          }
        } else {
          return {
            betState: true
          }
        }
      },
      _submitRecord () {
        let countPlanNumObj = this.countPlanNum()
        let planUnits = countPlanNumObj.count
        let unitAmount = Math.ceil(this.rangeVal / countPlanNumObj.count)
        let flag = this.unitAmountTest().betState
        let min = formatFloat(countPlanNumObj.min * unitAmount)
        let betContent = {
          passType: '1x1',
          matchs: [{
            braveryflag: 0,
            matchNo: this.matchNo,
            playId: 'SPF',
            selected: this.countPlanNum().selectedStr
          }]
        }
        // 投注提交
        if (flag) {
          submitRecord({
            lotyId: 'JCZQ',
            playId: 'JCDG',
            planType: 1,
            planUnits: planUnits,
            unitAmount: unitAmount,
            issueId: '',
            planAmount: this.rangeVal,
            betContent: JSON.stringify(betContent),
            minPrize: min,
            maxPrize: this.bindMaxBonus
          }).then(res => {
            if (res.data.errCode === ERR_CODE && res.data.retCode === RET_CODE) {
              this.$toast('投注成功')
              // this.$router.push('/football_detail')
            }
          })
        } else {
          this.$toast(this.unitAmountTest().msg)
        }
      },
      toRecord () {
        // 进入单关竞猜投注记录详情页面
        this.$router.push({path: '/record',
          query: {
            homeTeam: encodeURI(this.homeTeam),
            guestTeam: encodeURI(this.guestTeam),
            matchNo: this.matchNo
          }})
      },
      handleChange (index) {
        this.currentIndex = index
      },
      pack_up () {
        // 收起下拉框
        this.showBox = false
      },
      chooseThis1 () {
        // 选择主场胜利
        this.choose1 = !this.choose1
        this.toMax(this.rangeVal)
      },
      chooseThis2 () {
        // 选择主场胜利
        this.choose2 = !this.choose2
        this.toMax(this.rangeVal)
      },
      chooseThis3 () {
        // 选择主场胜利
        this.choose3 = !this.choose3
        this.toMax(this.rangeVal)
      },
      getClientWidth () {
        return document.documentElement.clientWidth
      },
      initCancasStyle () {
        // 重新设置canvas的宽高，来解决绘制模糊的问题
        let W = Math.round((this.getClientWidth() / 375) * 100) / 100
        // console.log(Math.round(X * 100) / 100)
        this.$refs.canvas1.style.width = W * 300 + 'px'
        this.$refs.canvas1.style.height = W * 130 + 'px'
        this.$refs.canvas2.style.width = W * 300 + 'px'
        this.$refs.canvas2.style.height = W * 130 + 'px'
      },
      initCanvas () {
        let W = Math.round((this.getClientWidth() / 375) * 100) / 100
        // 初始化canvas
        let Canvas1 = this.$refs.canvas1
        let Canvas2 = this.$refs.canvas2
        drawBorder(Canvas1, W) // 绘制近十场胜负图
        drawBorderS(Canvas2, W) // 绘制积分排名走势
      },
      toMax (rangeVal) {
        // 根据注数调整rangeVal的值使之总能被注数整除
        this.changeRangeVal(rangeVal)
        let countPlanNumObj = this.countPlanNum()
        if (countPlanNumObj.count) {
          let unitAmount = Math.ceil(this.rangeVal / countPlanNumObj.count)
          this.bindMaxBonus = formatFloat(countPlanNumObj.max * unitAmount)
        }
      },
      changeRangeVal (rangeVal) {
        // 根据注数调整rangeVal的取值
        let ticketCount = this.countPlanNum().count
        if (ticketCount) {
          let betMod = rangeVal % ticketCount
          // console.log(rangeVal, betMod, ticketCount)
          if (betMod !== 0) {
            if ((ticketCount - betMod) >= betMod) {
              rangeVal = rangeVal - betMod
            } else {
              rangeVal = rangeVal + (ticketCount - betMod)
            }
          }
          this.rangeVal = rangeVal
        }
      },
      showHideBox () {
        this.showBox = true
      },
      MoveS (e) {
        let x = e.touches[0].pageY
        let diffY = x - this.startY
        if (diffY > 0) {
          // console.log('下滑')
          this.showBox = true
        } else {
          // console.log('上滑')
          this.showBox = false
        }
      },
      MoveE (e) {
        e.preventDefault()
        this.startY = e.touches[0].pageY
      }
    },
    components: {}
  }
</script>
<style>
  .mint-swipe-indicator.is-active{
    border:1px solid #333;
    border-radius:100%
  }
  .mint-swipe-indicator{
    border-color: transparent;
    border:1px solid #333;
  }
</style>

<style lang="stylus" scoped>
  @import '../../common/stylus/index.styl'
  .slide-enter-active,.slide-leave-active
    transition: all 0.3s
  .slide-enter,.slide-leave-to
    // z-index:1000
    transform: translateX(100%)
  // .guess .mint-swipe-items-wrap > div
  //   //解决swipe导致echart无法获取高度的问题 
  //   display:block
 @keyframes mymove{
    from {
      bottom:0
    }
    to {
      bottom:.3rem
    }
  }
  .guess
    position:relative
    height:100vh
    overflow-x: hidden
  .bet_record
    width:100%
    height:100%
    background:#fff
    position:absolute
    transform:translateY(-9.74rem)
    z-index:101
    transition:all 0.5s
    .arrows
      position:fixed
      bottom:0.1rem
      width:100%
      // margin:auto 0.2rem
      animation:mymove 1s infinite ease
      text-align:center
      .icon-doubleangleup
        font-family:'iconfont'
        color:#999
        font-size:0.4rem
        
    .top_contain
      // background:#339999
      margin-top:2.86rem
      background:#fff
      font-size:0.36rem
      color:#ffffff
      height:6.62rem
      .top_container
        height:6rem
        width:100%
        padding-top:0.3rem
        .top_containers
          // margin:auto 0.2rem
          padding-left:0.2rem
          padding-right:0.2rem
          margin-top:1rem
          color:red
          height:7.6rem
          background:#fff
          overflow-y:auto
          .tab_one
            .tab_list
              .tab_item
                display:flex
                font-size:0.3rem
                color:#333
                margin-bottom:0.1rem
                align-items:center
                // justify-content space-around
                .left
                  width:2.9rem
                  display: flex
                  justify-content: flex-end
                  align-items:center
                  font-size:0.17rem
                  .left_pillar
                    display:inline-block
                    width:1.2rem
                    height:0.17rem
                    background:#339999
                  .left_num
                    margin-right:0.1rem
                .center
                  width:1.3rem
                  height:0.42rem
                  background:#f3f3f3
                  text-align:center
                .right
                  width:2.9rem
                  display: flex
                  justify-content: flex-start
                  align-items:center
                  font-size:0.17rem
                  .right_pillar
                    display:inline-block
                    width:1.2rem
                    height:0.17rem
                    background:#ff6600
                  .right_num
                    margin-left:0.1rem
          .tab_two
            .tab_list
              .tab_item
                .topE
                  display:flex
                  font-size:0.3rem
                  color:#333
                  margin-bottom:0.1rem
                  align-items:center
                  .left
                    width:2.9rem
                    display: flex
                    justify-content: flex-end
                    align-items:center
                    font-size:0.17rem
                    .left_num
                      margin-right:0.1rem
                    .left_icon
                      margin-right:0.1rem
                  .center
                    width:1.3rem
                    height:0.42rem
                    background:#f3f3f3
                    text-align:center
                  .right
                    width:2.9rem
                    display: flex
                    justify-content: flex-start
                    align-items:center
                    font-size:0.17rem
                    .right_num
                      margin-left:0.1rem
                    .right_icon
                      margin-left:0.1rem
          .bottomE
            display:flex
            justify-content:space-between
            align-items:center
            margin-top:0.8rem
            // height:0.7rem
            color:#7f7f7f
            .icon_container
              width:1rem
              display:flex
              justify-content:space-between
              align-items:center
              position:relative
              // height:100%
              span
                display:block
              .base_text
                margin-left:0.5rem
                font-size:0.2rem
                margin-top:0.1rem
              .base
                display:inline-block
                background-size:contain
                width:0.35rem
                height:0.35rem
              .icon1
                bg-image('./img/fullin')
              .icon2
                bg-image('./img/dianqiu')
              .icon3
                bg-image('./img/noball')
              .icon4
                bg-image('./img/angleball')
              .icon5
                bg-image('./img/changemen')
              .icon6
                bg-image('./img/red')
              .icon7
                bg-image('./img/yellow')
          .base
            position:absolute
            background:#fff
            height:4.15rem
          .showThis
            z-index:100
        .event_list
          margin:auto 1.7rem
          .event_item
            display:flex
            justify-content:space-between
            align-items:center
            height:0.4rem
            margin-bottom:0.15rem
            span
              display:inline-block
              font-size:0.18rem
            .event_time
              height:100%
              text-align:center
              width:1.31rem
              background:#f3f3f3
              color:#333333
            .player_name
              color:#959595
  .bet_record_active
    transform:translateY(0)
  .hideBox
    width:100%
    height:3.6rem
    background:#fff
    // background:green
    bg-image('./img/bg')
    // background:url('./img/bg.png')
    position:absolute
    background-size:cover
    transform:translateY(0rem)
    transition: all 1s
    z-index:200
    .time
      margin-top:0.5rem
      font-size:0.25rem
      color:#fff
      text-align:center
      transition: all 1s
    .time_active
      // position:absolute
      transform:translateY(-2rem)
    .football_team
      display:flex
      justify-content:space-between
      height:0.73rem
      align-items:center
      margin:auto 0.28rem
      margin-top:0.3rem
      img
        width:0.7rem
        height:0.7rem
        transition:all 0.5s
      .left
        display:flex
        align-items:center
        .item_name
          margin-left:0.23rem
          font-size:0.4rem
          color:#fff
          transition:all 0.5s ease
        .changeFont
          transform:scale(0.7) 
      .center
        text-align:center
        color:#cccccc
        .vs
          font-size:0.35rem
        .part
          font-size:0.17rem
      .right
        display:flex
        align-items:center
        .item_name
          margin-right:0.23rem
          font-size:0.4rem
          color:#fff
          transition:all 0.5s ease
        .changeFont
          transform:scale(0.7)
    .icon_gropes
      display:flex
      justify-content:space-between
      position:relative
      margin:auto 2.93rem
      margin-top:0.9rem
      p
        span 
          font-size:0.3rem
          color:red
          position:absolute
          transition:all .5s
          top:0
          left:0
          display:inline-block
        .base1
          // display:inline-block
          left:-0.3rem
          width:0.35rem
          height:0.35rem
          bg-image('img/data')
          background-size:contain
        .base2
          left:0.4rem
          width:0.35rem
          height:0.35rem
          bg-image('img/time')
          background-size:cover
        .base3
          left:1.1rem
          width:0.37rem
          height:0.33rem
          bg-image('img/video')
          background-size:cover
        .base4
          left:1.8rem
          width:0.35rem
          height:0.35rem
          bg-image('img/zhenrong')
          background-size:cover
        .base_text
          top:0
          left:0
          opacity:0
          display: inline-block
          width: 1rem
          color:#999
        .base_text_active
          color:#339999
        .icon1
          top:1.2rem
          left:-1.75rem
          bg-image('img/gdata')
        .icon1_active
          bg-image('img/adata')
        .text_active1
          top:1.25rem
          left:-1.25rem
          opacity:1
        .text_active11
          color:#339999
        .icon2
          top:1.2rem
          left:-0.28rem
          bg-image('img/gtime')
        .icon2_active
          bg-image('img/atime')
        .text_active2
          top:1.25rem
          left:0.2rem
          opacity:1
        .text_active22
          color:#339999
        .icon3
          top:1.2rem
          left:1.2rem
          bg-image('img/gvideo')
        .icon3_active
          bg-image('img/avideo')
        .text_active3
          top:1.25rem
          left:1.65rem
          opacity:1
        .text_active33
          color:#339999
        .icon4
          top:1.2rem
          left:2.65rem
          bg-image('img/gzhenr')
        .icon4_active
          bg-image('img/azhenr')
        .text_active4
          top:1.25rem
          left:3.15rem
          opacity:1
        .text_active44
          color:#339999
  .active
    transform:translateY(-0.74rem)
    // background:pink
  .header
    position:relative
    padding-top:3.9rem
    .swiper_container
      margin:auto 0.1rem
      // margin-top:0.3rem
      .swipebox
        width:100%
        height:3.32rem
        .table_one
          font-size:0.25rem
          .base
            height:0.6rem
            margin-bottom:0.22rem
            position:relative
            display:flex
            align-items:center
            .title
              display:inline-block
              text-align:right
              width:0.6rem
            .range_base
              display:inline-block
              background:#ff6633
              height:0.6rem
              margin-left:0.2rem
            .range_home
              background:#ff6633
            .range_deuce
              background:#999999
            .range_away
              background:#3399cc
            .triangle
              display:inline-block
              width: 0
              height: 0
              border-top: 0.309rem solid transparent
              border-bottom: 0.315rem solid transparent
            .tg1
              border-left: 0.31rem solid #ff6633
            .tg2
              border-left: 0.31rem solid #999999
              // margin-top:0.006rem
              border-bottom: 0.31rem solid transparent
            .tg3
              border-left: 0.31rem solid #3399cc
            .people_support
              font-size:0.18rem
              position:absolute
              right:0
              height:100%
              span
                display:block
              .add_num
                margin-bottom:0.2rem
        .canvas_container
          margin:auto 0.2rem
          .canvas
            margin-left:0.58rem
          span
            font-size:0.2rem
            position:absolute
            display:block
          .canvas_top
            top:0
            // z-index:200
          .canvas_bottom
            bottom:0.72rem
        .canvas_container2
          margin:auto 0.2rem
          display:flex
          .canvas
            margin-left:0.6rem
          span
            font-size:0.2rem
            position:absolute
          .canvas_top
            top:0
            // z-index:200
          .canvas_bottom
            right:0
            // bottom:0.72rem

    .partition
      background:#f3f3f3
      font-size:0.2rem
      height:0.65rem
      .partition_box
        display:flex
        justify-content:space-between
        // align-items:center
        margin-right:0.3rem
        .bet_text
          margin-top:0.15rem
          padding:0.12rem 0.4rem 0.2rem 0.4rem
          background:#fff
          border-radius:0 0.15rem 0 0
        .bet_num
          padding-top:0.2rem
          .leftarr
            display:inline-block
            width:0.1rem
            height:0.18rem
            background-size:cover
            bg-image('img/leftarr')
            margin-left:0.1rem
    .odds
      .odds_box
        height:0.73rem
        display:flex
        justify-content:space-between
        align-items:center
        margin:auto 0.3rem
        .odds_left
          font-size:0.22rem
        .odds_right
          font-size:0.2rem
          color:#919191
    .res_btn
        height:1.2rem
        display:flex
        align-items:center
        border-bottom:1px solid #f3f3f3
        background:#fff
      .res_btn_box
        height:0.8rem
        display:flex
        align-items:center
        // justify-content:center
        margin:auto 1.1rem
        font-size:0.32rem
        color:#999999
        border:1px solid #999999
        border-radius:0.2rem
        width:100%
        p
          flex:1
          width:1.63rem
          text-align:center
          height:100%
          span
            display:block
        .won
          border-radius:0.15rem 0 0 0.15rem
          .home_won
            margin-top:0.1rem
          .num
            font-size:0.2rem
        .lost
          border-radius:0 0.15rem 0.15rem 0
          .home_lose
            margin-top:0.1rem
          .num
            font-size:0.2rem
        .flat
          border-left:1px solid #999999
          border-right:1px solid #999999
          .home_ping
            margin-top:0.1rem
          .num
            font-size:0.2rem
        .choose_active
          background:#339999
          color:#fff
    .renge
      margin:auto 0.5rem
      margin-top:0.2rem
      .range_text
        font-size:0.18rem
        color:#7f7f7f
        .gold_2
          margin-left:0.3rem
        .gold_3
          margin-left:0.6rem
        .gold_4
          margin-left:1.4rem
        .gold_5
          float:right
  .footer
    z-index:100
    position:absolute
    width:100%
    display:flex
    height:0.8rem
    bottom:0
    font-size:0.3rem
    .footer_left
      width:4.52rem
      padding-left:0.32rem
      line-height:0.8rem
      .gold_num
        font-size:0.4rem
      .gold_tex
        font-size:0.2rem
        color:#6b6b6b
    .footer_right
      width:2.98rem
      text-align:center
      color:#f6f9f9
      background:#339999
      // line-height:0.8rem
      span
        display:block
        margin-top:0.1rem
      .smallTex
        font-size:0.2rem
</style>
