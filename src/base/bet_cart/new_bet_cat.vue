<template>
<transition name="slide" mode="in-out">
  <div class="new_bar_car">
    <div class="title">
      <P class="balance">
        <span>金币余额：{{userInfo.gold}}</span>
      </P>
      <p class="close"  @click="hideNewBetCar">
        <span></span>
      </p>
    </div>
    <div class="bottom">
      <div class="gold_btns">
        <p
          @click="addGolds(list.id)" 
          v-for="list in goldBtns">+{{list.num}}</p>
        <p
          @click="addGolds(userInfo.gold)" 
          class="all">
          <span class="all_text">全下</span>
        </p>
      </div>
      <div class="submit">
        <div class="empty">
          <div class="empty_container">
            <p class="bet_num">
              <span class="text">投注金币</span>
              <span class="num">{{planAmount}}</span>
            </p>
            <p class="predict">
              可中{{prize}}
            </p>
            <span class="reset" @click="emptyGold"></span>
          </div>
          <div class="roues">
            <p>页面赔率仅供参考，请以实际投注赔率为准</p>
          </div>
        </div>
        <div class="submit_btn">
          <p @click="submit">确认投注</p>
        </div>
      </div>
    </div>
  </div>
</transition>
</template>
<script>
  import { mapGetters, mapMutations, mapActions } from 'vuex'
  import { formatFloat } from '*/common'
  import { submitRecord } from 'api/record'
  export default {
    data () {
      return {
        goldBtns: [{
          id: 'btn1',
          num: 100
        }, {
          id: 'btn2',
          num: 1000
        }, {
          id: 'btn3',
          num: 10000
        }],
        // 投注金币
        planAmount: 0,
        prize: 0

      }
    },
    created () {
      this.getUserInfo()
    },
    computed: {
      ...mapGetters([
        'betItem',
        'userInfo',
        'closeBetCarState',
        'emptyBetState'
      ])
    },
    watch: {
      betItem () {
        this.prize = formatFloat(this.planAmount * this.betItem.betItem.oddsVal)
        this.getUserInfo()
      },
      closeBetCarState () {
        if (this.emptyBetState) {
          this.emptyGold()
          this.setEmptyState(false)
        }
      }
    },
    methods: {
      submit () {
        // 投注
        let argument = this.getArgument()
        if (this.userInfo.gold >= argument.planAmount) {
          submitRecord(argument).then(res => {
            if (res.data.errCode === this.$ERR_CODE && res.data.retCode === this.$RET_CODE) {
              this.$toast({
                message: '投注成功',
                duration: 1000
              })
              this.emptyGold()
              this.hideBetCar(false)
            } else {
              this.$toast({
                message: res.data.msg,
                duration: 1000
              })
            }
          })
        } else {
          this.closeBetandshowError({
            falgA: false,
            falgB: true
          })
        }
      },
      allIn () {},
      getArgument () {
        // 获取投注前的参数
        let betContent = {
          passType: ['1x1'],
          matchs: [{
            matchNo: this.betItem.matchNo,
            playList: {
              [this.betItem.playId]: {
                issueNo: this.betItem.betissueNo,
                selected: {
                  [this.betItem.betItem.enName]: this.betItem.betItem.oddsVal
                }
              }
            }
          }]
        }
        let argument = {
          lotyId: 'JCZQ',
          planType: 1,
          planUnits: 1,
          unitAmount: this.planAmount,
          planAmount: this.planAmount,
          betContent: JSON.stringify(betContent),
          minPrize: 0,
          maxPrize: this.prize,
          betType: 'JCDG'
        }
        return argument
      },
      addGolds (ids) {
        if (ids === 'btn1') {
          this.planAmount += 100
        } else if (ids === 'btn2') {
          this.planAmount += 1000
        } else if (ids === 'btn3') {
          this.planAmount += 10000
        } else if (this.userInfo.gold === ids) {
          this.planAmount = this.userInfo.gold
        }
        if (this.planAmount > this.userInfo.gold) {
          this.$toast({
            message: '金币不足',
            duration: 1000
          })
        }
        this.prize = formatFloat(this.planAmount * this.betItem.betItem.oddsVal)
      },
      emptyGold () {
        // 清空投注金币
        [this.planAmount, this.prize] = [0, 0]
      },
      hideNewBetCar () {
        if (!this.planAmount) {
          this.hideBetCar(false)
        } else {
          this.showCloseBet(true)
        }
      },
      ...mapMutations({
        hideBetCar: 'SET_BET_CAR',
        showCloseBet: 'SET_CLOSE_BET_CAR',
        setEmptyState: 'SET_EMPTY_BET_STATE'
      }),
      ...mapActions([
        'getUserInfo',
        'closeBetandshowError'
      ])
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../../common/stylus/index.styl'
  .slide-enter-active,.slide-leave-active
    transition: all .5s
  .slide-enter
    // opacity:1 
    transform:translateY(3.3rem)
    // transform:scale(0.2)
  .slide-leave-to
    transform:translateY(5rem)
    // transform:scale(0)
  .new_bar_car
    position: fixed
    height:3rem
    width:100%
    // background:linear-gradient(#66cccc, #006666)
    z-index:1001
    bottom:0
  .title
    height:0.33rem
    position: relative
    .balance
      position:absolute
      min-width:2.75rem
      height:0.36rem
      transform:skew(20deg)
      font-size:0.24rem
      background:linear-gradient(#66cccc, #66cccc)
      left:-0.12rem
      line-height:0.33rem
      color:#376e6e
      span
        transform:skew(-20deg)
        display:inline-block
        padding-left:0.3rem
        padding-top:0.1rem
        padding-right: 0.2rem
    .close
      position:absolute
      right:0.3rem
      font-size:0.24rem
      color:#fff
      top:-0.13rem
      // position relative
      span
        display:inline-block
        width:0.42rem
        height:0.42rem
        background-size: cover
        bg-image('img/close')
  .bottom
    height:2.67rem
    background:linear-gradient(#66cccc, #006666)
    .gold_btns
      margin:auto 0.3rem
      padding-top:0.4rem
      display:flex
      justify-content:space-between
      p
        width:1.64rem
        height:0.77rem
        background:linear-gradient(#ffff2f, #ffcc00)
        font-size:0.36rem
        line-height:0.77rem
        text-align:center
        color:#336666
        border-radius:0.1rem
        box-shadow 0 3px 10px #636800
      .all
        line-height:0.77rem
    .submit
      margin:auto 0.3rem
      margin-top:0.28rem
      height:1rem
      display:flex
      justify-content:space-between
      align-items: center
      .empty
        width:4.5rem
        // margin:0.2rem auto
        .empty_container
          background:#015353
          border-radius:0.33rem
          display:flex
          height:0.66rem
          justify-content:space-between
          align-items: center
          .bet_num
            font-size:0.24rem
            color:#fff
            padding-left:0.1rem
            .num
              font-size:0.36rem
              color:#ffff00
          .predict
            font-size:0.24rem
            color:#339999
          .reset
            display:inline-block
            width:0.4rem
            height:0.4rem
            background-size: cover
            bg-image('img/empty')
            margin-right:0.1rem
        .roues
          font-size:0.14rem
          color:#339999
          text-align:right
          margin-top:0.1rem
          padding-right:0.2rem
      .submit_btn
        width:2.23rem
        height:1rem
        background:linear-gradient(#bb5d00, #fdd100)
        border-radius:0.1rem
        p
          font-size:0.36rem
          line-height:1rem
          text-align: center
          color:#f9f7c4
</style>

