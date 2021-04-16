import { apiService } from '../services/apiService.js';
import EventBus from '../evt-bus.js';
import PasswordChange from '../components/modal/PasswordChange.vue';
import Profil from '../components/modal/Profil.vue';

export default {
    components: {
        PasswordChange,
        Profil
    },

    props: {

    },

    mounted() {
        EventBus.$on('defaultData', (payload) => {
            this.number = _.uniqBy(this.$store.state.cart, 'id').length;
        });
        EventBus.$on('increment', (number) => {
            this.number = _.uniqBy(this.$store.state.cart, 'id').length;
        });
        EventBus.$on('updateNavbar', (payload) => {
            this.updateNavbar(payload);
        });
    },

    data() {
        return {
            connected: localStorage.getItem('mielTok') != null ? true : false,
            registerPath: '/inscription',
            loginPath: '/connexion',
            panierPath: '/panier',
            dashboardPath: '/dashboard',
            homePath: '/',
            producersPath: '/producteurs',
            produitsPath: '/miels',
            number: _.uniqBy(this.$store.state.cart, 'id').length,
            userRole: this.$store.state.userRole,
            profilDialog: false,
            passwordChangeDialog: false,
            totalTTC: 0,
            miels: [],
            productArray: [],
        }
    },

    watch: {

    },

    created() {
  
    },

    methods: {
        startingData() {
            let cartInfo = this.$store.state.cart;
            let cartOrderById = _.orderBy(cartInfo, ['id'], ['asc']);
            let cartUniq = _.uniqBy(cartOrderById, 'id');
            this.productArray = cartUniq;

            let total = 0;
            cartUniq.forEach(prod => {
                total += (prod.amountDefault * prod.price);
            });

            this.totalTTC = total;
        },
        compareStock() {
            this.miels.forEach(prod => {
                let sameElement = this.productArray.find(element => element.id == prod.id);
                if (sameElement) {
                    sameElement.inStock = true;
                    sameElement.maxQuantity = prod.quantity;
                    if (sameElement.amountDefault >= prod.quantity) {
                        sameElement.amountDefault = prod.quantity;
                    }

                    if (prod.quantity == 0) {
                        sameElement.inStock = false;
                    }
                }
            });
        },
        async getProds() {
            try {
                const prodReq = await apiService.get(`${location.origin}/api/miels`);
                const mielData = prodReq.data.data;
                this.miels = mielData;
                await this.compareStock();
            } catch (error) {
                this.flashMessage.error({
                    title: error.msg,
                    time: 8000,
                })
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
        async disconnect() {
            try {
                if(this.userRole == 2) {
                    await this.startingData();
                    await this.getProds();
                    await this.saveCart();
                }

                const disconnectReq = await apiService.get(`${location.origin}/api/logout`);
                const disconnectData = disconnectReq.data;
                if (disconnectData.success) {
                    await EventBus.$emit('defaultData', true);
                    await EventBus.$emit('updateNavbar', false);
                    await this.$store.commit('disconnect');
                    await localStorage.removeItem('mielTok');
                    this.connected = false;
                    this.userRole = null;
                    this.number = _.uniqBy(this.$store.state.cart, 'id').length;

                    if (this.$router.history.current.name != 'accueil') {
                        this.$router.push({ name: "accueil" });
                    }
                }
            } catch (error) {
                await EventBus.$emit('defaultData', true);
                await EventBus.$emit('updateNavbar', false);
                await this.$store.commit('disconnect');
                await localStorage.removeItem('mielTok');
                this.connected = false;
                this.userRole = null;
                this.number = _.uniqBy(this.$store.state.cart, 'id').length;

                if (this.$router.history.current.name != 'accueil') {
                    this.$router.push({ name: "accueil" });
                }
            }
        },
        updateNavbar(isLogged) {
            this.connected = this.$store.state.isLogged;
            this.userRole = this.$store.state.userRole;
            this.number = _.uniqBy(this.$store.state.cart, 'id').length;
        },
        unathorized(val) {
            this.connected = val;
        },
        openProfil() {
            this.profilDialog = true;
        },
        openPasswordChange() {
            this.passwordChangeDialog = true;
        },
        goToCommande() {
            if (this.$router.history.current.name != 'commandes') {
                this.$router.push('/commandes');
            }
        },
        goToManagement() {
            if (this.$router.history.current.name != 'utilisateurs') {
                this.$router.push('/utilisateurs');
            }
        },
        goToExploitation() {
            if (this.$router.history.current.name != 'exploitations') {
                this.$router.push('/exploitations');
            }
        },
        goToStock() {
            if (this.$router.history.current.name != 'stock') {
                this.$router.push('/stock');
            }
        }
    }
}