import Vue from 'vue';
import Vuetify from 'vuetify';
import Router from './router.js';
import Layout from './layouts/Layout.vue';
import FlashMessage from '@smartweb/vue-flash-message';
import 'vuetify/dist/vuetify.min.css';
import 'leaflet/dist/leaflet.css';
import _ from 'lodash';
import store from './store'

Vue.use(Vuetify);
Vue.use(FlashMessage);

const main = new Vue({
    el: '#app',
    vuetify: new Vuetify({}),
    router: Router,
    store,
    components: { Layout }
})

export default new Vuetify(main);