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
            valid: false,
            isUserLogged: this.$store.state.isLogged,
            totalTTC: 0,
            miels: [],
            productArray: [],
            billing: null,
            delivery: null,
            billingRules: [
                v => !!v || 'Adresse de facturation requise',
            ],
            deliveryRules: [
                v => !!v || 'Adresse de livraison requise',
            ]
        }
    },

    watch: {
        billing() {
            this.verifyInput()     
        }, 
        delivery(){
            this.verifyInput()
        }
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
        },
        async getProds() {
            try {
                const prodReq = await apiService.get(`${location.origin}/api/miels`);
                const mielData = prodReq.data.data;
                this.miels = mielData;
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
        },
        verifyInput() {
            if (this.billing != null && this.delivery != null) {
                this.valid = true;
            } else {
                this.valid = false;
            }
        },
        async validate(){
            try {
                if(this.valid) {
                    console.log('test')
                }
            } catch (error) {
                this.flashMessage.error({
                    title: error.msg,
                    time: 8000,
                })
            }
        }
    }
}