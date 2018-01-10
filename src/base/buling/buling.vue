<template>
<transition name="fade" >
  <div class="buling" v-show="showBuling">
    <div class="buling_icon">
      <span class="gold"></span>
    </div>
    <div class="stars">
      <span class="icon1"></span>
      <span class="icon2"></span>
      <span class="icon3"></span>
      <span class="icon4"></span>
    </div>
  </div>
</transition>
</template>

<script>
  export default {
    props: {
      showBuling: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {}
    },
    watch: {
      showBuling (oldV, newV) {
        if (!newV) {
          setTimeout(() => {
            this.hideBuling()
          }, 0)
        }
      }
    },
    methods: {
      hideBuling () {
        this.$emit('hideBuling')
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../../common/stylus/index.styl'
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s
  }
  .fade-enter /* .fade-leave-active in below version 2.1.8 */ {
    opacity: 0
  }
  @keyframes myfirst
    from
      transform:scale(0.5)
    to
      transform:scale(2)
  @keyframes secfirst
    from
      transform:scale(0.8)
    to
      transform:scale(1)
  .buling
    position:absolute
    z-index:2000
    width:100%
    height:100%
    background:rgba(0,0,0,.5)
    .buling_icon
      display:flex
      justify-content:center
      .gold
        width:3.74rem
        height:3.41rem
        display:inline-block
        bg-image('./img/buling')
        background-size:cover
        margin-left:0.34rem
        margin-top:2rem
        animation:secfirst 1s infinite ease
    .stars
      position:relative
      span
        position:absolute
        display:inline-block
        background-size:cover
      .icon1
        width:2.13rem
        height:1.33rem
        bg-image('./img/star1')
        top:-1.5rem
        left:1.62rem
        animation:myfirst 1s infinite ease
      .icon4
        width:2.13rem
        height:1.33rem
        bg-image('./img/star2')
        top:-1.2rem
        left:2.6rem
        animation:myfirst 1s infinite ease
      .icon3
        width:2.13rem
        height:1.33rem
        bg-image('./img/star3')
        top:-1.5rem
        left:3.14rem
        animation:myfirst 1s infinite ease
      .icon2
        width:2.13rem
        height:1.33rem
        bg-image('./img/star4')
        top:-1.4rem
        right:1.6rem
        animation:myfirst 1s infinite ease
</style>
