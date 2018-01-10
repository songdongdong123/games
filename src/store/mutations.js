import * as types from './mutation-types'
// import { formatFloat } from '*/common'
const mutations = {
  [types.SET_SHOW_SIGN_MODEL] (state, showSignModel) {
    state.showSignModel = showSignModel
  },
  [types.SET_CURRENT_DAY] (state, currentday) {
    state.currentday = currentday
  },
  [types.SET_CHOOSE_CLASS] (state, chooseState) {
    state.chooseClaState = chooseState
  },
  [types.SET_SIGN_STATE] (state, signState) {
    state.signState = signState
  },
  [types.SET_AWARD_INFO] (state, info) {
    state.awardInfo = info
  },
  [types.SET_MATCH_STATE] (state, falg) {
    state.matchState = falg
  },
  [types.SET_BET_SUCCESS] (state, falg) {
    state.betSuccess = falg
  },
  [types.SET_BET_ERROR] (state, falg) {
    state.betError = falg
  },
  [types.SET_BET_CAR] (state, falg) {
    state.betCarState = falg
  },
  [types.SET_BET_ITEM] (state, info) {
    state.betItem = info
  },
  [types.SET_USER_INFO] (state, userInfo) {
    state.userInfo = userInfo
  },
  [types.SET_CLOSE_BET_CAR] (state, falg) {
    state.closeBetCarState = falg
  },
  [types.SET_GUESS_CENTER_INDEX] (state, index) {
    state.guessCenterIndex = index
  },
  [types.SET_EMPTY_BET_STATE] (state, falg) {
    state.emptyBetState = falg
  },
  [types.SET_CHANNEL_STATE] (state, falg) {
    state.channelState = falg
  },
  [types.SET_AFFIRM_PAY_STATE] (state, falg) {
    state.affirmPayState = falg
  },
  [types.SET_SUBMIT_AFFIRM_GOLD] (state, falg) {
    state.submitAffurmGold = falg
  },
  [types.SET_VOLUME_STATE] (state, falg) {
    state.volumeState = falg
  },
  [types.SET_PRODUCT_MSG] (state, promsg) {
    state.productMsg = promsg
  },
  [types.SET_ADDRESS_MSG] (state, addmsg) {
    state.addressMsg = addmsg
  }
}

export default mutations
