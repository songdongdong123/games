const formatTime = function (time) {
  if (typeof time !== 'string') {
    let unixtime = time
    let unixTimestamp = new Date(unixtime * 1000)
    let commonTime = ''
    let currentTime = new Date()
    let currentDay = (currentTime.getDate() >= 10 ? currentTime.getDate() : '0' + currentTime.getDate())
    let Str = ''
    let M = ((unixTimestamp.getMonth() + 1) >= 10 ? (unixTimestamp.getMonth() + 1) : '0' + (unixTimestamp.getMonth() + 1))
    let D = (unixTimestamp.getDate() >= 10 ? unixTimestamp.getDate() : '0' + unixTimestamp.getDate())
    let H = (unixTimestamp.getHours() >= 10 ? unixTimestamp.getHours() : '0' + unixTimestamp.getHours())
    let m = (unixTimestamp.getMinutes() >= 10 ? unixTimestamp.getMinutes() : '0' + unixTimestamp.getMinutes())
    if (currentDay === D) {
      Str = '今日'
      commonTime = Str + H + ':' + m
    } else if (currentDay - 0 === D - 1) {
      Str = '明天'
      commonTime = Str + H + ':' + m
    } else {
      commonTime = M + '月' + D + '日' + H + ':' + m
    }
    return commonTime
  } else {
    return time
  }
}

export default formatTime
