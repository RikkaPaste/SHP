//引入一级路由组件
import Home from '@/views/Home'
import Login from '@/views/Login'
import Register from '@/views/Register'
import Search from '@/views/Search'
import Detail from '@/views/Detail'
import AddCartSuccess from '@/views/AddCartSuccess'
import ShopCart from '@/views/ShopCart'
import Trade from '@/views/Trade'
import Pay from '@/views/Pay'
import PaySuccess from '@/views/PaySuccess'
import Center from '@/views/Center'
//引入二级路由组件
import MyOrder from '@/views/Center/myOrder'
import GroupOrder from '@/views/Center/groupOrder'

export default [
    {
        path: '/center',
        component: Center,
        meta: { show: true },
        //二级路由组件
        children: [
            {
                path: 'myorder',
                component: MyOrder,
            },
            {
                path: 'grouporder',
                component: GroupOrder,
            },
            {
                path: '/center',
                redirect:'/center/myorder'
            }
        ]
    },
    {
        path: '/paysuccess',
        component: PaySuccess,
        meta: { show: true }
    },
    {
        path: '/pay',
        component: Pay,
        meta: { show: true }
    },
    {
        path: '/trade',
        component: Trade,
        meta: { show: true }
    },
    {
        path: '/shopcart',
        component: ShopCart,
        meta: { show: true }
    },
    {
        path: '/addcartsuccess',
        name: 'addcartsuccess',
        component: AddCartSuccess,
        meta: { show: true }
    },
    {
        path: '/detail/:skuid',
        component: Detail,
        meta: { show: true }
    },
    {
        path: '/home',
        component: Home,
        //路由元信息key不能瞎写:只能叫做meta
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
