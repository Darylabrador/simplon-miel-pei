import EventBus from '../../evt-bus.js';

export default {
    components: {

    },

    props: {
        mielInfo: {}
    },

    data() {
        return {
            dialog: false,
        }
    },

    watch: {

    },

    created() {
    },

    methods: {
        async validate() {
            try {
                this.$store.commit('removeFromCart', this.mielInfo);
                EventBus.$emit('increment', 1);
                EventBus.$emit('deleted', this.mielInfo);
                this.dialog = false;
            } catch (error) {
                this.flashMessage.error({
                    title: loginData.message,
                    time: 8000,
                })
            }
        }
    }
}