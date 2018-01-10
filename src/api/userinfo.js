import * as axios from '../common/js/axios.js'
const getRandNickname = params => axios.post('/index.php/account/randNickname', params)
const changeNickNameAndPic = params => axios.post('/index.php/account/changeNickNameAndPic', params)
const getSimpleUserInfo = params => axios.post('/index.php/account/getSimpleUserInfo', params)

export {
  getRandNickname,
  changeNickNameAndPic,
  getSimpleUserInfo
}
