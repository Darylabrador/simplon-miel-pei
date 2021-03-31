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
        userRole: null,
        identity: null,
    },

    mutations: {
        connect(state, payload) {
            state.isLogged = true;
            state.userRole = payload.role;
            state.identity = payload.identity;
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
            state.cart = [];
            state.isLogged = false;
            state.userRole = null;
            state.identity = null;
        },

        updateIdentity(state, payload){
            state.identity = payload;
        }
    },

    actions: {
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