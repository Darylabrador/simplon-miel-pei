import { apiService } from '../services/apiService.js';
import DeleteFromCart from '../components/DeleteFromCart.vue';
import LoginModal from '../components/modal/LoginModal.vue';
import RegisterModal from '../components/modal/RegisterModal.vue';
import EventBus from '../evt-bus.js';

export default {
    components: {
        DeleteFromCart,
        LoginModal,
        RegisterModal
    },

    props: {

    },

    mounted() {
        EventBus.$on('defaultData', (payload) => {
            this.startingData();
        });
        EventBus.$on('deleted', (payload) => {
            this.startingData();
        });
        EventBus.$on('updateNavbar', (payload) => {
            this.isUserLogged = this.$store.state.isLogged;
        });
    },

    data() {
        return {
            valid: false,
            loginDialog: false,
            registerDialog: false,
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
        openRegister(val){
            this.loginDialog    = !val;
            this.registerDialog = val;
        },
        async validate(){
            try {
                if(this.valid) {
                    if (!this.isUserLogged){
                        this.loginDialog = true;
                    } else {
                        console.log('connected to continue')
                    }
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