
// 导入vue-router
import VueRouter from 'vue-router'
import Login from './views/Login'
import List from './views/List'
import Detail from './views/Detail'
import ScanCode from './views/ScanCode'

// 创建路由对象
var router = new VueRouter({
    routes: [
        {
          path:'/',
          redirect:'/login'
        },
        {
            path:'/login',component:Login
        },
        {            
            path: '/list',component: List,
            meta: {
                keepAlive: true
            }
        },
        {            
            path: '/detail',
            query:{},
            component: Detail
        },
        {
            path:'/scancode',component:ScanCode
        }
    ]
})

router.beforeEach((to,from,next)=>{
    // to 将要访问的路径
    // from 代表从哪个路径跳转而来
    // next 是一个函数，表示放行
    // next() 放行 next('/login') 强制跳转
    if(to.path=='/login') return next()
    // 获取token
    const tokenStr=window.sessionStorage.getItem('token')
    if(!tokenStr) return next('/login')
    next()
})

//把router向外暴露
export default router