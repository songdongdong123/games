import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: (resolve) => {
        require(['@/components/Login'], resolve)
      },
      meta: {
        title: '用户登陆'
      }
    },
    {
      path: '/sign_in',
      name: 'signIn',
      component: (resolve) => {
        require(['@/components/sign_in/sign_in'], resolve)
      },
      meta: {
        title: '用户注册'
      }
    },
    {
      path: '/forget_pw',
      name: 'forgetPw',
      component: (resolve) => {
        require(['@/components/forget_pw/forget_pw'], resolve)
      },
      meta: {
        title: '忘记密码'
      }
    },
    {
      path: '/random_name',
      name: 'random_name',
      component: (resolve) => {
        require(['@/components/random_name/random_name'], resolve)
      },
      meta: {
        title: '填写昵称'
      }
    },
    {
      path: '/welcome',
      name: 'welcome',
      component: (resolve) => {
        require(['@/components/welcome/welcome'], resolve)
      },
      meta: {
        title: '欢迎进入'
      }
    },
    {
      path: '/full_in_info',
      name: 'fullInInfo',
      component: (resolve) => {
        require(['@/components/full_in_info/full_in_info'], resolve)
      },
      meta: {
        title: '用户信息'
      }
    },
    {
      path: '/mecenter',
      name: 'MeCenter',
      component: (resolve) => {
        require(['@/components/me/mecenter'], resolve)
      },
      meta: {
        title: '个人中心'
      }
    },
    {
      path: '/memessage',
      name: 'MeMessage',
      component: (resolve) => {
        require(['@/components/me/memessage'], resolve)
      },
      meta: {
        title: '个人信息'
      }
    },
    {
      path: '/info',
      name: 'Info',
      component: (resolve) => {
        require(['@/components/me/info'], resolve)
      },
      meta: {
        title: '消息通知'
      }
    },
    {
      path: '/guess_detail',
      name: 'GuessDetail',
      component: (resolve) => {
        require(['@/components/guess/guess_detail'], resolve)
      },
      meta: {
        title: '赛事竞猜'
      }
    },
    {
      path: '/product_detail',
      name: 'ProductDetail',
      component: (resolve) => {
        require(['@/components/shop_mall/product_detail'], resolve)
      },
      meta: {
        title: '奖品详情'
      }
    },
    {
      path: '/addressmanage',
      name: 'Addressmanage',
      component: (resolve) => {
        require(['@/components/addressmanage/addressmanage'], resolve)
      },
      meta: {
        title: '地址填写'
      }
    },
    {
      path: '/top_up',
      name: 'TopUp',
      component: (resolve) => {
        require(['@/components/addressmanage/top_up'], resolve)
      },
      meta: {
        title: '充值'
      }
    },
    {
      path: '/newaddress',
      name: 'NewAddress',
      component: (resolve) => {
        require(['@/components/addressmanage/newaddress'], resolve)
      },
      meta: {
        title: '新建收货地址'
      }
    },
    {
      path: '/addresslist',
      name: 'AddressList',
      component: (resolve) => {
        require(['@/components/addressmanage/addresslist'], resolve)
      },
      meta: {
        title: '地址管理'
      }
    },
    {
      path: '/prizeorder',
      name: 'PrizeOrder',
      component: (resolve) => {
        require(['@/components/prizeorder/prizeorder'], resolve)
      },
      meta: {
        title: '我的奖品'
      }
    },
    {
      path: '/prizeorderdetail',
      name: 'PrizeOrderDetail',
      component: (resolve) => {
        require(['@/components/prizeorder/prizeorderdetail'], resolve)
      },
      meta: {
        title: '兑换成功'
      }
    },
    {
      path: '/orderdetail',
      name: 'OrderDetail',
      component: (resolve) => {
        require(['@/components/prizeorder/orderdetail'], resolve)
      },
      meta: {
        title: '订单详情'
      }
    },
    {
      path: '/pay',
      name: 'Pay',
      component: (resolve) => {
        require(['@/components/pay/pay'], resolve)
      },
      meta: {
        title: '充值'
      }
    },
    {
      path: '/choose_class',
      name: 'chooseClass',
      component: (resolve) => {
        require(['@/components/choose_class/choose_class'], resolve)
      },
      meta: {
        title: '频道分类'
      }
    },
    {
      path: '/index',
      name: 'Index',
      component: (resolve) => {
        require(['@/components/index/index'], resolve)
      },
      redirect: '/guess_center',
      meta: {
        title: '首页'
      },
      children: [
        {
          path: '/guess_center',
          name: 'GuessCenter',
          component: (resolve) => {
            require(['@/components/index/guess_center'], resolve)
          },
          meta: {
            title: '竞猜'
          }
        },
        {
          path: '/recordlist',
          name: 'RecordList',
          component: (resolve) => {
            require(['@/components/me/recordlist'], resolve)
          },
          meta: {
            title: '投注记录'
          }
        },
        {
          path: '/podium',
          name: 'Podium',
          component: (resolve) => {
            require(['@/components/shop_mall/podium'], resolve)
          },
          meta: {
            title: '领奖台'
          }
        }
      ]
    }
  ]
})
