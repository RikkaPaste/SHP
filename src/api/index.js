//当前这个模块：API进行统一管理
import requests from "./request";
import mockRequests from './mockAjax'
//三级联动接口
///api/product/getBaseCategoryList get 无参数 
//发请求:axios发请求返回结果Promise对象
export const reqCategoryList = () => requests({ url: 'product/getBaseCategoryList', method: 'get' })
//切记:当前数据执行需要把服务器返回结果返回
//获取banner（Home首页轮播图接口）
export const reqGetBannerList = () => mockRequests.get('/banner')
//获取floor数据
export const reqFloorList = () => mockRequests.get('/floor');
//获取搜索模块数据 地址:/api/list 请求的方式:post  参数：需要带参数
//当前这个函数需不需要接受外部传递参数
//当前这个接口，（获取搜索模块的数据），给服务器传递一个默认参数【至少是一个空对象】
export const reqGetSearchInfo = (params) => requests({ url: '/list', method: 'post', data: params })
//获取产品详情信息的接口  URL:/api/item/{skuId}  请求方式：get
export const reqGoodsInfo = (skuId) => requests({ url: `/item/${skuId}`, method: 'get' },)
//将产品添加到购物车中（或者更新某一个产品的个数）
export const reqAddOrUpdateShopCart = (skuId, skuNum) => requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'post' })

//获取购物车列表数据接口
//URL:/api/cart/cartList method:get
export const reqCartList = () => requests({ url: '/cart/cartList', method: 'get' })

//删除购物车产品的接口
//URL:/api/cart/deleteCart/{skuId} method:DELETE
export const reqDeleteCartById = (skuId) => requests({ url: `/cart/deleteCart/${skuId}`, method: 'delete' })
//修改商品的选中状态
//URL:/api/cart/checkCart/{skuId}/{isChecked} method:get
export const reqUpdateChechedById = (skuId, isChecked) => requests({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: 'get' })

//获取验证码
//URL:/api/user/passport/sendCode/{phone} method:get
export const reqGetCode = (phone) => requests({ url: `/user/passport/sendCode/${phone}`, method: 'get' })

//注册
//URL:/api/user/passport/register method:post phone code password
export const reqUserRegister = (data) => requests({ url: `/user/passport/register`, method: 'post', data })

//登录 
//URL:/api/user/passport/login method:post phone password
export const reqUserLogin = (data) => requests({ url: '/user/passport/login', method: 'post', data })