<template>
<transition name="slide">
  <div class="mecenter">
    <signModl
        :sign-in-days="signInDays"
      ></signModl>
      <signSuccess></signSuccess>
    <div class="header">
      <div class="info_card">
        <div class="info_top">
          <img :src="piccUrl" alt="">
          <p class="name_box">
            <span class="name">{{nickname}}</span>
            <span class="id_number">ID:{{userId}}</span>
          </p>
          <p class="vip">vip3</p>
        </div>
        <div class="info_bottom">
          <p class="diamond">
            <span class="diamond_icon"></span>
            <span class="diamond_num">{{diamond}}</span>
          </p>
          <p class="achievement">
            <span class="achievement_icon"></span>
            <span class="achievement_num">{{gold}}</span>
          </p>
          <p class="pay" @click="toPayPage">充值</p>
        </div>
      </div>
    </div>
    <div class="info_list">
      <div class="container">
        <router-link to="/memessage" tag="p" class="message">
          <!-- <p class="message"> -->
            <span class="message_icon1"></span>
            <span class="message_text">消息通知</span>
            <span class="messaga_num">1</span>
          <!-- </p> -->
        </router-link>
        <router-link to="/recordlist" tag="p" class="message">
          <!-- <p class="message"> -->
            <span class="message_icon2"></span>
            <span class="message_text">竞猜记录</span>
            <!-- <span class="messaga_num"></span> -->
          <!-- </p> -->
        </router-link>
      </div>
      <div class="list_center">
        <ul class="list_ul">
          <router-link to="/info" tag="li" class="item">
            <!-- <li class="item"> -->
              <span class="list_icon1"></span>
              <span class="list_text">个人信息</span>
            <!-- </li> -->
          </router-link>
          <router-link to="/info" tag="li" class="item">
            <!-- <li class="item"> -->
              <span class="list_icon2"></span>
              <span class="list_text">系统设置</span>
            <!-- </li> -->
          </router-link>
          <router-link to="/info" tag="li" class="item">
            <!-- <li class="item"> -->
              <span class="list_icon3"></span>
              <span class="list_text">问题反馈</span>
            <!-- </li> -->
          </router-link>
        </ul>
      </div>
      <div class="about_me">
        <p class="about_container">
          <span class="about_icon"></span>
          <span class="about_text">关于66竞猜</span>
        </p>
      </div>
    </div>
    <div class="footer">
      <p @click="exit">退出登录</p>
    </div>
  </div>
</transition>
</template>

<script>
  import signModl from '@/base/sign_model/sign_model'
  import signSuccess from '@/base/sign_success/sign_success'
  import { getSimpleUserInfo } from 'api/userinfo'
  import { formatFloat } from '*/common'
  import { getSignIn } from 'api/signin'
  import { mapMutations } from 'vuex'
  const ERR_CODE = 0
  const RET_CODE = 0
  export default {
    data () {
      return {
        signInDays: 0, // 签到的天数
        diamond: 0, // 钻石数量
        gold: 0, // 金币数量
        piccUrl: 'http://m.dev.pearlba.com/pic/meixi.png',
        nickname: '', // 用户昵称
        userId: '', // 用户ID
        username: '' // 用户名
      }
    },
    created () {
      this._getSimpleUserInfo()
      this._getSignIn()
    },
    methods: {
      _getSignIn () {
        // 获取签到信息
        getSignIn({}).then(res => {
          if (res.data.errCode === ERR_CODE && res.data.retCode === RET_CODE) {
            this.signInDays = res.data.data.signInDays
            if (res.data.data.isCurrDaySign !== 1) {
              this.hideSignModel(true)
            } else {
              this.setcurrentday(1)
            }
          }
        })
      },
      _getSimpleUserInfo () {
        // 获取用户信息
        getSimpleUserInfo({}).then(res => {
          if (res.data.errCode === ERR_CODE && res.data.retCode === RET_CODE) {
            [
              this.diamond,
              this.gold,
              this.nickname,
              this.userId,
              this.username,
              this.piccUrl] = [
                formatFloat(res.data.data.diamond),
                formatFloat(res.data.data.gold),
                res.data.data.nickname,
                res.data.data.userId,
                res.data.data.username,
                res.data.data.picture
              ]
          }
        })
      },
      exit () {
        // 退出登录
        this.$router.push('/')
      },
      toPayPage () {
        // 跳转到充值页面
        this.$router.push('./pay')
      },
      ...mapMutations({
        setcurrentday: 'SET_CURRENT_DAY'
      })
    },
    components: {
      signModl,
      signSuccess
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../../common/stylus/mixin.styl'
  .slide-enter-active,.slide-leave-active
    transition: all .3s
  .slide-enter
    transform: translate3d(100%, 0, 0)
    opacity:1
  .slide-leave-to
    transform: translate3d(200%, 0, 0)
  .mecenter
    background:#f3f3f3
    position:absolute
    width:100%
    height:100%
    .header
      width:100%
      margin-top:0.66rem
      .info_card
        margin:auto 0.21rem
        height:2.31rem
        background:linear-gradient(-45deg, #519999, #155d5d)
        box-shadow: 0.04rem 0.05rem 0.05rem #bbb
        border-radius:0.2rem
        .info_top
          display:flex
          img 
            width:1.31rem
            height:1.31rem
            margin-left:0.53rem
            border:2px solid #abe3e3
            border-radius:50%
            margin-top:-0.28rem
          .name_box
            width:3.8rem
            padding-left:0.4rem
            margin-top:0.22rem
            span
              display:block
            .name
              font-size:0.3rem
              color:#fff
            .id_number
              font-size:0.2rem
              color:#ffffff
          .vip
            margin-top:0.22rem
            width:0.89rem
            font-size:0.25rem
            color:#d7e3e3
        .info_bottom
          display:flex
          justify-content:space-between
          font-size:0.28rem
          height:1.2rem
          align-items: flex-end
          margin-top: -0.22rem
          color:#ecf2f2
          .diamond
            margin-left:0.44rem
            .diamond_num
              display:inline-block
            .diamond_icon
              display:inline-block
              width:0.3rem
              height:0.27rem
              bg-image('img/damm')
              background-size:cover
          .achievement
            .achievement_icon
              display:inline-block
              width:0.29rem
              height:0.28rem
              bg-image('img/gold')
              background-size:cover
          .pay
            margin-right:0.3rem
          .achievement
            margin-left:0.71rem
            .achievement_num
              display:inline-block
    .info_list
      margin-top:0.25rem
      .container
        span
          display:inline-block
          background-size:cover
        .message_icon1
          width:0.42rem
          height:0.31rem
          bg-image('img/message')
        .message_icon2
          width:0.40rem
          height:0.42rem
          bg-image('img/record')
        .message
          display:flex
          align-items:center
          height:0.88rem
          background:#fff
          font-size:0.27rem
          margin-bottom:0.2rem
          padding-left:0.32rem
          line-height:0.88rem
          .message_text
            margin-left:0.44rem
          .messaga_num
            font-size:0.1rem
            width:0.3rem
            height:0.3rem
            border-radius:50%
            background:#339999
            text-align:center
            line-height:0.3rem
            color:#fff
            margin-left:0.45rem
      .list_center
        background:#fff
        font-size:0.27rem
        .list_ul
          .item
            display:flex
            align-items:center
            padding-left:0.32rem
            height:0.88rem
            // line-height:0.88rem
            .list_text
              margin-left:0.44rem
            .list_icon1
              display:inline-block
              width:0.4rem
              height:0.46rem
              bg-image('img/me')
              background-size:cover
            .list_icon2
              display:inline-block
              width:0.42rem
              height:0.4rem
              bg-image('img/set')
              background-size:cover
            .list_icon3
              display:inline-block
              width:0.44rem
              height:0.44rem
              bg-image('img/feedback')
              background-size:cover
          .item:nth-child(2)
            border-top:1px solid #f3f3f3
            border-bottom:1px solid #f3f3f3
      .about_me
        margin-top:0.25rem
        background:#fff
        font-size:0.27rem
        .about_container
          display:flex
          align-items:center
          height:0.88rem
          // line-height:0.88rem
          padding-left:0.32rem
          .about_text
            margin-left:0.44rem
          .about_icon
            display:inline-block
            width:0.37rem
            height:0.33rem
            bg-image('img/6')
            background-size:cover
    .footer
      position:fixed
      width:100%
      height:0.9rem
      bottom:0
      font-size:0.34rem
      line-height:0.9rem
      text-align:center
      background:#fff
</style>

