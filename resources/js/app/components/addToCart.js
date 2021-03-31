import EventBus from '../evt-bus.js';

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
            EventBus.$emit('defaultData', true);
            EventBus.$emit('increment', 1);
        }
    }
}