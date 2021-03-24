import EventBus from '../evt-bus.js';
import store from '../store/index.js';

export default {
    components: {
 
    },

    props: {
        mielInfo: {}
    },

    data() {
        return {
  
        }
    },

    watch: {

    },

    created() {
  
    },

    methods: {
        addToCart(){
            this.$store.commit('addToCartInfo', this.mielInfo);
            EventBus.$emit('increment', 1);
        }
    }
}