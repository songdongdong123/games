<template>
<transition name="slide">
  <div class="bet_cat" v-show="showMsk">
    <div class="top_title">
      <div class="container">
        <p class="empty_container" @click="emptyGame">
          <span class="emptyGAM">清空</span>
        </p>
        <p class="close_container" @click="hidebetcart">
          <span class="close"></span>
        </p>
      </div>
    </div>
    <Scroll :mach-list="machList" :show-msk="showMsk" ref="foodsWrapper" class="foodsWrapper">
      <div class="top">
        <!-- <p v-for="list in machList">{{list.homeTeam}}</p> -->
        <ul class="list">
          <li class="item" v-for="(list, index) in machList">
            <p class="base" v-for="item in list.testArr" :class="{'activeClass':item.classState}" @click="recompose(item, list, index)">
              <span>{{item.name}}</span>
              <span>{{item.title}}{{item.odds}}</span>
            </p>
            <p class="base delate_container" @click="delateGame(list, index)">
              <span class="delate_icon"></span>
            </p>
          </li>
        </ul>
      </div>
    </Scroll>
    <div class="bottom">
      <div class="container">
        <div class="choose_title">
          <p>已选{{machList.length}}场比赛</p>
        </div>
        <div class="doubleBet">
          <span
            v-show="index<machList.length-1" 
            v-for="(item, index) in doubleBetMap" 
            :class="{'doubleActive': item.state}" 
            @click="selectdoubleMode(item, index)">{{item.text}}</span>
        </div>
        <div class="bet_msg">
          <span class="note_num">共{{betNum}}种投注组合方式</span>
          <span class="note_msg">投注金币将平均分配到每种组合方式</span>
        </div>
        <div class="range">
          <mt-range v-model="rangeVal" :min="minR" :max="maxR"  @change="_changeRangeVal(rangeVal)">
          </mt-range>
        </div>
      </div>
      <div class="submit_gold">
        <div class="left">
          <span class="gold_lable">总投注</span>
          <span class="gold_num">{{rangeVal}}</span>
        </div>
        <div class="right" @click="Betting">
          <p class="btn">
            <span class="bet" >投注</span>
            <span class="back">最高返还{{bindMaxBonus}}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</transition>
</template>

<script>
  import Scroll from '../../base/scroll/scroll'
  import { emptyArr, queue, changeRangeVal, getMaxGold, formatFloat } from '*/common'
  import { submitRecord } from 'api/record'
  const ERR_CODE = 0
  const RET_CODE = 0
  export default {
    props: {
      showMsk: {
        type: Boolean,
        default: true
      },
      machList: {
        type: Array,
        default: null
      }
    },
    data () {
      return {
        doubleBetMap: [{
          text: '2串1',
          state: false,
          betNum: 2
        }, {
          text: '3串1',
          state: false,
          betNum: 3
        }, {
          text: '4串1',
          state: false,
          betNum: 4
        }, {
          text: '5串1',
          state: false,
          betNum: 5
        }, {
          text: '6串1',
          state: false,
          betNum: 6
        }],
        maxBonus: 0, // 最大中奖金币的赔率
        bindMaxBonus: 0, // 最高返还金币
        minBonus: 0, // 最小中奖金币的赔率
        binMinBonus: 0, // 最低中奖金额
        minR: 0,
        maxR: 5000,
        rangeVal: 0, // 投注总金额
        betNum: 0 // 投注方式的数量
      }
    },
    watch: {
      showMsk (newV, oldV) {
        this.initSelectBetWay(this.machList)
        this.betNum = this.combinationBetWay()
      }
    },
    methods: {
      Betting () {
        // 确认投注
        let argument = this.formatArguamnet()
        submitRecord(argument).then(res => {
          if (res.data.errCode === ERR_CODE && res.data.retCode === RET_CODE) {
            this.$toast('投注成功')
            this.hidebetcart()
            this.emptyGame()
            this.initData()
          } else {
            alert(res.data.msg)
          }
        })
      },
      initData () {
        // 初始化所有数据
        [this.maxBonus, this.bindMaxBonus, this.minBonus, this.rangeVal, this.betNum] = [
          0, 0, 0, 0, 0
        ]
      },
      formatArguamnet () {
        // 处理传送给后端的数据
        let betContent = {
          passType: this.passType(),
          matchs: this._getmatchs()
        }
        let argument = {
          lotyId: 'JCZQ',
          playId: 'JCCG',
          planType: 1,
          planUnits: this.betNum,
          unitAmount: (this.rangeVal / this.betNum),
          planAmount: this.rangeVal,
          betContent: JSON.stringify(betContent),
          minPrize: this.binMinBonus,
          maxPrize: this.bindMaxBonus
        }
        return argument
      },
      passType () {
        // 将过关方式转换成字符串例如: 2串1=>2x1
        let tempArr = this._getDoubleBetMapState()
        let str = ''
        for (let list of tempArr) {
          str += `${list}x1|`
        }
        str = str.slice(0, str.length - 1)
        return str
      },
      _changeRangeVal (rangeVal) {
        // 调整range数据
        this.rangeVal = changeRangeVal(rangeVal, this.betNum)
        // console.log(rangeVal, this.betNum)
        let unitAmount = (this.rangeVal / this.betNum)
        // console.log(unitAmount)
        this.bindMaxBonus = formatFloat(this.maxBonus * unitAmount)
        this.binMinBonus = formatFloat(this.minBonus * unitAmount)
        // console.log(this.bindMaxBonus)
      },
      _getmatchs () {
        // 获取用户选好的对阵列表
        let data = []
        for (let list of this.machList) {
          let tempStr = ''
          for (let item of list.testArr) {
            if (item.title === '主胜' && item.classState === true) {
              tempStr += '3' + ','
            } else if (item.title === '平' && item.classState === true) {
              tempStr += '1' + ','
            } else if (item.title === '客胜' && item.classState === true) {
              tempStr += '0' + ','
            }
          }
          data.push({
            braveryflag: 0,
            matchNo: list.matchNo,
            playId: 'SPF',
            selected: tempStr.slice(0, tempStr.length - 1)
          })
        }
        return data
      },
      initSelectBetWay (arr) {
        // 选择比赛后，对应默认选择过关方式
        if (arr) {
          if (arr.length > 2) {
            this.resetDoubleBetMap()
          }
          this.resetDoubleBetMap()
          switch (arr.length) {
            case 2:
              this.doubleBetMap[0].state = true
              break
            case 3:
              this.doubleBetMap[1].state = true
              break
            case 4:
              this.doubleBetMap[2].state = true
              break
            case 5:
              this.doubleBetMap[3].state = true
              break
            case 6:
              this.doubleBetMap[4].state = true
              break
            default:
              if (arr.length > 6) {
                this.doubleBetMap[4].state = true
              }
          }
        }
      },
      combinationBetWay () {
        // 计算过关方式的总数
        let countArr = this._getDoubleBetMapState() // 获取用户选择的过关方式
        let total = 0 // 计算有多少种投注方式
        let bonus = [] // 奖金数组
        // 根据用户选择的不同过关方式，进行排列组合
        for (let list of countArr) {
          let resObj = queue(this.machList, list)
          total += resObj.count
          bonus.push(resObj.goldNum)
        }
        // this._changeRangeVal(this.rangeVal)
        // 获取最大中奖金额和最小中奖金额
        let getGold = getMaxGold(bonus)
        this.maxBonus = getGold.max
        this.minBonus = getGold.min
        // 根据初始注数调整range的起步值
        this.minR = total * 100
        this.maxR += this.minR
        this.rangeVal = this.minR
        this.betNum = total
        // console.log(this.maxBonus)
        this._changeRangeVal(this.rangeVal)
        return total
      },
      _getDoubleBetMapState () {
        // 获取过关方式;也就是获取用户选择了几串几
        let count = []
        for (let list of this.doubleBetMap) {
          if (list.state === true) {
            count.push(list.betNum)
          }
        }
        return count
      },
      resetDoubleBetMap () {
        // 重置doubleBetMap中state的状态
        for (let list of this.doubleBetMap) {
          list.state = false
        }
      },
      recompose (item, game, index) {
        // 选择一场比赛中的一种结果
        item.classState = !item.classState
        // console.log(game.testArr)
        let flag = true
        for (let list of game.testArr) {
          if (list.classState) {
            flag = false
          }
        }
        if (flag) {
          this.delateGame(game, index)
        }
        this.betNum = this.combinationBetWay()
        // 如果在投注弹出出现的时候对投注选项进行了更改，要对range的值进行修改以至于不至于产生小数
        this._changeRangeVal(this.rangeVal)
      },
      selectdoubleMode (item, index) {
        // 选择过关方式
        if (this.machList.length >= index + 2) {
          item.state = !item.state
        }
        this.betNum = this.combinationBetWay()
        // 用户自定义过关方式的时候对range进行调整
        this._changeRangeVal(this.rangeVal)
      },
      emptyGame () {
        // 清空所有选择的比赛
        emptyArr(this.machList)
        this.initSelectBetWay()
        // 关闭投注组件
        this.hidebetcart()
        // 清空比赛后对数据进行重置
        this.initData()
      },
      delateGame (list, index) {
        // 取消一场比赛
        this.machList.splice(index, 1)
        for (let item of list.testArr) {
          item.classState = false
        }
        this.initSelectBetWay(this.machList)
        this.betNum = this.combinationBetWay()
        // 删除一场比赛后也要对range进行调整
        this._changeRangeVal(this.rangeVal)
      },
      hidebetcart () {
        // 收起竞猜选择框
        this.$emit('hidebetcart')
      }
    },
    components: {
      Scroll
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../../common/stylus/mixin.styl'
  .slide-enter-active,.slide-leave-active
    transition: all .5s ease-in-out
  .slide-enter
    transform: translate3d(0, 100%, 0)
  .slide-leave-to
    transform: translate3d(0, 0%, 0)
  .bet_cat
    width:100%
    background:#ffffff
    overflow:hidden
    .top_title
      height:0.8rem
      background:#339999
      font-size:0.24rem
      color:#fff
      .container
        margin:auto 0.3rem
        display:flex
        justify-content:space-between
        align-items:center
        height:100%
        .close_container
          height:0.8rem
          width:1rem
          display:flex
          justify-content:flex-end
          align-items:center
          .close
            display:inline-block
            width:0.28rem
            height:0.28rem
            background-size:cover
            bg-image('img/close')
        .empty_container
          height:0.8rem
          width:1rem
          display:flex
          justify-content:flex-start
          align-items:center
          .emptyGAM
            display:inline-block
            width:0.5rem
            height:0.28rem
            // padding:0.12rem
    .foodsWrapper
      overflow:hidden
      max-height:4.67rem
      width:100%
      .top
        background:#fff
        width:100%
        padding-top:0.13rem
        .list
          .item
            height:0.88rem
            padding: 0 0.3rem 0 0.3rem
            display:flex
            margin-bottom:0.01rem
            background:#f3f3f3
            font-size:0.24rem
            p
              flex:1
              width: 0.4rem
              span 
                display:block
                margin-top:0.1rem
                overflow: hidden;
                text-overflow:ellipsis
                white-space: nowrap
            p:nth-child(2)
              border-left:1px solid #fff
              border-right:1px solid #fff
            .base
              text-align:center
            .activeClass
              background: #339999
              color:#fff
            .delate_container
              display: flex
              justify-content: center
              align-items: center
              .delate_icon
                width:0.16rem
                height:0.16rem
                background-size:cover
                bg-image('img/delate')
    .bottom
      height:4.76rem
      bottom:0
      font-size:0.3rem
      background:#ffffff
      .container
        margin:auto 0.3rem
        .choose_title
          padding:0.3rem
          font-size:0.18rem
          color:#999999
        .doubleBet
          display:flex
          // justify-content:space-between
          span
            text-align:center
            line-height:0.56rem
            border-radius:0.1rem
            display:inline-block
            height:0.56rem
            width:1.2rem
            border:1px solid #bdbdbd
            color:#bdbdbd
            margin-right: 0.3rem
          .doubleActive
            background:#339999
            color:#fff
        .bet_msg
          display:flex
          justify-content:space-between
          align-items:center
          margin-top:0.34rem
          padding-bottom:0.2rem
          border-bottom:1px solid #f3f3f3
          height:0.25rem
          .note_num
            font-size:0.25rem
            color:#666666
          .note_msg
            font-size:0.18rem
            color:#d0d0d0
        .range
          margin-top:0.4rem
      .submit_gold
        position:absolute
        bottom:0rem
        height:0.8rem
        width:100%
        display:flex
        justify-content:space-between
        align-items:center
        .left
          margin-left:0.3rem
          display:flex
          align-items:center
          .gold_num
            font-size:0.48rem
            font-weight:bold
            margin-right:0.2rem
          .gold_lable
            font-size:0.16rem
        .right
          height:100%
          width:3rem
          text-align:center
          background:#339999
          .btn
            span
              display:block
              color:#fff
            .bet
              margin-top:0.1rem
            .back
              font-size:0.18rem
              margin-top:0.05rem
</style>
