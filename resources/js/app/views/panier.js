import { apiService } from '../services/apiService.js';
import store from '../store/index.js';

export default {
    components: {

    },

    props: {

    },

    data() {
        return {
            productArray: []
        }
    },

    watch: {

    },

    created() {
        console.log(store.state.cart)
    },

    methods: {

    
    }
}