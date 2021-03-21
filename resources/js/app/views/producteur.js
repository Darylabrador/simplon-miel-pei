import { apiService } from '../services/apiService.js';

export default {
    components: {
        
    },

    props: {

    },

    data() {
        return {
            loading: false,
            producteurId: '',
            producteur: [],
            producteurIdentity: '',
            producteurAddress: ''
        }
    },

    watch: {

    },

    created() {
        if (this.$route.params.id) {
            this.producteurId = this.$route.params.id;
            this.productInfo();
        }
    },

    methods: {
        async productInfo() {
            try {
                const producteurReq = await apiService.get(`${location.origin}/api/producer/${this.producteurId}`);
                const producteurData = producteurReq.data.data;
                this.producteur = producteurData;
                this.producteurIdentity = producteurData[0].producteur.identity;
                this.producteurAddress = producteurData[0].producteur.exploitations[0].address;
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
        inStock(quantity){
            if(quantity == 0){
                return 'Stock épuisé'
            } else {
                return `${quantity} en stock`
            }
        }
    }
}