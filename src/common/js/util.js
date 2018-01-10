export default {
  install (Vue, options) {
    Vue.prototype.$ERR_CODE = 0
    Vue.prototype.$RET_CODE = 0
    Vue.prototype.$getNum = (argument) => {
      return Math.max.apply(null, argument)
    }
    Vue.prototype.$forMatTime = (time, mode) => {
      // 时间戳处理
      if (typeof time !== 'string') {
        let unixtime = time
        let unixTimestamp = new Date(unixtime * 1000)
        let Y = ((unixTimestamp.getFullYear()) >= 10 ? (unixTimestamp.getFullYear()) : '0' + (unixTimestamp.getFullYear()))
        let M = ((unixTimestamp.getMonth() + 1) >= 10 ? (unixTimestamp.getMonth() + 1) : '0' + (unixTimestamp.getMonth() + 1))
        let D = (unixTimestamp.getDate() >= 10 ? unixTimestamp.getDate() : '0' + unixTimestamp.getDate())
        let H = (unixTimestamp.getHours() >= 10 ? unixTimestamp.getHours() : '0' + unixTimestamp.getHours())
        let m = (unixTimestamp.getMinutes() >= 10 ? unixTimestamp.getMinutes() : '0' + unixTimestamp.getMinutes())
        let s = (unixTimestamp.getSeconds() >= 10 ? unixTimestamp.getSeconds() : '0' + unixTimestamp.getSeconds())
        if (mode === 'y-m-d') {
          return `${Y}年${M}月${D}日`
        } else if (mode === 'h-m-s') {
          return `${H}:${m}:${s}`
        }
      }
    }
  }
}
