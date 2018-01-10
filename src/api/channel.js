import * as axios from '../common/js/axios.js'
// 赛事频道相关接口
// 查询
const getChannelList = params => axios.post('/index.php/ranklist/getChannelList', params)
// 修改
const setChannelList = params => axios.post('/index.php/ranklist/changeChannelList', params)

export {
  getChannelList,
  setChannelList
}
