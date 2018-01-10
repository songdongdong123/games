<template>
<transition name="slide">
  <div class="winprizealert">
    <div class="container">
      <p class="close_container" @click="closemode">
        <span class="close_icon">x</span>
      </p>
      <div class="product_icon">
        <span>商品图片</span>
      </div>
      <div class="product_price">
        <p>抽奖将花费{{price}}金币</p>
      </div>
      <div class="submit">
        <p class="submit_btn">确认</p>
      </div>
    </div>
  </div>
</transition>
</template>

<script>
  import { mapMutations } from 'vuex'
  export default {
    props: {
      price: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {}
    },
    methods: {
      closemode () {
        // 关闭弹窗
        this.closeVolueMode(false)
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
  .slide-enter
    transform:scale(0.2)
  .slide-leave-to
    transform:scale(0)
  .winprizealert
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
      background:pink
      border:1px solid #333
      position:relative
      .close_container
        display:flex
        justify-content:flex-end
      .product_icon
        display:flex
        justify-content:center
        align-items:center
</style>

