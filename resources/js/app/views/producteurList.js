import { apiService } from '../services/apiService.js';

export default {
    components: {

    },

    props: {

    },

    data() {
        return {
            loading: false,
            producers: []
        }
    },

    watch: {

    },

    created() {
        this.getProducers()
    },

    methods: {
        async getProducers() {
            try {
                const producerReq = await apiService.get(`${location.origin}/api/producteurs`);
                const producerData = producerReq.data.data;
                this.producers = producerData;
                console.log(this.producers)
            } catch (error) {
                this.flashMessage.error({
                    title: error.msg,
                    time: 8000,
                })
            }
        },
    }
}