import Vue from 'vue';
import Vuex from 'vuex';
import _ from 'lodash';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        cart: [],
    },
    mutations: {
        addToCartInfo(state, payload) {
            if(_.includes(state.cart, payload)) {
                let sameElement = state.cart.find(element => element.id == payload.id);
                if (sameElement.amountDefault != sameElement.quantity) {
                    sameElement.amountDefault += 1;
                }
            } else {
                state.cart.push(payload)
            }
        },
        removeFromCart(state, payload){
            let filtered = state.cart.filter(element => element.id != payload.id);
            state.cart = filtered;
            console.log(state.cart)
        },
        emptyCart(state){
            state.cart = []
        },
    }
})