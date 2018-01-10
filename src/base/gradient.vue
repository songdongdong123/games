<template>
  <div class="gradient">
      <p class="gradient_line"></p> 
  </div>
</template>

<script>
  export default {
    data () {
      return {}
    }
  }
</script>

<style lang="stylus" scoped>
  .gradient
    .gradient_line
        // width:2rem
        margin:auto 0.5rem
        margin-top:-0.02rem
        height:0.02rem
        background: linear-gradient(to right, #469a9b , #fff, #469a9b)
</style>