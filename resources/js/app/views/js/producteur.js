import { apiService } from '../../services/apiService.js';
import AddToCart from '../../components/AddToCart.vue';

export default {
    components: {
        AddToCart
    },

    props: {

    },

    data() {
        return {
            loading: false,
            producteurId: '',
            producteur: [],
            producteurIdentity: '',
            producteurAddress: '',
            userRole: this.$store.state.userRole,
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
                const producteurData = producteurReq.data;
                this.producteur = producteurData.produits;
                this.producteurIdentity = producteurData.producteur.identity;
                this.producteurAddress = producteurData.producteur.exploitations[0].address;
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