const drawBorder = function (Canvas, W) {
  let ctx = Canvas.getContext('2d')
  drawRectangle(ctx, W)
  // 绘制横坐标
  drawBorderX(ctx, W)
  // 绘制折线(主场)
  let homeArr = [-1, 1, 0, -1, 1, 0, 1, 0, 1, -1] // 主场胜负数据
  drawLineTop(ctx, W, 1, homeArr, 'red')
  // 绘制折线(主场)
  let awayArr = [0, -1, 1, -1, -1, 0, -1, 1, 1, -1]
  drawLineTop(ctx, W, 8, awayArr, 'green')
}
const drawRectangle = function (ctx, W) {
  // fillRect()四个参数分别是横坐标，纵坐标，长，宽
  // 这里*2是为了解决canvas绘制出来的图像模糊问题问题
  // ctx.fillStyle = 'rgba(0,0,0,0.2)'
  // ctx.fillRect(0, 0, 250 * 2, 20 * 2)
  let heightArr = [0, 20, 40, 70, 90, 110]
  let styleColor = ['#999', '#39c', '#f63', '#999', '#39c', '#f63']
  for (let i = 0; i < heightArr.length; i++) {
    ctx.fillStyle = styleColor[i]
    ctx.fillRect(0, heightArr[i] * 2, 300 * 2, 20 * 2)
  }
}
const drawBorderX = function (ctx, W) {
  for (let i = 0; i < 10; i++) {
    ctx.font = '25px Arial'
    ctx.fillStyle = '#000'
    ctx.fillText(i + 1, (i * 25) * 2 + 13, 68.8 * 2)
  }
}
const drawLineTop = function (ctx, W, x, currentArr, color) {
  let X = [x * 20, (x + 2) * 20, (x + 4) * 20]
  let arr = currentArr
  // console.log()
  let cv = 26
  // console.log(cv)
  ctx.beginPath()
  if (arr[0] === 0) {
    // ctx.moveTo(cv, 30 * 2)
    ctx.moveTo(cv, X[1])
  } else if (arr[0] === 1) {
    // ctx.moveTo(cv, 10 * 2)
    ctx.moveTo(cv, X[0])
  } else if (arr[0] === -1) {
    // ctx.moveTo(cv, 50 * 2)
    ctx.moveTo(cv, X[2])
  }
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === 0) {
      // ----------
      ctx.lineTo((i * 25) * 2 + cv, X[1])
      // --------------
    } else if (arr[i] === 1) {
      // --------------------
      ctx.lineTo((i * 25) * 2 + cv, X[0])
      // ------------------------
    } else if (arr[i] === -1) {
      // ------------------
      ctx.lineTo((i * 25) * 2 + cv, X[2])
    }
  }
  ctx.strokeStyle = color
  ctx.stroke()
  ctx.closePath()
}
export {
  drawBorder
}
