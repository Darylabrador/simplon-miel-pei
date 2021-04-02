import { apiService } from '../../services/apiService.js';

export default {
    components: {

    },

    props: {

    },

    data() {
        return {
 
        }
    },

    watch: {

    },

    created() {
        this.getCommandes()
    },

    methods: {
        async getCommandes() {
            try {
                const commandesReq = await apiService.get(`${location.origin}/api/commandes`);
                const commandesData = commandesReq.data.data;
                console.log(commandesData);
            } catch (error) {
                this.flashMessage.error({
                    title: "Une erreur est survenue",
                    time: 8000,
                })
            }
        }
    }
}