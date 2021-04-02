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
        if (!EventBus._events.defaultData) {
            EventBus.$on('defaultData', (payload) => {
                this.startingData();
                this.getProds();
                if (this.isUserLogged) {
                    this.saveCart();
                }
            });
        }
        
        EventBus.$on('refreshCart', (payload) => {
            this.startingData();
            this.getProds();
        });


        EventBus.$on('deleted', (payload) => {
            this.startingData();
            this.getProds();
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
            isLoaded: false,
            isSaving: false,
            isUserLogged: this.$store.state.isLogged,
            userRole: this.$store.state.userRole,
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
        
        if (this.isUserLogged) {
            this.saveCart();
        }
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
                this.isLoaded = true;
                await this.compareStock();
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
                        let dataSend = {
                            billing: this.billing,
                            delivery: this.delivery
                        }
                        await apiService.post(`${location.origin}/api/shoppingcart/confirm`, dataSend);
                        await this.$store.commit('emptyCart');
                        await EventBus.$emit('defaultData');
                    }
                }
            } catch (error) {
                this.flashMessage.error({
                    title: error.msg,
                    time: 8000,
                })
            }
        },
        compareStock() {
            this.miels.forEach(prod => {
                let sameElement = this.productArray.find(element => element.id == prod.id);
                if (sameElement) {
                    sameElement.inStock     = true;
                    sameElement.maxQuantity = prod.quantity;
                    if(sameElement.amountDefault >= prod.quantity) {
                        sameElement.amountDefault = prod.quantity;
                    }

                    if (prod.quantity == 0) {
                        sameElement.inStock = false;
                    }
                }
            });
        },
        inStock(quantity) {
            if (quantity == 0) {
                return false
            } else {
                return true
            }
        },
        async saveCart() {
            try {
                if (this.productArray.length != 0) {
                    await apiService.post(`${location.origin}/api/shoppingcart/save`, { cart: this.productArray });
                }
            } catch (error) {
                console.error(error)
            }
        },
        changeQuantity(){
            this.saveCart()
        }
    }
}