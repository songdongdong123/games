import * as axios from '../common/js/axios.js'
const getSignIn = params => axios.post('/index.php/activity/getSignIn', params)
const signIn = params => axios.post('/index.php/activity/signIn', params)

export {
  getSignIn,
  signIn
}
