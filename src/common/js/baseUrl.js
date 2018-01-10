export default function getBaseUrl () {
  let [baseUrl, urls, protocol] = ['http://m.dev.pearlba.com', location.href.toLowerCase(), 'http://']
  // 判断协议
  if (location.protocol === 'https:') {
    protocol = 'https://'
  }
  // 测试环境判断（这里我们都是在本地开发环境）
  // console.log(urls.match('pearlba.com')[0])
  if (urls.match(/m.pearlba.com/) && urls.match(/m.pearlba/)[0] === 'm.pearlba') {
    baseUrl = protocol + 'dongdongapi'
  }
  if (urls.match(/m.pearlba.com/) && urls.match(/m.pearlba/)[0] === 'm.pearlba') {
    baseUrl = protocol + 'm.pearlba.com'
  }
  // 开发环境判断
  return baseUrl
}
