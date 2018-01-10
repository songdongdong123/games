<template>
  <div class="info">
    <div class="header">
      <div class="container">
        <p class="iamge">图像</p>
        <img src="" alt="">
      </div>
    </div>
    <div class="message">
      <ul class="list">
        <li class="item">
          <p>名字</p>
          <p>Wilburz</p>
        </li>
        <li class="item">
          <p>账号</p>
          <p>DFG5tg54656HYTH</p>
        </li>
      </ul>
    </div>
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
  .info
    background:#f3f3f3
    position:absolute
    width:100%
    height:100%
    font-size:0.3rem
    .header
      width:100%
      margin-top:0.27rem
      background:#fff
      .container
        height:1.82rem
        margin:auto 0.32rem
        display:flex
        justify-content:space-between
        align-items:center
        img
          width:1.31rem
          height:1.31rem
          border:2px solid pink
          border-radius:50%
    .message
      background:#fff
      .list
        // margin:auto 0.32rem
        .item
          padding-left:0.32rem
          padding-right:0.32rem
          height:0.92rem
          display:flex
          justify-content:space-between
          align-items:center
        .item:nth-child(1)
          border-top:1px solid #f3f3f3
          border-bottom:1px solid #f3f3f3
</style>

