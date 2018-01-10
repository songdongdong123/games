<template>
<transition name="slide">
  <div class="choose_class">
    <div class="container" >
      <div class="title">
        <div class="close_container">
          <div>
            <p @click="hide">
              <span class="close"></span>
            </p>
          </div>
        </div>
        <p class="tagsTitle_container" v-if="myTags.length">
          <span class="chooseenTags">已选频道<span class="ac">拖拽可以排序</span></span>
          <span :class="{'active': !disabled}" class="edit" @click="enable">{{eidtText}}</span>
        </p>
      </div>
      <div class="defaulate">
        <p class="itemenable" v-for="list in defaulateTags">{{list.channel}}</p>
      </div>
      <draggable class="draggable"
        v-model="myTags" 
        :options="{
          disabled:disabled, 
          ghostClass:'ghostClass', 
          chosenClass: 'choose', animation: 150}"
        :move="getdata" @update="datadragEnd">
        <transition-group class="transition_group">
          <p class="item" 
          v-show="list.isSub===1 && index>1"
          :class="{'itemenable': !disabled && index>1, 'choose': index === ind, 'forbid_item': index<2}"
          :key="list.channel" v-for="(list, index) in myTags">
          <span
            v-show="!disabled" 
            v-if="index>1" @click="delateTags(list, index)"></span>{{list.channel}}</p>
        </transition-group>
      </draggable>
      <div class="channel_title" v-if="Alltags.length">
        <span class="span_a">可选频道</span> <span class="span_b">点击添加频道</span>
      </div>
      <div class="allTags" :key="list.name" v-for="(list, index) in Alltags">
        <h1 v-show="index !== 0 && list.length" class="channel">{{list.name}}</h1>
        <ul class="list">
          <li
            @click="addItem(item)" 
            class="item"
            v-show="item.isSub !==1"
            v-for="item in list.value">
              <span :class="{'span_hot': index===0}">+</span>{{item.channel}}
          </li>
        </ul>
      </div>
    </div>
  </div>
  </transition>
</template>
<script>
  import { mapGetters, mapMutations } from 'vuex'
  import { getChannelList, setChannelList } from 'api/channel'
  import { Indicator } from 'mint-ui'
  import draggable from 'vuedraggable'
  export default {
    data () {
      return {
        // 是否可编辑
        disabled: true,
        ind: '',
        // 所有频道
        Alltags: [],
        // 不可编辑的频道
        defaulateTags: [],
        // 我的频道
        myTags: [],
        eidtText: '编辑'
      }
    },
    computed: {
      ...mapGetters([
        'chooseClaState'
      ])
    },
    watch: {
      chooseClaState (newVal, oldVal) {
        if (newVal) {
          // this._getChannelList()
          // scrollToTop()
        }
      }
    },
    created () {
      this._getChannelList()
    },
    methods: {
      _getChannelList () {
        // 获取全部频道
        Indicator.open()
        getChannelList({}).then(res => {
          if (res.data.errCode === this.$ERR_CODE && res.data.retCode === this.$RET_CODE) {
            Indicator.close()
            let data = res.data.data
            this.myTags = data.myChannel
            // 截取默认不可编辑的频道
            this.defaulateTags = [].concat(this.myTags).splice(0, 2)
            let temp = []
            for (let key in data.commonChannel) {
              temp.push({name: key, value: data.commonChannel[key]})
            }
            temp.sort((a, b) => {
              return a.name > b.name ? 1 : -1
            })
            temp.unshift({name: '热门赛事', value: data.hotChannel})
            this.Alltags = temp
            this.chekoutChannelList()
          }
        })
      },
      addItem (item) {
        // 添加到我的频道
        if (item.num === 0) {
          this.$toast({
            message: '无比赛的频道将不会在频道栏内展示'
          })
        }
        let x = this.myTags.find((value, index, arr) => {
          return value.channel === item.channel
        })
        if (!x) {
          item.isSub = 1
          this.myTags.push(item)
        }
        this.chekoutChannelList()
        let argmuent = []
        for (let list of this.myTags) {
          argmuent.push(list.channel)
        }
        setChannelList({subChannel: JSON.stringify(argmuent)}).then(res => {
          if (res.data.errCode === this.ERR_CODE && res.data.retCode === this.RET_CODE) {
            this.$toast({
              message: '添加成功',
              duration: 1000
            })
          }
        })
      },
      delateTags (obj, index) {
        // 从我的频道删除
        this.myTags.splice(index, 1)
        for (let item of this.Alltags) {
          for (let list of item.value) {
            if (list.channel === obj.channel) {
              this.$toast({
                message: '删除成功',
                duration: 1000
              })
              list.isSub = 0
            }
          }
        }
        this.chekoutChannelList()
      },
      enable () {
        // 编辑
        this.disabled = !this.disabled
        this.ind = ''
        this.eidtText = this.eidtText === '编辑' ? '完成' : '编辑'
        if (this.disabled) {
          let argmuent = []
          for (let list of this.myTags) {
            argmuent.push(list.channel)
          }
          setChannelList({subChannel: JSON.stringify(argmuent)}).then(res => {
            if (res.data.errCode === this.ERR_CODE && res.data.retCode === this.RET_CODE) {
              this.$toast({
                message: '编辑成功',
                duration: 1000
              })
            }
          })
        }
      },
      chekoutChannelList () {
        // 检查每个频道分组的状态
        for (let list of this.Alltags) {
          let length = 0
          for (let item of list.value) {
            if (item.isSub === 0) {
              ++length
            }
          }
          list.length = length
        }
        console.log(this.Alltags)
      },
      getdata (evt) {
        // console.log(evt)
      },
      datadragEnd (evt) {
        this.ind = evt.newIndex
        // console.log(evt.newIndex)
      },
      hide () {
        this.$router.push('/guess_center')
        // this.hideChoose(false)
      },
      toTop () {
        // 返回到页面顶部
        // scrollToTop()
      },
      ...mapMutations({
        hideChoose: 'SET_CHOOSE_CLASS'
      })
    },
    components: {
      draggable
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../../common/stylus/index.styl'
  // .slide-enter-active,.slide-leave-active
  //   transition: all 0.5s
  // .slide-enter
  //   transform:translateY(100%)
  // .slide-leave-to
  //   transform:translateY(100%)
  .choose
    color:red !important
    border-color:red !important
  .choose_class
    min-height:100%
    // overflow hidden
    // position: absolute
    width:100%
    background:#fff
    // z-index:4008 !important
    top:0
    // transition:all 0.5s
    .container
      width:100%
      .title
        font-size:0
        .close_container
          position:fixed
          width:100%
          height:0.5rem
          background:#fff
          z-index:1000
          div
            // width:1rem
            height:0.7rem
            background:#fff
            p
              height:0.5rem
              width:0.8rem
              padding: 0.3rem 0 0 0.2rem
              .close
                margin-bottom:0.45rem
                // font-size:0.3rem
                display:inline-block
                height:0.28rem
                width:0.28rem
                background-size:cover
                bg-image('img/close')
        .tagsTitle_container
          margin:auto 0.25rem
          display:flex
          justify-content: space-between
          align-items: center
          height:0.5rem
          padding-top:0.92rem
          .chooseenTags
            font-size:0.4rem
            .ac
              font-size:0.24rem
              color:#999999
              margin-left:0.4rem
          .edit
            height:0.5rem
            width:1.12rem
            font-size:0.24rem
            line-height:0.5rem
            color:#339999
            border:1px solid #339999
            text-align:center
            border-radius:0.25rem
          .active
            border:none
            background:#339999
            color:#fff
      .defaulate
        margin:auto 0.25rem
        display:flex
        justify-content:space-between
        .itemenable
          position:relative
          width:2.18rem
          height:0.9rem
          line-height:0.9rem
          font-size:0.3rem
          border:1px solid #ccc
          // margin-left:0.2rem
          text-align:center
          border-radius: 0.1rem
          margin-bottom:0.2rem
          margin-top:0.2rem
          box-shadow: 1px 1px 4px #ccc
          background:#f3f3f3
          color:#999999
      .defaulate:after
        content:''
        width:2.18rem
      .draggable
        margin:auto 0.25rem
        .transition_group::after
          content:''
          width:2.24rem
        .transition_group
          display:flex
          justify-content:space-between
          flex-wrap:wrap
          width:100%
          .item
            position:relative
            width:2.18rem
            height:0.9rem
            line-height:0.9rem
            font-size:0.3rem
            color:#666
            border:1px solid #ccc
            // margin-left:0.2rem
            text-align:center
            border-radius: 0.1rem
            margin-bottom:0.2rem
            margin-top:0.2rem
            box-shadow: 1px 1px 4px #ccc
            span
              width:0.35rem
              height:0.35rem
              position:absolute
              right:-0.175rem
              top:-0.175rem
              background-size: cover
              bg-image('img/delate')
          .itemenable
            border:1px dashed #ccc
          .ghostClass
            opacity:0
          .forbid_item
            background:#f3f3f3
            color:#999999
      .allTags
        margin:auto 0.25rem
        z-index:1008
        .list::after
          content: ''
          width:2.24rem
        .list
          display:flex
          justify-content:space-between
          flex-wrap:wrap
          .item
            width:2.18rem
            height:0.9rem
            line-height:0.9rem
            font-size:0.3rem
            color:#333333
            border:1px solid #ccc
            border-radius: 0.1rem
            margin-bottom:0.2rem
            margin-top:0.2rem
            box-shadow: 1px 1px 4px #ccc
            .span_hot
              color:red
            span
              display:inline-block
              width:0.55rem
              text-align:right
              margin-right:0.1rem
          .item_active
            background:#ccc
        .channel
          height:0.5rem
          line-height:0.5rem
          padding-left:0.1rem
          font-size:0.24rem
      .toTop
        position:fixed
        bottom:0
        right:0
      .channel_title
        margin:auto 0.25rem
        height:1rem
        line-height:1rem
        font-size:0
        .span_a
          font-size:0.4rem
          color:#333333
        .span_b
          font-size:0.24rem
          color:#999999
          margin-left:0.3rem
</style>

