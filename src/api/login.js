import * as axios from '../common/js/axios.js'

const verifyLogin = params => axios.post('/index.php/account/getLoginSecret', params)
const Login = params => axios.post('/index.php/account/login', params)
const getAuthCode = params => axios.post('/index.php/common/sendAuthCode', params)
const regUser = params => axios.post('/index.php/account/regUser', params)
const findPassword = params => axios.post('/index.php/account/findPassword', params)
export {
    verifyLogin,
    Login,
    getAuthCode,
    regUser,
    findPassword
}
