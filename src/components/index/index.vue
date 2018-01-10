<template>
  <div class="index">
    <!-- <transition name="slide"> -->
    <router-view></router-view>
    <!-- </transition> -->
    <div class="footer_nav" :class="{'footeractive': chooseClaState}">
      <div class="nav_container">
        <router-link to="/guess_center" tag="div" >
          <p class="p1">
            <span class="icon-racing-flag"></span>
            <span>竞猜</span>
          </p>
        </router-link>
        <router-link to="/recordlist" tag="div">
          <div class="p2">
            <p>
              <span class="icon-record"></span>
              <span>记录</span>
            </p>
          </div>
        </router-link>
        <router-link to="/podium" tag="div">
          <div class="p3">
           <p>
              <span class="icon-shangcheng"></span>
              <span>商城</span>
           </p>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    data () {
      return {}
    },
    computed: {
      ...mapGetters([
        'chooseClaState'
      ])
    },
    methods: {}
  }
</script>

<style lang="stylus" scoped>
  @import '../../common/stylus/index.styl'
  .active
    color:#ffffff !important
    .icon-shangcheng
      color:#fff !important
    .icon-racing-flag
      color:#fff !important
    .icon-record
      color:#fff !important
  .index
    .footer_nav
      position:fixed
      width:100%
      height:1.07rem
      z-index:11
      background:#248a8a
      bottom:0
      .nav_container
        height:100%
        margin:auto 0.48rem
        display:flex
        justify-content:space-between
        align-items:center
        color:#666666
        div
          flex:1
          height:1.06rem
          display:flex
          align-items:center
          text-align:center
          font-size :0.2rem
          p
            span
              display:block
              color:#fff
            .icon-shangcheng
              font-family:"iconfont" 
              font-size:0.5rem
              margin-bottom:0.1rem
              margin-right:-0.05rem
              color:#66cccc
            .icon-racing-flag
              font-family:"iconfont" 
              font-size:0.5rem
              margin-bottom:0.1rem
              color:#66cccc
            .icon-record
              font-family:"iconfont" 
              font-size:0.42rem
              margin-bottom:0.1rem
              color:#66cccc
          .p2
            display:flex
            justify-content:center
            
          .p3
            text-align:left
            display:flex
            justify-content:flex-end
            text-align:right
    .footeractive
      // position:absolute
</style>

