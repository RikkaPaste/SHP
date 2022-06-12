import { reqCartList, reqDeleteCartById, reqUpdateChechedById } from "@/api"
const state = {
    cartlist: []
}
const mutations = {
    GETCARTLIST(state, cartlist) {
        state.cartlist = cartlist;
    }
}
const actions = {
    //获取购物车列表数据
    async getCartList({ commit }) {
        let result = await reqCartList();
        if (result.code == 200) {
            commit('GETCARTLIST', result.data);
        }
    },
    //删除购物车某一个产品
    async deleteCaryListBySkuId({ commit }, skuId) {
        let result = await reqDeleteCartById(skuId);
        if (result.code == 200) {
            return 'ok';
        } else {
            return Promise.reject(new Error('faile'));
        }
    },
    //修改购物车某一个产品的选中状态
    async updateCheckedById({ commit }, { skuId, isChecked }) {
        let result = await reqUpdateChechedById(skuId, isChecked);
        if (result.code == 200) {
            return 'ok';
        } else {
            return Promise.reject(new Error('faile'));
        }
    },
    //删除全部勾选的产品
    deleteAllCheckedCart({ dispatch, getters }) {
        //context:小仓库，commit【提交mutations修改state】 getters【计算属性】 dispatch【派发action】 state【当前仓库数据】
        //获取购物车中全部的产品（是一个数组）
        let PromiseAll = [];
        getters.cartList.cartInfoList.forEach(item => {
            let promise = item.isChecked?dispatch('deleteCaryListBySkuId', itme.skuId):'';
            //将每一次返回的Promise添加到数组当中
            Promise.push(promise);
        });
        //只要全部p1|p2...都成功，返回结果即为成功
        //如果有一个失败，返回即为失败结果
        return Promise.all(PromiseAll);
    }
}
const getters = {
    cartList(state) {
        return state.cartList[0] || {};
    },
    //计算出来购物车数据
    cartInfoList(state) {
        return this.cartList
    }
}
export default {
    state,
    mutations,
    actions,
    getters
}