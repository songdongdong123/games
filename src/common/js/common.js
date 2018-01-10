const getArrMax = function (arr) {
  return Math.max.apply(null, arr)
}

const getArrMin = function (arr) {
  return Math.min.apply(null, arr)
}

const emptyArr = function (arr) {
  // 清空所有选择的比赛
  for (let list of arr) {
    for (let item of list.testArr) {
      item.classState = false
    }
  }
  arr.splice(0, arr.length)
  return arr
}

// 数组对象按照摸某个属性进行排序
const sortArrObj = function (arr, id) {
  if (!arr) {
    return
  }
  arr.sort((a, b) => {
    return a.id > b.id ? 1 : -1
  })
  return arr
}

const forMatGameList = function (macthlist, subLeagueName) {
  // 对比赛列表进行分类
  // example，热门，英超，中超.....
  // console.log(subLeagueName)
  if (!macthlist) {
    return
  }
  let arr = macthlist
  let map = {}
  let dest = []
  for (let i = 0; i < arr.length; i++) {
    let ai = arr[i]
    if (!map[ai.subLeagueName]) {
      dest.push({
        subLeagueName: ai.subLeagueName,
        data: [ai]
      })
      map[ai.subLeagueName] = ai
    } else {
      for (let j = 0; j < dest.length; j++) {
        let dj = dest[j]
        if (dj.subLeagueName === ai.subLeagueName) {
          dj.data.push(ai)
          break
        }
      }
    }
  }
  return dest
}

const filterMachList = function (arr) {
  // 对数组进行过滤，防止用户先选择了一场比赛的某一项，最后确定的时候又全部取消
  for (let i = 0; i < arr.length; i++) {
    let count = 0
    for (let item of arr[i].testArr) {
      if (item.classState) {
        count += 1
      }
    }
    if (!count) {
      arr.splice(i, 1)
    }
  }
  return arr
}

const uniqueArr = function (arr) {
  // 对选择好的对象数组去重
  let hash = {}
  arr = arr.reduce(function (item, next) {
    hash[next.matchNo] = hash[next.matchNo] ? '' : hash[next.matchNo] = true && item.push(next)
    return item
  }, [])
  // 对去重后的数组，再次进行过滤
  arr = filterMachList(arr)
  return arr
}

const doubleBetNote = function (arr, num) {
  // 对分好组的比赛的选项进行统计分组
  let result = []
  let ss = [] // 金币分组
  for (let i = 0; i < arr.length; i++) {
    let tempT = arr[i]
    let arr2 = []
    let newArr = []
    for (let j = 0; j < tempT.length; j++) {
      let tempTsetA = tempT[j].testArr
      let tempC = 0
      let goldArr = []
      for (let n = 0; n < tempTsetA.length; n++) {
        if (tempTsetA[n].classState) {
          goldArr.push((tempTsetA[n].odds))
          tempC += 1
        }
      }
      arr2.push(goldArr)
      newArr.push(tempC)
    }
    ss.push(arr2)
    result.push(newArr)
  }
  return {
    A: result,
    B: ss
  }
}

const arrange = function (list) {
  // 对分好组的注数的概率进行组合排列，输出每种组合每个注数的赔率数组
  var p = list
  var index = 2
  var arr = js(p[0], p[1])
  function js (arr1, arr2) {
    var arr = []
    for (var i = 0; i < arr1.length; i++) {
      for (var j = 0; j < arr2.length; j++) {
        arr.push(arr1[i] * arr2[j])
      }
    }
    return arr
  }
  while (true) {
    if (p[index]) {
      arr = js(arr, p[index])
      index++
    } else {
      break
    }
  }
  return arr
}

const calculategold = function (arr) {
  // 计算每注中奖后的奖金
  let tempArr = []
  for (let list of arr) {
    tempArr.push(arrange(list))
  }
  // 输出的是一个分好组的数组
  return tempArr
}

const getMaxGold = function (arr) {
  // 获取最大中奖金币和最小中奖金币
  let totalMax = 0
  let totalMinArr = []
  for (let list of arr) {
    for (let item of list) {
      totalMax += getArrMax(item)
      totalMinArr.push(getArrMin(item))
    }
  }
  return {
    max: totalMax,
    min: getArrMin(totalMinArr)
  }
}

const formatFloat = function (f) {
  // js浮点数处理
  // console.log(f)
  f = Math.round(f)
  let falg = false
  if (f > 99999) {
    falg = true
    f = f / 10000
  }
  var m = Math.pow(10, 2)
  // console.log(parseInt(f * m, 10) / m)
  if (falg) {
    return parseInt(f * m, 10) / m + '万'
  } else {
    return parseInt(f * m, 10) / m
  }
}

const changeRangeVal = function (rangeVal, betNum) {
  // 根据注数调整rangeVal的取值
  let ticketCount = betNum
  if (ticketCount) {
    let betMod = rangeVal % ticketCount
    if (betMod !== 0) {
      if ((ticketCount - betMod) >= betMod) {
        rangeVal = rangeVal - betMod
      } else {
        rangeVal = rangeVal + (ticketCount - betMod)
      }
    }
    return rangeVal
  }
}

const noteCount = function (arr) {
  // 计算串关注数
  let count = 0
  for (let i = 0; i < arr.length; i++) {
    let temp = 1
    let tempArr = arr[i]
    for (let j = 0; j < tempArr.length; j++) {
      temp *= tempArr[j]
    }
    count += temp
  }
  return count
}

const queue = function (arr, num) {
  // 组合（对选择的比赛进行分组）
  let r = [];
  (function f (t, a, n) {
    if (n === 0) {
      return r.push(t)
    }
    for (let i = 0, l = a.length; i <= l - n; i++) {
      f(t.concat(a[i]), a.slice(i + 1), n - 1)
    }
  })([], arr, num)
  let X = doubleBetNote(r, num)
  let count = noteCount(X.A)
  let goldNum = calculategold(X.B)
  return {
    arr: r,
    count: count,
    goldNum: goldNum
  }
}

export {
  emptyArr,
  uniqueArr,
  queue,
  changeRangeVal,
  getMaxGold,
  formatFloat,
  getArrMax,
  getArrMin,
  forMatGameList,
  sortArrObj
}
