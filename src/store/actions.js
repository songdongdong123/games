import * as types from './mutation-types'
import { getSimpleUserInfo } from 'api/userinfo'
const ERR_CODE = 0
const RET_CODE = 0

const setSignState = function ({commit, state}, {info, signState}) {
  commit(types.SET_AWARD_INFO, info)
  commit(types.SET_SIGN_STATE, signState)
}

const betMatch = function ({commit, state}, {info, betCarState}) {
  commit(types.SET_BET_ITEM, info)
  commit(types.SET_BET_CAR, betCarState)
}

// 获取用户简要信息
const getUserInfo = function ({commit, state}) {
  getSimpleUserInfo({}).then(res => {
    if (res.data.errCode === ERR_CODE && res.data.retCode === RET_CODE) {
      commit(types.SET_USER_INFO, res.data.data)
    }
  })
}

// 修改投注弹窗和投注关闭弹窗状态
const setBetCarClose = function ({commit, state}, {falgA, falgB, falgC}) {
  commit(types.SET_BET_CAR, falgA)
  commit(types.SET_CLOSE_BET_CAR, falgB)
  commit(types.SET_EMPTY_BET_STATE, falgC)
}

// 关闭投注弹窗，和显示金币不足弹窗
const closeBetandshowError = function ({commit, state}, {falgA, falgB}) {
  commit(types.SET_BET_CAR, falgA)
  commit(types.SET_BET_ERROR, falgB)
}

// 设置确认兑换金币后，弹窗状态和兑换行为确定状态

const setAffirmModeMsg = function ({commit, state}, {falgA, falgB}) {
  commit(types.SET_AFFIRM_PAY_STATE, falgA)
  commit(types.SET_SUBMIT_AFFIRM_GOLD, falgB)
}

export {
  setSignState,
  betMatch,
  getUserInfo,
  setBetCarClose,
  closeBetandshowError,
  setAffirmModeMsg
}
