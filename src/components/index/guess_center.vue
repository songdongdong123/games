<template>
  <div class="guess_center">
    <div class="testBd"></div>
     <signModl
        :sign-in-days="signInDays"
      ></signModl>
      <signSuccess></signSuccess>
    <div class="mask" v-show="signState"></div>
    <div class="fixed_top">
      <div class="userInfo">
        <div class="left">
          <img v-show="userImg" :src="userImg" alt="">
          <span>{{userName}}</span>
        </div>
        <div class="right">
          <div class="gold" @click="toPayPage(1)">
            <span class="gold_icon"></span>
            <span class="nums">{{userGold}}</span>
            <span class="pay">+</span>
          </div>
          <div class="diamond" @click="toPayPage(2)">
            <span class="diamond_icon"></span>
            <span class="nums">{{userDiamond}}</span>
            <span class="pay">+</span>
          </div>
        </div>
      </div>
      <div class="menu_wrapper" ref="classify">
        <ul ref="classify_list">
          <li
            :class="{'menu_item_active': index === currentIndex}" 
            class="menu_item"
            ref="menu_item"
            v-for="(list, index) of channelList" 
            @click="select(index, $event)">
            <p class="p1">{{list.strChannelName}}</p>
            <p class="p2">{{list.dwChannelMatchNum}}</p>
            </li>
        </ul>
        <div class="allTags" @click="showChoose">
          <span class="more_icon"></span>
        </div>
      </div>
      <!-- <div class="news">
        <span class="inform_icon"></span>
        <span class="chuan">串关</span>
      </div> -->
    </div>
    <div class="match_container">
      <ul class="match_list">
        <li class="match_item"
          @click="toMatchDetail(list.matchNo)"
          v-for="list in matchList">
          <span class="item_bg" v-show="list.isStart"></span>
          <div class="match_title">
            <p class="title_text" >{{list.leagueName}}</p>
            <p class="star_container" @click.stop="concernMatch(list)">
              <span class="star_icon" :class="{'star_active': list.isCollect}"></span>
            </p>
          </div>
          <div class="match_team"  >
            <p class="home_team">{{list.homeTeam}}</p>
            <div class="match_res">
              <div class="match_state1" v-if="list.isStart">
                <p class="score">1</p>
                <p class="matching">比赛中</p>
                <p class="score">2</p>
              </div>
              <div class="match_state2" v-else-if="list.isHot">
                <p class="hot_icon"></p>
                <p class="time">{{list.matchTime}}</p>
              </div>
              <div class="match_state3" v-else>
                <p class="vs">VS</p>
                <p class="time">{{list.matchTime}}</p>
              </div>
            </div>
            <!-- div. -->
            <p class="guest_team">{{list.guestTeam}}</p>
          </div>
          <div class="bet_peoples">
            <p class="bet_num">{{list.guessPeople}}人参与竞猜</p>
          </div>
        </li>
      </ul>
    </div>
    <!-- <keep-alive><keep-alive>
      <chooseClass></chooseClass>
    </keep-alive> -->
    <!-- <chooseClass></chooseClass> -->
  </div>
</template>

<script>
  import signModl from '@/base/sign_model/sign_model'
  import signSuccess from '@/base/sign_success/sign_success'
  import BScroll from 'better-scroll'
  import { Indicator } from 'mint-ui'
  import { formatFloat } from '*/common'
  import formatTime from '*/formatTime'
  import { getQueryMatchList, favoriteMatch } from 'api/matchlist'
  import { getSignIn } from 'api/signin'
  import { getSimpleUserInfo } from 'api/userinfo'
  import chooseClass from '@/components/choose_class/choose_class'
  import { mapGetters, mapMutations } from 'vuex'
  import { scrollToTop } from '*/native'
  export default {
    data () {
      return {
        matchList: [],
        allMatchList: [],
        currentIndex: 1,
        userImg: '',
        userGold: 0,
        userDiamond: 0,
        userName: '',
        channelList: [],
        showToast: false,
        signInDays: 0 // 签到的天数
      }
    },
    created () {
      this.$nextTick(() => {
        this._getSignIn()
        this._getUserInfo()
        this._getMatchList()
      })
      // window.location.reload()
    },
    watch: {
      signState () {
        this._getUserInfo()
      }
    },
    computed: {
      ...mapGetters([
        'showSignModel',
        'chooseClaState',
        'userInfo',
        'guessCenterIndex',
        'signState'
      ])
    },
    methods: {
      _getUserInfo () {
        // 获取用户简要信息
        Indicator.open()
        getSimpleUserInfo({}).then(res => {
          if (res.data.errCode === this.$ERR_CODE && res.data.retCode === this.$RET_CODE) {
            [
              this.userImg,
              this.userGold,
              this.userDiamond,
              this.userName] = [
                res.data.data.picture,
                formatFloat(res.data.data.gold),
                formatFloat(res.data.data.diamond),
                res.data.data.nickname
              ]
            this.setUserInfo(res.data.data)
            Indicator.close()
          }
        })
      },
      _getSignIn () {
        // 获取签到信息
        getSignIn({}).then(res => {
          if (res.data.errCode === this.$ERR_CODE && res.data.retCode === this.$RET_CODE) {
            this.signInDays = res.data.data.signInDays
            if (res.data.data.isCurrDaySign !== 1) {
              this.hideSignModel(true)
            } else {
              this.setcurrentday(1)
            }
          }
        })
      },
      _getMatchList () {
        // 打开loading
        Indicator.open()
        // 获取赛事列表
        getQueryMatchList({
          lotyId: 'JCZQ',
          betType: 'JCDG'
        }).then(res => {
          if (res.data.errCode === this.$ERR_CODE && res.data.retCode === this.$RET_CODE) {
            // 关闭loading
            Indicator.close()
            this.channelList = res.data.data.channelList
            this.allMatchList = this.grouping(this.channelList, res.data.data.matchList)
            this.matchList = this.allMatchList[1].arr
            this.$nextTick(() => {
              this._initScroll()
              this.select(this.guessCenterIndex)
              scrollToTop()
            })
          }
        })
      },
      grouping (channelList, matchList) {
        // 赛事列表分组
        // let listArr = []
        let temp = [].concat(channelList)
        // console.log(temp)
        for (let list of temp) {
          list.arr = []
          for (let item of matchList) {
            item.guestTeam = item.guestTeam.slice(0, 5)
            item.homeTeam = item.homeTeam.slice(0, 5)
            item.matchTime = formatTime(item.matchTime)
            if (item.leagueName === list.strChannelName) {
              list.arr.push(item)
            } else if (list.strChannelName === '比赛中' && item.isStart) {
              list.arr.push(item)
            } else if (list.strChannelName === '热门' && item.isHot) {
              list.arr.push(item)
            } else if (list.strChannelName === '关注' && item.isCollect) {
              list.arr.push(item)
            } else if (list.strChannelName === '全部' && item.leagueName) {
              list.arr.push(item)
            }
          }
        }
        return temp
        // console.log(temp)
      },
      concernMatch (list) {
        // 关注比赛
        let newType = 0
        list.isCollect = !list.isCollect
        newType = list.isCollect === true ? 1 : 0
        // console.log(newType)
        favoriteMatch({
          lotyId: 'JCZQ',
          matchNo: list.matchNo,
          type: newType
        }).then(res => {
          if (res.data.errCode === this.$ERR_CODE && res.data.retCode === this.$RET_CODE) {
            this.$toast({
              message: '关注成功',
              duration: 1000
            })
            if (newType === 1) {
              let x = this.allMatchList[3].arr.find((value, index, arr) => {
                return value.matchNo === list.matchNo
              })
              if (!x) {
                this.allMatchList[3].arr.push(list)
              }
              this.channelList[3].dwChannelMatchNum = this.allMatchList[3].arr.length
            } else {
              this.$toast({
                message: '关注已取消',
                duration: 1000
              })
              this.allMatchList[3].arr.find((value, index, arr) => {
                if (value.matchNo === list.matchNo) {
                  this.allMatchList[3].arr.splice(index, 1)
                }
                return value.matchNo === list.matchNo
              })
              this.channelList[3].dwChannelMatchNum = this.allMatchList[3].arr.length
            }
          }
        })
      },
      toMatchDetail (matchNo) {
        // 进入竞猜内页
        this.$router.push({path: '/guess_detail', query: {matchNo: matchNo}})
      },
      toPayPage (index) {
        // 跳转到充值页面
        this.$router.push({path: '/pay', query: {falg: index}})
      },
      _initScroll () {
        // 初始化顶部导航滚动
        // let picWidth = 120
        let margin = 110
        // let width = (picWidth + margin) * this.channelList.length - margin
        let width = 0
        for (let i = 0; i < this.channelList.length; i++) {
          width += (this.$refs.classify_list.children[i].clientWidth + margin)
        }

        width = width - margin
        this.$refs.classify_list.style.width = width / 120 + 'rem'
        this.meunScroll = new BScroll(this.$refs.classify, {
          scrollX: true,
          eventPassthrough: 'vertical'
        })
      },
      select (index) {
        this.currentIndex = index
        this.setNavBarINdex(index)
        this._followScroll(index)
        this.matchList = this.allMatchList[index].arr
      },
      _followScroll (index) {
        let menuList = this.$refs.menu_item
        let el = menuList[index]
        // scrollToElement有四个参数，第一个参数代表目标元素，第二个参数代表动画执行时间，第三个参数代表x轴偏移量，第四个参数代表y轴偏移量
        this.meunScroll.scrollToElement(el, 300, true, 0)
      },
      showChoose () {
        this.$router.push('/choose_class')
        // this.showchoose(true)
      },
      ...mapMutations({
        showchoose: 'SET_CHOOSE_CLASS',
        hideSignModel: 'SET_SHOW_SIGN_MODEL',
        showSignModels: 'SET_SHOW_SIGN_MODEL',
        setcurrentday: 'SET_CURRENT_DAY',
        setUserInfo: 'SET_USER_INFO',
        setNavBarINdex: 'SET_GUESS_CENTER_INDEX'
      })
    },
    components: {
      // Scrolls
      chooseClass,
      signModl,
      signSuccess
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../../common/stylus/index.styl'
  // .slide-enter-active,.slide-leave-active
  //   transition: all 0.3s
  // .slide-enter
  //   transform: translateX(100%)
  // .slide-leave-to
  //   transform: translateX(-100%)
  .mask
    position:fixed
    height:100%
    width:100%
    background:rgba(0,0,0,.5)
    z-index:1000
  .fixed_top
    // background:red
    position:fixed
    z-index:100
    width:100%
    background-image:url('img/topbg.png')
    background-size:cover
    // height:2.43rem
  .pay
    font-size:0.45rem
    color:#FFF
    line-height:0.4rem
    font-weight: bold
    position:absolute
    right:0.03rem
    width:0.45rem
    height:0.45rem
    border-radius:100%
    text-align:center
    background:linear-gradient(#006b6b, #009797)
  .nums
    font-size:0.24rem
    color:#99ffff
    width:0.7rem
    overflow: hidden
    text-overflow:ellipsis
    white-space: nowrap
    position:absolute
    top:0.08rem
    left:0.5rem
  .testBd
    position:fixed
    top:0
    left: 0
    width: 100%
    height:100%
    background-image url('img/bg.jpg')
    background-size:cover
    z-index:-1
    // background-size:100% 100%
    // background-position:center
  .guess_center
    position:absolute
    // min-height:100%
    width:100%
    // background-image url('img/bg.jpg')
    // background-size:100% 100%
    // background-position:center
    .userInfo
      height:0.67rem
      // width:100%
      display:flex
      justify-content:space-between
      align-items:center
      margin:auto 0.3rem
      padding-top:0.2rem
      margin-bottom:0.2rem
      .right
        width:4.3rem
        display:flex
        justify-content:space-between
        align-items:center
        .gold
          width:2.2rem
          height:0.45rem
          background:linear-gradient(#309c9e, #006b6c)
          border-radius:0.225rem
          position:relative
          z-index:1000
          .gold_icon
            display:inline-block
            width:0.41rem
            height:0.42rem
            background-size:cover
            bg-image('img/gold')
            position:absolute
            top:0.06rem
            left:0.06rem
            z-index:1000
        .diamond
          width:1.7rem
          height:0.45rem
          background:linear-gradient(#309c9e, #006b6c)
          border-radius:0.225rem
          position:relative
          .diamond_icon
            display:inline-block
            width:0.42rem
            height:0.39rem
            background-size:cover
            bg-image('img/diamond')
            position:absolute
            top:0.06rem
            left:0.08rem
      .left
        display:flex
        align-items:center
        img
          width:0.65rem
          height:0.65rem
          border:2px solid #62c6c6
          border-radius:100%
        span
          font-size:0.24rem
          color:#fff 
          margin-left:0.3rem
    .menu_wrapper
      overflow: hidden
      white-space: nowrap
      font-size:0
      height:0.83rem
      background:linear-gradient(#0a585a, #0b3a3c)
      // line-height:0.5rem
      position: relative
      box-shadow 0px 3px 3px #0d292e
      ul
        .menu_item
          // width:1.2rem
          text-align:center
          display:inline-block
          font-size:0.3rem
          // margin-left:0.4rem
          padding:0 0.2rem 0 0.2rem
          color:#ccffff
          height:0.83rem
          .p1
            margin-top:0.1rem
          .p2
            font-size:0.18rem
            margin-top:0.05rem
        .menu_item_active
          color:#00ffff
          font-size:0.32rem
      .allTags
        position:absolute
        height:0.83rem
        width:1rem
        background:linear-gradient(90deg,rgba(3,59,59,.7), #0b3a3c)
        right:0
        top:0
        display:flex
        justify-content:center
        align-items:center
        .more_icon
          display:inline-block
          height:0.48rem
          width:0.47rem
          background-size:cover
          bg-image('img/more')
    .news
      height:0.5rem
      margin:auto 0.3rem
      // margin-top:0.3rem
      padding: 0.15rem 0 0.15rem 0;
      display:flex
      justify-content:space-between
      align-items:center
      .inform_icon
        display:inline-block
        background-size:cover
        width:0.35rem
        height:0.29rem
        bg-image('img/inform')
      .chuan
        height:0.5rem
        width:0.8rem
        border-radius:0.25rem
        text-align:center
        line-height:0.5rem
        font-size:0.24rem
        color:#ccffff
        background:rgba(51,153,153,.3)
    .match_container
      margin:auto 0.3rem
      padding-bottom: 1.3rem
      margin-top:2.2rem
      .match_list
        .match_item
          margin-top:0.2rem
          height:2rem
          border-radius:0.1rem
          background:linear-gradient(#45a7a7, #006666)
          position: relative
          box-shadow:0px 3px 2px #061b1c
          .item_bg
            display:inline-block
            background-size:cover
            width:2.95rem
            height:1.93rem
            background-image:url(img/item_bg.png)
            position:absolute
            top:0
            left:0
          .match_title
            height:0.36rem
            position: relative
            padding-top:0.18rem
            .title_text
              line-height:0.36rem
              font-size:0.24rem
              color:#ccffff
              text-align:center
            .star_container
              position:absolute
              top:0rem
              right:0rem
              height:0.6rem
              width:0.6rem
              display:flex
              justify-content:center
              align-items:center
              z-index:10
              .star_icon
                display:inline-block
                background-size:cover
                width:0.36rem
                height:0.35rem
                bg-image('img/emptyStar')
              .star_active
                bg-image('img/star')
          .match_team
            display:flex
            margin:auto 0.2rem
            align-items:center
            justify-content:space-between
            margin-top:0.15rem
            p
              font-size:0.35rem
              color:#c4f8f8
              width:2.3rem
            .guest_team
               text-align:right
              // overflow: hidden
              // text-overflow:ellipsis
              // white-space: nowrap
          .match_res
            .match_state1
              display:flex
              justify-content:space-between
              align-items:center
              height:0.5rem
              .score
                font-size:0.6rem
                color:#00ffff
                width:0.3rem
              .matching
                display:inline-block
                font-size:0.18rem
                color:#ffffff
                height:0.36rem
                line-height:0.36rem
                width:1.9rem
                text-align:center
                background: linear-gradient(to right, rgba(24,117,117,0) 10%, rgba(18,94,91,1) 50%, rgba(24,117,117,0) 90%)
            .match_state2
              .hot_icon
                background-size:cover
                width:0.4rem
                height:0.47rem
                bg-image('img/hot')
                margin:auto
              .time
                font-size:0.18rem
                margin-top:0.1rem
                text-align:center
            .match_state3
              p
                text-align:center
              .vs
                font-size:0.48rem
              .time
                font-size:0.18rem
                margin-top:0.1rem
          .bet_peoples
            height:0.5rem
            position:absolute
            bottom:0
            right:0
            width:100%
            border-radius: 0 0 0.1rem 0;
            background-image: linear-gradient(to right, rgba(0, 102, 102, 0.1) 0%, rgba(0, 51, 51, 0) 20%, rgba(0, 51, 51,1) 100%)
            .bet_num
              position:absolute
              width:100%
              line-height:0.5rem
              text-indent:2em
              text-align:right
              font-size:0.18rem
              color:#53b0b0
              right:0.2rem
</style>

