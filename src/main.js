import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import MintUI from 'mint-ui'

import axios from 'axios'


// 导入全局样式表
import 'normalize.css'
import './assets/css/global.css'
import 'mint-ui/lib/style.css'

//配置请求的路径
// axios.defaults.baseURL='http://localhost:8081/api/'
axios.defaults.baseURL='http://172.20.109.163:10000/Lesso/'
// 设置拦截器
axios.interceptors.request.use(config => {
  // config.headers.Authorization=window.sessionStorage.getItem('token')
  config.headers.token=window.sessionStorage.getItem('token')
  // 在最后 必须 return config
  return config
})
// response拦截器
axios.interceptors.response.use(config=>{
  return config
})
// 挂载到vue
Vue.prototype.$http = axios
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
