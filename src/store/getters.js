// 获取签到弹窗状态
const showSignModel = state => state.showSignModel
// 获取当前签到天数
const currentday = state => state.currentday
// 获取竞猜中心导航编辑弹窗状态
const chooseClaState = state => state.chooseClaState
// 获取签到成功弹窗状态
const signState = state => state.signState
// 签到奖励信息
const awardInfo = state => state.awardInfo
// 获取竞猜内页，竞猜详情，弹窗状态
const matchState = state => state.matchState
// 获取投注成功弹窗状态
const betSuccess = state => state.betSuccess
// 获取投注失败弹窗状态
const betError = state => state.betError
// 获取投注框状态
const betCarState = state => state.betCarState
// 获取投注选项
const betItem = state => state.betItem
// 获取用户简要信息
const userInfo = state => state.userInfo
// 获取关闭投注确认框状态
const closeBetCarState = state => state.closeBetCarState
// 获取竞猜中心导航条索引
const guessCenterIndex = state => state.guessCenterIndex
// 获取清空投注金币的状态
const emptyBetState = state => state.emptyBetState
// 获取频道编辑弹窗状态
const channelState = state => state.channelState
// 获取金币兑换确认弹窗
const affirmPayState = state => state.affirmPayState
// 获取确认兑换金币的状态
const submitAffurmGold = state => state.submitAffurmGold
// 获取确认抽奖弹窗状态
const volumeState = state => state.volumeState
// 获取商品信息
const productMsg = state => state.productMsg
// 获取编辑地址信息
const addressMsg = state => state.addressMsg
export {
  showSignModel,
  currentday,
  chooseClaState,
  signState,
  awardInfo,
  matchState,
  betSuccess,
  betError,
  betCarState,
  betItem,
  userInfo,
  closeBetCarState,
  guessCenterIndex,
  emptyBetState,
  channelState,
  affirmPayState,
  submitAffurmGold,
  volumeState,
  productMsg,
  addressMsg
}
