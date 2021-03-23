import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        cart: []
    },
    mutations: {
        addToCartInfo(state, payload) {
            state.cart.push(payload)
        },
        emptyCart(state){
            state.cart = []
        }
    }
})