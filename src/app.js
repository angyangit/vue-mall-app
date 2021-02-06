import './utils/amfe-flexible.ts'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/index.scss'
import fastclick from 'fastclick'
import VueLazyload from 'vue-lazyload'
const VConsole = require('vconsole')
const vConsole = new VConsole()
vConsole.setOption('maxLogNumber', 5000)
Vue.config.productionTip = false
fastclick.attach(document.body)

const errorimage = require('./assets/images/ic_launcher.png')
const loadimage = require('./assets/images/ic_launcher.png')

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: errorimage,
  loading: loadimage,
  attempt: 1
})
new Vue({
  el: '#app',
  router,
  store,
  render: (h) => h(App),
})
