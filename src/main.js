import Vue from 'vue'
import App from './App.vue'
//引入路由
import router from './router'
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  //注册路由:底下的写法KV一致省略V【router小写的】
  //注册路由信息:当这里书写router的时候，组件神伤都拥有$route,$router属性
  router
}).$mount('#app')
