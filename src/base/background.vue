<template>
  <div class="background"></div>
</template>

<script>
  export default {
    data () {
      return {}
    }
  }
</script>

<style lang="stylus" scoped>
  .background
    position:absolute
    width:100%
    height:100vh
    background-color: #339999
    background-image url('../common/image/background_image.png')
    background-size: cover
    z-index:-1
</style>

