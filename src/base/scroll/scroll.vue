<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
  import Bscroll from 'better-scroll'

  export default {
    props: {
      probeType: {
        type: Number,
        default: 1
      },
      click: {
        type: Boolean,
        default: true
      },
      listenScroll: {
        type: Boolean,
        default: false
      },
      listShow: {
        type: Boolean,
        default: false
      },
      showMsk: {
        type: Boolean,
        default: false
      },
      data: {
        type: Array,
        default: null
      },
      machList: {
        type: Array,
        default: null
      },
      matchState: {
        type: Boolean,
        default: false
      },
      guessDetail: {
        type: Boolean,
        default: true
      },
      pullDown: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        scrollss: ''
      }
    },
    mounted () {
      setTimeout(() => {
        this._initScroll()
      }, 20)
    },
    methods: {
      _initScroll () {
        this.scroll = new Bscroll(this.$refs.wrapper, {
          click: true,
          probeType: 3
          // eventPassthrough: 'vertical'
        })
        if (this.listenScroll) {
          let me = this
          this.scroll.on('scroll', (pos) => {
            me.$emit('scroll', pos, this.scroll.maxScrollY)
            // if (pos.y === this.scroll.maxScrollY) {
            //   console.log('asdasd')
            // }
          })
        }
        if (this.pullDown) {
          this.scroll.on('scrollEnd', (pos) => {
            if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
              this.$emit('scrollDown')
            }
          })
        }
      },
      scrollToElement () {
        this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
      },
      scrollTo () {
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
      },
      refresh () {
        this.scroll && this.scroll.refresh()
      },
      scrollEnd () {
        this.scroll && this.scroll.scrollEnd()
      },
      pullingUp () {
        this.scroll && this.scroll.pullingUp()
      }
    },
    watch: {
      data () {
        setTimeout(() => {
          this.refresh()
        }, 20)
      },
      listShow () {
        setTimeout(() => {
          this.refresh()
        }, 20)
      },
      showMsk () {
        setTimeout(() => {
          this.refresh()
        }, 20)
      },
      machList () {
        setTimeout(() => {
          this.refresh()
        }, 20)
      },
      matchState () {
        setTimeout(() => {
          this.refresh()
        }, 20)
      },
      guessDetail () {
        console.log(0)
        setTimeout(() => {
          this.refresh()
        }, 20)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
