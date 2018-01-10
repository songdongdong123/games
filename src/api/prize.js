import * as axios from '../common/js/axios.js'
// 抽奖
const toRaffled = params => axios.post('/index.php/goods/buyGoods', params)

// 派奖
const sendGoods = params => axios.post('/index.php/goods/sendGoods', params)

// 派奖记录
const getGoodsList = params => axios.post('/index.php/goods/queryGoodsRecordList', params)

// 派奖详情
const getGoodsDetail = params => axios.post('/index.php/goods/queryGoodsRecordInfo', params)
export {
  toRaffled,
  sendGoods,
  getGoodsList,
  getGoodsDetail
}
