<template>
  <div class="memessage">
    <div class="message">
      <ul class="list">
        <li class="item">
          <span class="led"></span>
          <p class="title">热门赛事提醒</p>
          <p class="text_content">皇马vs马竞9月17日15:30滚盘开球</p>
        </li>
        <li class="item">
          <p class="title fontColor">房间邀请</p>
          <p class="text_content">Wilburz开设房间皇马vs马竞邀您一同观看比赛</p>
        </li>
        <li class="item">
          <p class="title fontColor">系统消息</p>
          <p class="text_content">66竞猜v1.3版本已经更新</p>
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
  .memessage
    background:#f3f3f3
    position:absolute
    width:100%
    min-height:100%
    font-size:0.3rem
    .message
      background:#fff
      margin-top:0.22rem
      .list
        .item
          padding-left:0.32rem
          padding-right:0.32rem
          height:0.92rem
          display:flex
          justify-content:space-between
          align-items:center
          .led
            display:inline-block
            position:absolute
            width:0.15rem
            height:0.15rem
            background:#339999
            border-radius:50%
            left:0.1rem
          .title
            font-size:0.3rem
          .fontColor
            color:#999999
          .text_content
            font-size:0.18rem
            color:#999999
            text-align:left
            width:4.11rem
            overflow: hidden
            text-overflow:ellipsis
            white-space: nowrap

</style>

