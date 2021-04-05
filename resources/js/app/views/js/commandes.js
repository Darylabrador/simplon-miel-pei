import { apiService } from '../../services/apiService.js';
import ClientDatatable from '../../components/datatable/ClientDatatable';
import ProducerDatable from '../../components/datatable/ProducerDatable';
import EventBus from "../../evt-bus.js";

export default {
    components: {
        ClientDatatable,
        ProducerDatable
    },

    props: {

    },

    mounted() {
        EventBus.$on('refreshCommand', (payload) => {
            this.getCommandes();
        })
    },
    
    data() {
        return {
            listCommands: [],
            userRole: this.$store.state.userRole,
            isLogged: this.$store.state.isLogged,
            isLoaded: false
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
                const commandesReq  = await apiService.get(`${location.origin}/api/commandes`);
                const commandesData = commandesReq.data.data;
                this.listCommands   = commandesData;
                this.isLoaded       = true;
            } catch (error) {
                this.flashMessage.error({
                    title: "Une erreur est survenue",
                    time: 8000,
                })
            }
        }
    }
}