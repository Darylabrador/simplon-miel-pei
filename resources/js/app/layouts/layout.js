import { apiService } from '../services/apiService.js';

export default {
    data() {
        return {
            connected: localStorage.getItem('mielTok') != null ? true : false,
            registerPath: '/inscription',
            loginPath: '/connexion',
            panierPath: '/panier',
            dashboardPath: '/dashboard',
        }
    },

    methods: {
        async disconnect() {
            try {
                const disconnectReq = await apiService.get(`${location.origin}/api/logout`);
                const disconnectData = disconnectReq.data;
                if(disconnectData.success) {
                    this.flashMessage.success({
                        title: disconnectData.message,
                        time: 8000,
                    });
                    localStorage.removeItem('mielTok');
                    this.connected = false;
                    this.$router.push('/');
                }
            } catch (error) {
                this.flashMessage.error({
                    title: error.msg,
                    time: 8000,
                })
            }
        },
        updateNavbar(isLogged) {
            this.connected = isLogged;
        },
        unathorized(val) {
            this.connected = val;
        }
    }
}