import { apiService } from '../services/apiService.js';
import EventBus from '../evt-bus.js';

import PasswordChange from '../components/modal/PasswordChange.vue';
import Profil from '../components/modal/Profil.vue';

export default {
    components: {
        PasswordChange,
        Profil
    },
    mounted(){
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
            passwordChangeDialog: false
        }
    },

    created() {
        
    },

    watch: {
        
    },

    methods: {
        async disconnect() {
            try {
                const disconnectReq  = await apiService.get(`${location.origin}/api/logout`);
                const disconnectData = disconnectReq.data;
                if(disconnectData.success) {
                    this.$store.commit('disconnect');
                    localStorage.removeItem('mielTok');
                    EventBus.$emit('updateNavbar', false);
                    EventBus.$emit('defaultData', true);
                    this.connected = false;
                    this.userRole = null;
                    this.number = _.uniqBy(this.$store.state.cart, 'id').length;

                    if (this.$router.history.current.name != 'accueil') {
                        this.$router.push({ name: "accueil" });
                    }
                }
            } catch (error) {
                this.$store.commit('disconnect');
                localStorage.removeItem('mielTok');
                EventBus.$emit('updateNavbar', false);
                EventBus.$emit('defaultData', true);
                this.connected = false;
                this.userRole = null;
                this.number = _.uniqBy(this.$store.state.cart, 'id').length;

                if (this.$router.history.current.name != 'accueil') {
                    this.$router.push({ name: "accueil" });
                }
            }
        },
        updateNavbar(isLogged) {
            this.connected = isLogged;
            this.userRole  = this.$store.state.userRole;
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
            this.$router.push('/commandes');
        }
    }
}