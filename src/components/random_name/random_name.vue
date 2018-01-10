<template>
  <div class="login">
    <Background></Background>
    <div class="headImg">
      <img ref="imgs" 
      :class="{'activeImg': index === ind, 'activeLeft': ind === 0, 'activeRight': ind === 2}" 
      :src="item" alt="" 
      v-for="(item, index) of headImgArr" 
      @click="chooseImg(index, item)">
    </div>
    <div class="ipt">
      <span class="base pen_icon"></span>
      <input type="text" v-model="lastName" placeholder="填写昵称或随机">
      <span class="base reload_icon" :class="{'animation':animationState}" @click="_getRandNickname"></span>
    </div>
    <div class="submit">
      <p class="submit_btn" @click="submit">确定</p>
    </div>
  </div>
</template>
<script>
  import Background from '@/base/background'
  import Logo from '@/base/Logo'
  import { getRandNickname, changeNickNameAndPic } from 'api/userinfo'
  export default {
    data () {
      return {
        animationState: false, // 动画状态
        activeImgUrl: 'http://m.dev.pearlba.com/pic/meixi.png', // 用户选中的图片URL
        lastName: '填写昵称或随机', // 展示在输入框的名称
        randomCount: 8, // 随机的次数
        ind: 1, // 选中图像的索引
        headImgArr: ['http://m.dev.pearlba.com/pic/meixi.png', 'http://m.dev.pearlba.com/pic/meixi.png', 'http://m.dev.pearlba.com/pic/meixi.png']
      }
    },
    created () {
      this._getRandNickname()
    },
    methods: {
      toLogin () {
        this.$router.push('/index')
      },
      _getRandNickname () {
        // 获取随机昵称
        this.animationState = true
        getRandNickname({
          num: 1
        }).then(res => {
          if (res.data.errCode === this.$ERR_CODE && res.data.retCode === this.$RET_CODE) {
            this.lastName = res.data.data[0]
            this.randomCount = 0
            setTimeout(() => {
              this.animationState = false
            }, 1000)
          }
        })
      },
      chooseImg (index, url) {
        // 选择图像
        // let imgsArr = this.$refs.imgs
        // imgsArr[index].style.transform = '5rem'
        this.ind = index
        this.activeImgUrl = url
      },
      submit () {
        // 提交昵称和图像
        if (this.lastName !== '填写昵称或随机') {
          changeNickNameAndPic({
            nickName: this.lastName,
            picture: this.activeImgUrl
          }).then(res => {
            if (res.data.errCode === this.$ERR_CODE && res.data.retCode === this.$RET_CODE) {
              this.$router.push('/welcome')
            }
          })
        } else {
          this.$toast({
            message: '请填写昵称',
            duration: 1000
          })
        }
      }
    },
    components: {
      Background,
      Logo
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../../common/stylus/index.styl'
  ::-webkit-input-placeholder { /* WebKit browsers */
      color:#ccffff;
  }
  :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
      color:#ccffff;
  }
  ::-moz-placeholder { /* Mozilla Firefox 19+ */
      color:#ccffff;
  }
  :-ms-input-placeholder { /* Internet Explorer 10+ */
      color:#ccffff;
  }
  @keyframes bounce_in {
    0% {
      transform: rotate(0deg)
    }
    100% {
      transform: rotate(360deg)
    }
  }
  .animation
    animation: bounce_in ease .5s
  .activeLeft
    // transform:translateX(1.5rem) scale(1.2)
  .activeRight
    // transform:translateX(-1.5rem) scale(1.2)
  .activeImg
    border-color:#fff !important
    // transform:scale(1.2)
    transform:scale(1.2)
  .headImg
    margin:auto 1rem
    display:flex
    justify-content: space-between
    padding-top:3rem
    img
      width:1.5rem
      height:1.5rem
      border-radius:100%
      border:4px solid #2c8789
      transition:all 0.5s
  .ipt
    margin:auto 1rem
    // height:0.64rem
    border-bottom: 1px solid #fff
    display:flex
    justify-content:space-between
    align-items: center
    margin-top:1.16rem
    padding-bottom:0.1rem
    input
      font-size:0.28rem
      margin:auto 0
      width:80%
      background-color:#2c8789
      color:#ccffff
      padding-left:0.3rem
    .base
      display:inline-block
      background-size:cover
    .pen_icon
      width:0.45rem
      height:0.45rem
      bg-image('img/pen')
      margin-left:0.15rem
    .reload_icon
      width:0.38rem
      height:0.38rem
      bg-image('img/reload')
      margin-right:0.1rem
  .submit
      height:1.02rem
      margin:auto 0.74rem
      border-radius:1rem
      margin-top:1.4rem
      .submit_btn
        color:#fff
        font-size: 0.35rem
        text-align:center
        line-height:1.02rem
        border 1px solid #fff
        border-radius: 1rem
</style>

