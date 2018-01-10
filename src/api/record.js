import * as axios from '../common/js/axios.js'
// 竞猜记录列表
const getRecordList = params => axios.post('/index.php/deal/getDealList', params)
// 竞猜记录详情
const getDealInfo = params => axios.post('/index.php/deal/getDealInfo', params)
// 单关投注页面数据统计接口
const getGuessStatistic = params => axios.post('/index.php/ranklist/getGuessStatistic', params)
// 单关投注页面数据统计接口
const getGuessRecord = params => axios.post('/index.php/ranklist/getGuessRecord', params)
// 改版之后下单
const submitRecord = params => axios.post('/index.php/deal/submit', params)
// 改版竞猜内页投注记录
const getOneMatchGuessRecord = params => axios.post('/index.php/match/getOneMatchGuessRecord', params)
// 改版之后的所有投注记录
const getAllMatchGuessRecord = params => axios.post('/index.php/match/getAllMatchGuessRecord', params)

export {
  getRecordList,
  submitRecord,
  getDealInfo,
  getGuessStatistic,
  getGuessRecord,
  getOneMatchGuessRecord,
  getAllMatchGuessRecord
}
