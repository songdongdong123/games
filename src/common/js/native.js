const getScroll = function () {
  // 获取页面被卷曲的高度
  return {
    top: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
  }
}

const scrollToTop = function () {
  // 使页面滚动到固定的位置
  let timer = setInterval(() => {
    let leader = 0
    let target = getScroll().top
    let speed = (target - leader) / 10
    speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed)
    leader = leader + speed
    scrollTo(0, target - leader)
    if (target === 0) {
      clearInterval(timer)
    }
  }, 0)
}

export {
  scrollToTop
}
