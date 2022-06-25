//配置路由的地方
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
//使用插件
Vue.use(VueRouter);
//引入store
import store from '@/store'
//先把VueRouter原型对象的push，先保存一份
let orginPush = VueRouter.prototype.push;
let orginReplace = VueRouter.prototype.replace;
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
let router = new VueRouter({
    //配置路由
    //第一:路径的前面需要有//(不是二级路由)
    //路径中单词都是小写的
    //component右侧V不需要加单引号【字符串：组件是对象（VueComponent类的实例）】
    routes,
    //滚动行为
    scrollBehavior(to, from, savedPosition) {
        //返回的这个y=0,代表滚动条在最上方
        return { y: 0 }
    }
})

//全局守卫：前置守卫（在路由跳转之间进行判断）
router.beforeEach(async (to, from, next) => {
    //to:可以获取到你要跳转到那个路由信息
    //from:可以获取到你从哪个路由而来的信息
    //next:放行函数 next()放行 next('/login')放行到指定路由 next(false)
    //用户登录了，才会有token，未登录一定不会有token
    let token = store.state.user.token;
    //用户信息
    let name = store.state.user.userInfo.name;
    //用户已经登录了
    if (token) {
        //用户已经登录了还想去login[不能去，停留在首页]
        if (to.path == '/login'||to.path=='/register') {
            next(false);
        } else {
            //已经登录了，访问的是非登录与注册
            //登录了且拥有用户信息放行
            if (name) {
                next();
            } else {
                //登录了且没有用户信息
                //在路由跳转之前获取用户信息
                try {
                    //获取用户信息成功
                    await store.dispatch('getUserInfo');
                    next();
                } catch (error) {
                    //token失效了
                    //清除token
                    await store.dispatch('userLogout');
                    next('/login');
                }
            }
        }
    } else {
        //未登录暂时没有处理完毕，先这个样子后期再处理
        next();
    }
})
export default router;