import * as axios from '../common/js/axios.js'
const toPay = params => axios.post('/index.php/pay/recharge', params)
const exchange = params => axios.post('/index.php/pay/exchange', params)

export {
  toPay,
  exchange
}
