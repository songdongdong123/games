const verificationPhone = function (phone) {
  // console.log(phone)
  // 手机号验证
  let regExp = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
  return regExp.test(phone)
}
const verificationAuthCode = function (AuthCode) {
  // 4位验证码验证
  let regExp = /^\d{4}$/
  return regExp.test(AuthCode)
}
const verificationPassWord = function (password) {
  // 密码验证6位字母或数字
  let regExp = /^[a-z0-9]{6,}$/i
  // console
  return regExp.test(password)
}

export {
  verificationPhone,
  verificationAuthCode,
  verificationPassWord
}
