import * as axios from '../common/js/axios.js'
const getGoodList = params => axios.post('/index.php/goods/queryGoodsInfoList', params)

const getGoodDetail = params => axios.post('/index.php/goods/queryGoodsInfo', params)

export {
  getGoodList,
  getGoodDetail
}
