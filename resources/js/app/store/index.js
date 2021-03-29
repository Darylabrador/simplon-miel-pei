import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';
import _ from 'lodash';

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
    storage: window.localStorage
})

export default new Vuex.Store({
    plugins: [vuexLocal.plugin],

    state: {
        cart: [],
        isLogged: false
    },

    mutations: {
        connect(state) {
            state.isLogged = true;
        },
        disconnect(state) {
            state.isLogged = false;
        },
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
        },
        emptyCart(state){
            state.cart = []
        },
    },

    actions: {

    },
    
    getters: {

    }
})