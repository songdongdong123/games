<template>
  <div class="mask" @click="hideMatchDetail"></div>
</template>
<script>
  import { mapMutations } from 'vuex'
  export default {
    methods: {
      hideMatchDetail () {
        // 隐藏投注内页记录弹窗
        this.hideMatchList(false)
      },
      ...mapMutations({
        hideMatchList: 'SET_MATCH_STATE'
      })
    }
  }
</script>

<style lang="stylus" scoped>
  .mask
    position:absolute
    z-index:1000
    min-height:100vh
    width:100%
    top:0
    left:0
    background-color:rgba(0,0,0,.7)
</style>
