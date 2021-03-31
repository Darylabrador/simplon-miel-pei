import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';
import { apiService } from '../services/apiService.js';

import _ from 'lodash';

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
    storage: window.localStorage
})

export default new Vuex.Store({
    plugins: [vuexLocal.plugin],

    state: {
        cart: [],
        updatedCart: [],
        isLogged: false,
        userRole: null
    },

    mutations: {
        connect(state, payload) {
            state.isLogged = true;
            state.userRole = payload.role;
        },

        addToCartInfo(state, payload) {
            if(_.isArray(payload)) {
                payload.forEach(prod => {
                    let sameElement  = state.cart.find(element => element.id == prod.id);
                    if(sameElement) {
                        sameElement.amountDefault += prod.amountDefault
                    } else {
                        state.cart.push(prod)
                    }
                });
            } else {
                let sameElement = state.cart.find(element => element.id == payload.id);
                if(sameElement) {
                    if (sameElement.amountDefault != sameElement.quantity) {
                        sameElement.amountDefault += 1;
                    }
                } else {
                    state.cart.push(payload);
                } 
            }

            if(state.isLogged) {
                this.dispatch('saveCart');
            }
        },

        removeFromCart(state, payload){
            let filtered = state.cart.filter(element => element.id != payload.id);
            state.cart = filtered;

            if (state.isLogged) {
                this.dispatch('deleteFromCart', payload);
            }
        },

        emptyCart(state){
            state.cart = []
        },

        disconnect(state) {
            state.isLogged = false;
            state.cart = [];
            state.userRole = null;
        },
    },

    actions: {
        async saveCart() {
            try {
                if(this.state.cart.length != 0) {
                    await apiService.post(`${location.origin}/api/shoppingcart/save`, { cart: this.state.cart});
                }
            } catch (error) {
                console.error(error)
            }
        },
        async deleteFromCart({commit, state}, payload) {
            try {
                await apiService.delete(`${location.origin}/api/shoppingcart/${payload.id}`);
            } catch (error) {
                console.error(error)
            }
        },
    },
    
    getters: {

    }
})