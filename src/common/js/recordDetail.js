const judgeMatchRes = function (matcharr) {
  // 单关比赛结果计算
  let resArr = matcharr.splice(2, matcharr.length)
  // console.log(resArr)
  if (resArr[0] === resArr[1]) {
    // 平局
    return 1
  } else if (resArr[0] > resArr[1]) {
    // 主队胜利
    return 3
  } else {
    // 客队胜利
    return 0
  }
}

export {
  judgeMatchRes
}
