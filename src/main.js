// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import util from '*/util'
import store from './store'
import Mint from 'mint-ui'
import VueLazyload from 'vue-lazyload'
import 'mint-ui/lib/style.css'
import fastclick from 'fastclick'
fastclick.attach(document.body)

Vue.use(Mint)
Vue.use(VueLazyload)
Vue.use(util)
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  // window.scrollTo(0, 20)
  next()
})
