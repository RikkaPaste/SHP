//配置路由的地方
import Vue from 'vue'
import VueRouter from 'vue-router'
//使用插件
Vue.use(VueRouter);
//引入路由组件
import Home from '@/views/Home'
import Login from '@/views/Login'
import Register from '@/views/Register'
import Search from '@/views/Search'
//先把VueRouter原型对象的push，先保存一份
let orginPush = VueRouter.prototype.push;
let orginReplace=VueRouter.prototype.replace;
//重写push|replace
//第一个参数：告诉原来push方法，你往哪里跳转（传递哪些参数）
//第二个参数：成功的回调
//第三个参数：失败的回调
    //call||apply区别：
    //相同点，都可以调用函数一次，都可以篡改函数的上下文一次
    //不同点：call与apply传递参数：call传递参数用逗号隔开，apply方法执行，传递数组
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        orginPush.call(this, location, resolve, reject)
    } else {
        orginPush.call(this, location, () => { }, () => { })
    }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        orginReplace.call(this, location, resolve, reject)
    } else {
        orginReplace.call(this, location, () => { }, () => { })
    }
}
//配置路由
export default new VueRouter({
    //配置路由
    routes: [
        {
            path: '/home',
            component: Home,
            meta: { show: true }
        },
        {
            path: '/login',
            component: Login,
            meta: { show: false }
        },
        {
            path: '/register',
            component: Register,
            meta: { show: false }
        },
        {
            path: '/search/:keyword',
            component: Search,
            meta: { show: true },
            name: 'search',
            //路由组件能不能传递props数据?
            //布尔值写法
            // props:true
            //对象写法:额外的给路由组件传递一些props
            // props:{a:1,b:2}
            //函数写法：可以把params参数、query参数，通过props传递给路由组件
            props: ({ params: { keyword }, query: { k } }) => ({ keyword, k })
        },
        //重定向，在项目跑起来的时候，访问/,立马让他定向到首页
        {
            path: '*',
            redirect: '/home'
        }
    ]
})