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
        test(){
            store.commit('addToCartInfo', this.mielInfo)
        }
    }
}