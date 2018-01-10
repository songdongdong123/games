<template>
<transition name="slide">
  <div class="submitalert">
    <div class="container">
      <div class="product_icon">
        <span class="icon_pro"></span>
      </div>
      <div class="product_price">
        <p>抽奖将花费{{price}}金币</p>
      </div>
      <div class="submit" @click="toaddressmanage">
        <p class="submit_btn">确认</p>
      </div>
    </div>
  </div>
</transition>
</template>

<script>
  import { mapMutations } from 'vuex'
  import { toRaffled } from 'api/prize'
  export default {
    props: {
      price: {
        type: Number,
        default: 0
      },
      prokey: {
        type: String,
        default: ''
      },
      ptype: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {
        recordId: 0
      }
    },
    methods: {
      closemode () {
        // 关闭弹窗
        this.closeVolueMode(false)
      },
      toaddressmanage () {
        // 进入地址管理页面
        toRaffled({
          buyNum: 1,
          goodsKey: this.prokey,
          payType: 1
        }).then(res => {
          if (res.data.errCode === this.$ERR_CODE && res.data.retCode === this.$RET_CODE) {
            this.recordId = res.data.data.recordId
            if (this.ptype === 2) {
              this.$router.push({path: '/top_up', query: {key: this.prokey, recordId: this.recordId}})
            } else if (this.ptype === 1) {
              this.$router.push({path: '/addressmanage', query: {key: this.prokey, recordId: this.recordId}})
            }
            this.closeVolueMode(false)
          } else {
            this.closeVolueMode(false)
          }
        })
      },
      ...mapMutations({
        closeVolueMode: 'SET_VOLUME_STATE'
      })
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../../common/stylus/index.styl'
  .slide-enter-active,.slide-leave-active
    // transition: all .5s
  .slide-enter
    transform:scale(0.2)
  .slide-leave-to
    transform:scale(0)
  .submitalert
    position:absolute
    z-index:1000
    width:100%
    top:50%
    margin-top:-2rem
    transition:all .5s
    .container
      width:6rem
      height: 4rem
      margin: 0 auto
      background:linear-gradient(#64caca, #117777)
      position:relative
      overflow: hidden
      border-radius:0.1rem
      .close_container
        display:flex
        justify-content:flex-end
      .product_icon
        display:flex
        justify-content:center
        align-items:center
        .icon_pro
          display:inline-block
          margin:0.32rem 0 0.3rem 0
          width:1.7rem
          height:1.7rem
          background-size: cover
          bg-image('img/prize')
      .product_price
        font-size:0.36rem
        color:#fff
        text-align:center
      .submit
        position:absolute
        bottom:0
        left:0
        width:100%
        background:#99ffff
        .submit_btn
          height:1rem
          line-height:1rem
          text-align:center
          font-size:0.36rem
          color:#114848

</style>

