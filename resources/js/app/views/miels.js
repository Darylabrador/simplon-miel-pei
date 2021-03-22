import { apiService } from '../services/apiService.js';

export default {
    components: {

    },

    props: {

    },

    data() {
        return {
            miels: [],
            loading: false
        }   
    },

    watch: {

    },

    created() {
        this.getMiels()
    },

    methods: {
        async getMiels() {
            try {
                const mielReq = await apiService.get(`${location.origin}/api/miels`);
                const mielData = mielReq.data.data;
                this.miels = mielData;
                console.log(mielData);
            } catch (error) {
                this.flashMessage.error({
                    title: error.msg,
                    time: 8000,
                })
            }
        },
        getImageUrl(image) {
            return `${location.origin}/images/${image}`
        },
        inStock(quantity) {
            if (quantity == 0) {
                return 'Stock épuisé'
            } else {
                return `${quantity} en stock`
            }
        }
    }
}