import * as axios from '../common/js/axios.js'
// 收货地址相关接口
// 查询收货地址
const getUserAddressList = params => axios.post('/index.php/ranklist/getUserAddressList', params)

// 修改收货地址
const changeUserAddress = params => axios.post('/index.php/ranklist/changeUserAddress', params)

export {
  getUserAddressList,
  changeUserAddress
}
