import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import MintUI from 'mint-ui'

import axios from 'axios'



// 导入全局样式表
import 'normalize.css'
import './assets/css/global.css'
import 'mint-ui/lib/style.css'


Vue.config.productionTip = false

// 挂载到vue
Vue.prototype.$http = axios

//注册路由
Vue.use(VueRouter)
Vue.use(MintUI)
// Vue.use(ElementUI)

import router from './router'
new Vue({
  render: h => h(App),
  router  // 将路由对象挂载到VM上
}).$mount('#app')
