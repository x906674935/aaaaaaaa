import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import ShoppingCart from 'store/shoppingCart/index';
//vuex一律使用模块
export default new Vuex.Store({
  modules : {
    ShoppingCart
  }
})



