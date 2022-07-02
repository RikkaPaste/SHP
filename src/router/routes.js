//引入一级路由组件
/**
 * 当打包构建应用时，JavaScript 包含变得非常大，影响页面加载。
 * 如果我们能把不同路由对应的组件分割成不同代码块，然后当路由被访问的时候才加载对应组件，这样就更加高效了。
 */
export default [
    {
        path: '/center',
        component: () => import('@/views/Center'),
        meta: { show: true },
        //二级路由组件
        children: [
            {
                path: 'myorder',
                component: () => import('@/views/Center/myOrder'),
            },
            {
                path: 'grouporder',
                component: () => import('@/views/Center/groupOrder'),
            },
            {
                path: '/center',
                redirect: '/center/myorder'
            }
        ]
    },
    {
        path: '/paysuccess',
        component: () => import('@/views/PaySuccess'),
        meta: { show: true }
    },
    {
        path: '/pay',
        component: () => import('@/views/Pay'),
        meta: { show: true },
        //路由独享守卫
        beforeEnter: (to, from, next) => {
            //去交易页面，必须是从购物车而来
            if (from.path == '/trade') {
                next();
            } else {
                //其他的路由组件而来，停留在当前
                next(false);
            }
        }
    },
    {
        path: '/trade',
        component: () => import('@/views/Trade'),
        meta: { show: true },
        //路由独享守卫
        beforeEnter: (to, from, next) => {
            //去交易页面，必须是从购物车而来
            if (from.path == '/shopcart') {
                next();
            } else {
                //其他的路由组件而来，停留在当前
                next(false);
            }
        }
    },
    {
        path: '/shopcart',
        component: () => import('@/views/ShopCart'),
        meta: { show: true }
    },
    {
        path: '/addcartsuccess',
        name: 'addcartsuccess',
        component: () => import('@/views/AddCartSuccess'),
        meta: { show: true }
    },
    {
        path: '/detail/:skuid',
        component: () => import('@/views/Detail'),
        meta: { show: true }
    },
    {
        path: '/home',
        component: () => import('@/views/Home'),
        //路由元信息key不能瞎写:只能叫做meta
        meta: { show: true }
    },
    {
        path: '/login',
        component: () => import('@/views/Login'),
        meta: { show: false }
    },
    {
        path: '/register',
        component: () => import('@/views/Register'),
        meta: { show: false }
    },
    {
        path: '/search/:keyword',
        component: () => import('@/views/Search'),
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
