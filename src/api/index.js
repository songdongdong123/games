import * as axios from '../common/js/axios.js'
const getIndexInfo = params => axios.post('/index.php/deal/getStatInfo', params)

export {
  getIndexInfo
}
