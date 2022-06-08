import Vue from 'vue'
import Vuex from 'vuex'
//需要使用插件一次
Vue.use(Vuex);
//引入小仓库
import home from './home.js';
import search from './search.js';
import detail from './detail.js';
import shopcart from './shopcart.js';
//对外暴露store类的实例
export default new Vuex.Store({
    //实现Vue仓库模块式开发存储数据
    modules: {
        home,
        search,
        detail,
        shopcart
    }
})