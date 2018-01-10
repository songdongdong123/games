<template>
  <div class="sign_model" v-show="showSignModel" @click.nactive="hideSignS($event)">
    <div class="reword">
      <div class="reword_list">
        <ul class="list">
          <li
            v-for="(item, index) of rewordArr"
            :class="item.type"
            class="item">
            <p class="title">第{{index+1}}天</p>
            <p class="icon_container icon_container_active">
              <span :class="item.type" class="base"></span>
            </p>
            <p class="mark" v-show="index<signInDays">
              <span class="nick"></span>
            </p>
            <p class="bottom" v-if="index !== 2 && index !==6">金币x{{item.num}}</p>
            <p class="bottom" v-else>钻石x{{item.num}}</p>
          </li>
        </ul>
        <p v-if="currentday !== 1" class="base1 clickGet" @click="toSignIn">点击领取</p>
        <p v-else class="base1 activeclickGet" @click="toSignIn">今日已领</p>
      </div>
    </div>
  </div>
</template>

<script>
  import { signIn } from 'api/signin'
  import { mapGetters, mapMutations, mapActions } from 'vuex'
  export default {
    props: {
      signInDays: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {
        rewordArr: [{type: 'one', num: 100},
          {type: 'one', num: 200},
          {type: 'three', num: 30},
          {type: 'two', num: 300},
          {type: 'four', num: 300},
          {type: 'four', num: 500},
          {type: 'three', num: 50}]
      }
    },
    computed: {
      ...mapGetters([
        'showSignModel',
        'currentday'
      ])
    },
    methods: {
      toSignIn () {
        // 签到
        if (this.currentday !== 1) {
          signIn({}).then(res => {
            if (res.data.errCode === this.$ERR_CODE && res.data.retCode === this.$RET_CODE) {
              let currentDay = {
                tips: res.data.data.awardTips,
                days: res.data.data.signInDays
              }
              this.hideSign(res.data.data.signInDays)
              // 关闭签到弹窗
              this.hideSignModel(false)
              // 通过mapactions设置签到成功的状态，和奖励信息
              this.setSignState({
                info: currentDay,
                signState: true
              })
            } else {
              this.$toast({
                message: res.data.msg,
                duration: 1000
              })
            }
          })
        } else {
          this.hideSignModel(false)
          this.$toast({
            message: '今天已经领取过啦~明天再来喔~~',
            duration: 1000
          })
        }
      },
      hideSign (signInDays) {
        // 暂时不处理该方法
        this.$emit('hideSign')
        this.$emit('setSignD', signInDays)
      },
      hideSignS (e) {
        let falg = e.target.className
        if (falg === 'sign_model') {
          this.hideSignModel(false)
        }
      },
      ...mapMutations({
        hideSignModel: 'SET_SHOW_SIGN_MODEL'
      }),
      ...mapActions([
        'setSignState'
      ])
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../../common/stylus/index.styl'
  .sign_model
    position:fixed
    width:100%
    height:100%
    background:rgba(0,0,0,.7)
    z-index:1000
    display:flex
    justify-content:center
    align-items:center
    // padding-top:2.3rem
    .reword
      width:6.8rem
      height:9.85rem
      // background:#fff
      background-image url('img/sinbg.png')
      background-size: cover
      border-radius:0.2rem
      .reword_list
        width:6.1rem
        margin:0 auto
        margin-top:2.7rem
        .list
          display:flex
          flex-wrap: wrap
          justify-content:center
          .item
            width:1.4rem
            height:2.4rem
            background:#003333
            margin-bottom:0.15rem
            border-radius:0.1rem
            overflow: hidden
            position: relative
            .title
              position:absolute
              width:100%
              height:0.4rem
              background:#006666
              border-radius:0 0 0.36rem 0.36rem/0 0 0.4rem 0.4rem
              font-size:0.24rem
              color:#fff
              text-align:center
              line-height:0.4rem
            .bottom
              position:absolute
              bottom:0
              font-size:0.24rem
              width:100%
              height:0.5rem
              text-align:center
              line-height:0.5rem
              color:#99ffff
              background:linear-gradient(top,#031f1f, #032929)
            .icon_container
              width:100%
              height:100%
              display:flex
              justify-content:center
              align-items:center
              // position:absolute
              .base
                display:inline-block
                background-size:cover
              .one
                width:0.84rem
                height:0.97rem
                bg-image('img/one')
              .two
                width:1.06rem
                height:0.99rem
                bg-image('img/two')
              .three
                width:1.06rem
                height:0.88rem
                bg-image('img/three')
              .four
                width:1.03rem
                height:1.18rem
                bg-image('img/four')
              // .five
              //   width:1.05rem
              //   height:1.05rem
              //   bg-image('img/five')
            .mark
              top:0
              left:0
              position:absolute
              width:100%
              height:100%
              background:rgba(0, 51, 51, 0.7)
              z-index:10
              .nick
                position:absolute
                display:inline-block
                width:0.56rem
                height:0.54rem
                right:0.14rem
                bottom:0.5rem
                background-size:cover
                bg-image('img/nick')
          .item:nth-child(2)
            margin:0 0.1rem 0 0.1rem
          .item:nth-child(3)
            margin:0 0.09rem 0 0
          .item:nth-child(6)
            margin:0 0.1rem 0 0.1rem
        .base1
          font-size:0.48rem
          font-weight: 700
          margin:0 auto
          margin-top: 0.7rem
          text-align:center
          height:0.8rem
          line-height:0.8rem
          width:2.9rem
          -webkit-text-stroke: 0.04rem #006666
          background:linear-gradient(top,#35b6af, #0d4644)
          border-radius:0.1rem
        .clickGet
          color:#ccffff 
        .activeclickGet
          color:#339999
          
</style>

