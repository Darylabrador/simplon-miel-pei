import { apiService } from '../services/apiService.js';
import DeleteFromCart from '../components/DeleteFromCart.vue';
import EventBus from '../evt-bus.js';

export default {
    components: {
        DeleteFromCart
    },

    props: {

    },

    mounted() {
        EventBus.$on('deleted', (payload) => {
            let filtered = this.productArray.filter(element => element.id != payload.id);
            this.productArray = filtered;
        })
    },

    data() {
        return {
            totalTTC: 0,
            miels: [],
            productArray: [],
            billing: '',
            delivery: '',
            billingRules: [
                v => !!v || 'Adresse de facturation requise',
            ],
            deliveryRules: [
                v => !!v || 'Adresse de livraison requise',
            ]
        }
    },

    watch: {

    },

    created() {
        this.startingData();
        this.getProds();
    },

    methods: {
        startingData() {
            let cartInfo      = this.$store.state.cart;
            let cartOrderById = _.orderBy(cartInfo, ['id'], ['asc']);
            let cartUniq      = _.uniqBy(cartOrderById, 'id');
            this.productArray = cartUniq;

            let total = 0;
            cartUniq.forEach(prod => {
                total += (prod.amountDefault * prod.price);
            });

            this.totalTTC = total;
            console.log(cartUniq);
        },
        async getProds() {
            try {
                const prodReq = await apiService.get(`${location.origin}/api/miels`);
                const mielData = prodReq.data.data;
                this.miels = mielData;
                console.log(this.miels)
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