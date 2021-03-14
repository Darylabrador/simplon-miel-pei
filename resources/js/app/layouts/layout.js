import { apiService } from '../services/apiService.js';

export default {
    components: {

    },

    data() {
        return {
            connected: localStorage.getItem('mielToken') != null ? true : false,
            registerPath: '/inscription',
            loginPath: '/connexion'
        }
    },

    watch: {

    },

    created() {

    },

    methods: {

    }
}