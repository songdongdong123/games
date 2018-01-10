// 赛事列表接口
import * as axios from '../common/js/axios.js'
const getMatchList = params => axios.post('/index.php/data/getMatchList', params)

// 改版之后的赛事列表
const getQueryMatchList = params => axios.post('/index.php/match/queryMatchList', params)
// 赛事收藏
const favoriteMatch = params => axios.post('/index.php/ranklist/favoriteMatch', params)
// 赛事内页详情
const getMatchOddList = params => axios.post('/index.php/match/queryMatchOddList', params)

// const getData = params => axios.get('http://ssl.gongyi.qq.com/cgi-bin/WXSearchCGI', params)

export {
  getMatchList,
  getQueryMatchList,
  favoriteMatch,
  getMatchOddList
}
