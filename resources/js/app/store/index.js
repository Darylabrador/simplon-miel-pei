import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        cart: []
    },
    mutations: {
        addToCartInfo(state) {
            state.cart.push(state)
        },
        emptyCart(state){
            state.cart = []
        }
    }
})