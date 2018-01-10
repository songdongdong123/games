<template>
    <div class="DatePicker">
      <div class="title">
        <span class="prev" @click="prevMonth"><</span>
        <p>{{year}}年{{month}}月</p>
        <span class="next" @click="nextMonth">></span>
      </div>
      <div class="week">
        <p class="week_item" v-for = "list in weekArr">{{list}}</p>
      </div>
      <div class="time">
        <p class="item" ref='items'
          @click="active(item.date, item.thisMonth)"
          :class="{'available disabled': item.className === 'available disabled', 'currentday':item.date === todays && item.thisMonth === currentMonth }"
          v-for="item in daysArr"
        >{{item.date}}</p>
      </div>
    </div>
  <!-- </transition> -->
</template>

<script>
  import getMonthData from '../../common/js/DatePicker'
  export default {
    data () {
      return {
        weekArr: ['一', '二', '三', '四', '五', '六', '日'],
        daysArr: [], // 根据当前日期或者选中的月份计算返回的天数数组
        year: '', // 当前年份
        month: '', // 当前月份
        currentYear: new Date().getFullYear(), // 当前年份
        currentDay: new Date().getDate(), // 本地获取的当前日期
        todays: '', // 当前日期（1-31）
        currentMonth: new Date().getMonth() + 1 // 当前月份
      }
    },
    mounted () {
      // this.demo()
    },
    created () {
      this.getDateMsg()
    },
    methods: {
      getDateMsg (year, month, day) {
        let date = new Date()
        day = day === '' ? date.getDate() : year
        month = month === '' ? date.getMonth() + 1 : month
        year = year === '' ? date.getFullYear() : year
        // console.log(date.getFullYear())
        let x = getMonthData(year, month, day)
        this.year = x.year
        this.month = x.month
        this.daysArr = x.days
        this.todays = x.todays
        // console.log(x)
      },
      nextMonth () {
        // 下个月
        if (this.currentMonth < 12) {
          this.currentMonth = this.currentMonth + 1
        } else {
          this.currentMonth = 1
          this.currentYear = this.currentYear + 1
        }
        this.getDateMsg(this.currentYear, this.currentMonth, this.currentDay)
        // console.log(this.currentDay)
        // this.todays = this.currentDay
      },
      prevMonth () {
        // 下个月
        if (this.currentMonth > 1) {
          this.currentMonth = this.currentMonth - 1
        } else {
          this.currentMonth = 12
          this.currentYear = this.currentYear - 1
        }
        this.getDateMsg(this.currentYear, this.currentMonth, this.currentDay)
        // item.date === today && item.thisMonth === currentMonth
        // this.todays = this.currentDay
      },
      active (chooseDay, month) {
        // console.log(this.currentYear, month, chooseDay)
        if (parseInt(month) === this.currentMonth) {
          this.todays = chooseDay
        }
      }
    },
    components: {
      // gline
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../../common/stylus/index.styl'
  .DatePicker
    .title
      display:flex
      justify-content:space-between
      align-items:center
      margin:auto 0.36rem
      margin-top:0.3rem
      font-size:0.3rem
      .prev
        padding:0.3rem
        font-size:0.5rem
      .next
        padding:0.3rem
        font-size:0.5rem
    .week
      display:flex
      margin:auto 0.36rem
      font-size:0.3rem
      .week_item
        text-align:center
        width:0.97rem
        height:0.37rem
        padding-top:0.3rem
        padding-bottom:0.1rem
    .time
      display:flex
      flex-wrap:wrap
      margin:auto 0.36rem
      font-size:0.3rem
      width:6.8rem
      .item
        text-align:center
        width:0.97rem
        height:0.37rem
        padding-top:0.3rem
        padding-bottom:0.3rem
        border-radius:100%
      .disabled
        color:#ccc
      .currentday
        background:#339999
        color:#fff
</style>