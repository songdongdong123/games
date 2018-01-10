const getMonthData = function (year, month, day) {
  let days = []
  let today = new Date()
  if (!year | !month | !day) {
    year = today.getFullYear()
    month = today.getMonth() + 1
    day = today.getDate()
  }
  // 获取该月第一天的Date对象
  let firstDateObj = new Date(year, month - 1, 1)
  // 获取该月第一天对应的星期几
  let firstDateWeekDay = firstDateObj.getDay()
  // 获取该月最后一天的Date对象
  let lastDateObj = new Date(year, month, 0)
  // 获取该月最后一天的日期
  let lastDate = lastDateObj.getDate()
  // 获取上一个月最后一天的Date对象
  let lastDateOfPrevMonthObj = new Date(year, month - 1, 0)
  // 获取上一个月最后一天的日期
  let lastDateOfPrevMonth = lastDateOfPrevMonthObj.getDate()
  // 上月
  for (let i = 0; i < firstDateWeekDay; i++) {
    let className = 'available disabled'
    let thisMonth = month - 1
    let date = lastDateOfPrevMonth - firstDateWeekDay + i + 1
    if (thisMonth === 0) {
      thisMonth = 1
    }
    days.push({
      'date': date,
      'howDate': date,
      'thisMonth': thisMonth,
      'className': className
    })
  }
  // 本月
  for (let i = 0; i < lastDate; i++) {
    let className = 'available'
    let date = i + 1
    let thisMonth = month
    if (date === day) {
      className = 'available current'
    }
    if (today.getDate() === date && today.getFullYear() === year && today.getMonth() + 1 === month) {
      days.push({
        'date': date,
        'showDate': '今天',
        'thisMonth': thisMonth,
        'className': className
      })
    } else {
      days.push({
        'date': date,
        'showDate': date,
        'thisMonth': thisMonth,
        'className': className
      })
    }
  }
  let nextMonthLength = days.length
  // 下月
  for (let i = 0; i < 7 * 6 - nextMonthLength; i++) {
    let className = 'available disabled'
    let date = i + 1
    let thisMonth = month + 1
    if (thisMonth === 13) {
      thisMonth = 12
    }
    days.push({
      'date': date,
      'showDate': date,
      'thisMonth': thisMonth,
      'className': className
    })
  }
  return {
    'year': firstDateObj.getFullYear(),
    'month': firstDateObj.getMonth() + 1,
    'days': days,
    'todays': day
  }
}

export default getMonthData
