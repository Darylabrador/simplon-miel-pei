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
        this.productArray = this.$store.state.cart;
        console.log(this.productArray);
    },

    methods: {

    
    }
}